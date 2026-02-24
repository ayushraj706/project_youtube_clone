import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import ReactPlayer from "react-player";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules"; // PC par mouse se scroll karne ke liye
import "swiper/css"; // Swiper ki basic styling

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { useStore } from "../store/useStore"; 

const Shorts = () => {
  const [shortsVideos, setShortsVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { watchedCategories } = useStore(); 

  useEffect(() => {
    // SMART MIX LOGIC: User ki pasand + Nayi Variety
    const varietyTopics = ["Study Motivation", "Science Facts", "Trending Tech"];
    const randomVariety = varietyTopics[Math.floor(Math.random() * varietyTopics.length)];
    
    // Agar user ki history hai toh usko random variety ke sath mix karo
    const searchQuery = watchedCategories.length > 0 
      ? `${watchedCategories[0]} OR ${randomVariety}` 
      : randomVariety;

    // YouTube API me #shorts aur duration short filter zaroori hai
    fetchFromAPI(`search?part=snippet&q=${searchQuery} #shorts&videoDuration=short&maxResults=15&type=video`)
      .then((data) => {
        setShortsVideos(data.items);
        setLoading(false);
      });
  }, [watchedCategories]);

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#000">
      <CircularProgress color="error" />
    </Box>
  );

  return (
    // Pura box 100vh (full screen) ka hoga
    <Box sx={{ height: "100vh", width: "100%", backgroundColor: "#000", position: "relative" }}>
      
      {/* SWIPER: Ye vertical scrolling ka jadoo karega */}
      <Swiper
        direction="vertical" // Upar-niche scroll hoga
        slidesPerView={1}    // Ek baar me ek video
        mousewheel={true}    // Mouse scroll kaam karega
        modules={[Mousewheel]}
        style={{ height: "100%", width: "100%" }}
      >
        {shortsVideos.map((item, index) => (
          <SwiperSlide key={index}>
            <Box sx={{ height: "100%", width: "100%", position: "relative", display: 'flex', justifyContent: 'center' }}>
              
              {/* VIDEO PLAYER */}
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                playing={true} // Swiper jab is par aayega toh play hoga (Aage isko auto-play par set karenge)
                controls={false} // Shorts me controls nahi hote
                loop={true}
                width="100%"
                height="100%"
                style={{ objectFit: 'cover' }}
              />

              {/* VIDEO KE UPAR TEXT (Title) */}
              <Box sx={{ position: "absolute", bottom: "80px", left: "15px", zIndex: 10, width: "80%" }}>
                <Typography variant="h6" fontWeight="bold" color="white" sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}>
                  {item.snippet.title.slice(0, 50)}...
                </Typography>
                <Typography variant="subtitle2" color="gray">
                  {item.snippet.channelTitle}
                </Typography>
              </Box>

            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Shorts;

