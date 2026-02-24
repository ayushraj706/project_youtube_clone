import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom"; // useNavigate add kiya
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Videos, Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { useStore } from "../store/useStore"; // Smart Tracker add kiya

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  
  const { id } = useParams();
  const navigate = useNavigate(); 
  const { addWatchedCategory } = useStore(); // Category save karne ke liye

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => {
        setVideoDetail(data.items[0]);
        
        // JAISE HI VIDEO LOAD HO, USKI CATEGORY SAVE KAR LO
        if(data.items[0]?.snippet?.channelTitle) {
          addWatchedCategory(data.items[0].snippet.channelTitle); // Channel ka naam save kar liya
        }
      });

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data.items));
  }, [id]);

  // AUTO-NEXT LOGIC: Video khatam hone par agla video chalao
  const handleNextVideo = () => {
    if (videos && videos.length > 0) {
      const nextVideoId = videos[0].id.videoId; // Related list ka pehla video uthao
      if (nextVideoId) {
        navigate(`/video/${nextVideoId}`);
      }
    }
  };

  // LOCK SCREEN CONTROLS (Background me play aur next/previous)
  useEffect(() => {
    if ('mediaSession' in navigator && videoDetail) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: videoDetail.snippet.title,
        artist: videoDetail.snippet.channelTitle,
        artwork: [
          { src: videoDetail.snippet.thumbnails.high.url, sizes: '512x512', type: 'image/png' }
        ]
      });

      // Lock screen par "Next" dabane se agla video chalega
      navigator.mediaSession.setActionHandler('nexttrack', handleNextVideo);
    }
  }, [videoDetail, videos]);

  if(!videoDetail?.snippet) return <Loader />;

  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer 
              url={`https://www.youtube.com/watch?v=${id}`} 
              className="react-player" 
              controls 
              playing={true} // Auto-play chalu kar diya
              onEnded={handleNextVideo} // JAISE HI VIDEO KHATAM HOGA, NEXT FUNCTION CHALEGA
            />
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
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center" >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
