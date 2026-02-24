import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom"; 
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Videos, Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { useStore } from "../store/useStore"; 

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  
  const { id } = useParams();
  const navigate = useNavigate(); 
  const { addWatchedCategory } = useStore(); 

  useEffect(() => {
    // 1. Pehle Video ki detail mangwao
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => {
        setVideoDetail(data.items[0]);
        
        const channelId = data.items[0]?.snippet?.channelId;
        const channelTitle = data.items[0]?.snippet?.channelTitle;
        
        if(channelTitle) {
          addWatchedCategory(channelTitle); 
        }

        // 2. BADA BADLAV: YouTube ne 'relatedToVideoId' block kar diya hai.
        // Ab hum uske bajaye ussi channel ke latest videos fetch kar rahe hain.
        if(channelId) {
          fetchFromAPI(`search?part=snippet&channelId=${channelId}&type=video&maxResults=15`)
            .then((relatedData) => setVideos(relatedData.items));
        }
      });
  }, [id]);

  const handleNextVideo = () => {
    if (videos && videos.length > 0) {
      const nextVideoId = videos[0].id.videoId; 
      if (nextVideoId) {
        navigate(`/video/${nextVideoId}`);
      }
    }
  };

  useEffect(() => {
    if ('mediaSession' in navigator && videoDetail) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: videoDetail.snippet.title,
        artist: videoDetail.snippet.channelTitle,
        artwork: [
          { src: videoDetail.snippet.thumbnails.high.url, sizes: '512x512', type: 'image/png' }
        ]
      });
      navigator.mediaSession.setActionHandler('nexttrack', handleNextVideo);
    }
  }, [videoDetail, videos]);

  if(!videoDetail?.snippet) return <Loader />;

  const { snippet: { title, channelId: chId, channelTitle: chTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        
        {/* VIDEO PLAYER SECTION */}
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            
            <Box sx={{ width: "100%", height: { xs: "30vh", sm: "45vh", md: "70vh" } }}>
              <ReactPlayer 
                url={`https://www.youtube.com/watch?v=${id}`} 
                className="react-player" 
                controls 
                playing={true} 
                width="100%"       
                height="100%"      
                onEnded={handleNextVideo} 
              />
            </Box>

            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2} >
              <Link to={`/channel/${chId}`}>
                <Typography variant={{ sm: "subtitle1", md: 'h6' }}  color="#fff" >
                  {chTitle}
                  <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>

        {/* RELATED VIDEOS SECTION (Yahan ab channel ke videos aayenge) */}
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center" >
          {/* Agar videos abhi load nahi hue hain, toh Loader dikhega (Landing Page nahi!) */}
          {!videos ? <Loader /> : <Videos videos={videos} direction="column" />}
        </Box>

      </Stack>
    </Box>
  );
};

export default VideoDetail;

