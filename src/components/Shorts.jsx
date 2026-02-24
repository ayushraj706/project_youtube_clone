import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import ReactPlayer from "react-player";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { useStore } from "../store/useStore";

const Shorts = () => {
  const [shortsVideos, setShortsVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0); // Kaunsa video chal raha hai uska tracker
  
  const { watchedCategories } = useStore();

  useEffect(() => {
    // 1. SMART QUERY: Sirf asli shorts laane ke liye variety me 'shorts' jod diya
    const varietyTopics = ["facts shorts", "study motivation shorts", "science experiment shorts"];
    const randomVariety = varietyTopics[Math.floor(Math.random() * varietyTopics.length)];

    const query = watchedCategories.length > 0
      ? `${watchedCategories[0]} shorts OR ${randomVariety}`
      : randomVariety;

    // API me videoDuration=short lagana zaroori hai
    fetchFromAPI(`search?part=snippet&q=${query}&videoDuration=short&maxResults=10&type=video`)
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
    // 2. FULL SCREEN FIX: Ye box search bar ke upar aayega aur Bottom Nav ke liye niche jagah chhodega
    <Box sx={{ 
      position: "fixed", 
      top: 0, 
      left: 0, 
      height: "calc(100vh - 56px)", // Bottom patti ke liye jagah chhodi hai
      width: "100vw", 
      backgroundColor: "#000",
      zIndex: 90 // Isse Navbar (Search) chhip jayega
    }}>
      
      <Swiper
        direction="vertical"
        slidesPerView={1}
        mousewheel={true}
        modules={[Mousewheel]}
        // JAISE HI SWIPE HOGA, NAYA INDEX SAVE HOGA
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} 
        style={{ height: "100%", width: "100%" }}
      >
        {shortsVideos.map((item, index) => {
          
          // 3. SMART PRE-LOADING: Sirf chalne wala, usse agla aur pichla video hi load hoga (Max 3)
          const isNearActive = Math.abs(activeIndex - index) <= 1;

          return (
            <SwiperSlide key={index}>
              <Box sx={{ height: "100%", width: "100%", position: "relative", display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
                
                {/* Agar video aas-paas hai toh Player load karo, nahi toh sirf Thumbnail (Photo) dikhao */}
                {isNearActive ? (
                  <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                    playing={activeIndex === index} // Sirf wahi play hoga jo screen par hai
                    controls={false}
                    loop={true}
                    width="100%"
                    height="130%" // Shorts ko lamba stretch karne ke liye
                    style={{ objectFit: 'cover' }}
                    config={{
                      youtube: { playerVars: { showinfo: 0, modestbranding: 1, rel: 0 } }
                    }}
                  />
                ) : (
                  // Door wale videos ki jagah sirf image load hogi jisse RAM bachega
                  <img 
                    src={item.snippet.thumbnails.high.url} 
                    alt="thumbnail" 
                    style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }} 
                  />
                )}

                {/* Video ka Title aur Channel Name */}
                <Box sx={{ position: "absolute", bottom: "30px", left: "15px", zIndex: 10, width: "80%" }}>
                  <Typography variant="body1" fontWeight="bold" color="white" sx={{ textShadow: "2px 2px 4px black" }}>
                    {item.snippet.title}
                  </Typography>
                  <Typography variant="subtitle2" color="gray" sx={{ textShadow: "1px 1px 2px black" }}>
                    {item.snippet.channelTitle}
                  </Typography>
                </Box>

              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default Shorts;
