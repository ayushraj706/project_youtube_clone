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
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => {
        setVideoDetail(data.items[0]);
        if(data.items[0]?.snippet?.channelTitle) {
          addWatchedCategory(data.items[0].snippet.channelTitle); 
        }
      });

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data.items));
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

  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        
        {/* Video Player ka section */}
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            
            {/* YAHAN FIX KIYA HAI: Ek fixed height wala box daala taaki video kabhi dabey nahi */}
            <Box sx={{ width: "100%", height: { xs: "35vh", md: "70vh" } }}>
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
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{ sm: "subtitle1", md: 'h6' }}  color="#fff" >
                  {channelTitle}
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

        {/* Related Videos ka section */}
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center" >
          <Videos videos={videos} direction="column" />
        </Box>

      </Stack>
    </Box>
  );
};

export default VideoDetail;
