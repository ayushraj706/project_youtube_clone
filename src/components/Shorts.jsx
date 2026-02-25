import React, { useEffect, useState } from "react";
// 🚀 Smart Imports for Performance
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import ReactPlayer from "react-player";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { useStore } from "../store/useStore";

const Shorts = () => {
  const [shortsVideos, setShortsVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0); 
  
  const { watchedCategories } = useStore();

  useEffect(() => {
    const varietyTopics = ["facts", "study motivation", "science magic"];
    const randomVariety = varietyTopics[Math.floor(Math.random() * varietyTopics.length)];

    const query = watchedCategories.length > 0
      ? `${watchedCategories[0]} #shorts`
      : `${randomVariety} #shorts`;

    fetchFromAPI(`search?part=snippet&q=${query}&videoDuration=short&maxResults=15&type=video`)
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
    <Box sx={{ 
      position: "fixed", 
      top: 0, 
      left: 0, 
      height: "calc(100vh - 56px)", 
      width: "100vw", 
      backgroundColor: "#000",
      zIndex: 90 
    }}>
      <Swiper
        direction="vertical"
        slidesPerView={1}
        mousewheel={true}
        modules={[Mousewheel]}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} 
        style={{ height: "100%", width: "100%" }}
      >
        {shortsVideos.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <SwiperSlide key={index}>
              <Box sx={{ height: "100%", width: "100%", position: "relative", backgroundColor: '#000' }}>
                {isActive ? (
                  <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                    playing={true} 
                    controls={true} 
                    loop={true}
                    width="100%"
                    height="100%" 
                    style={{ objectFit: 'cover' }}
                    config={{
                      youtube: { playerVars: { showinfo: 0, modestbranding: 1, rel: 0 } }
                    }}
                  />
                ) : (
                  <img 
                    src={item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url} 
                    alt="thumbnail" 
                    style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }} 
                  />
                )}

                <Box sx={{ position: "absolute", bottom: "30px", left: "15px", zIndex: 10, width: "80%", pointerEvents: "none" }}>
                  <Typography variant="body1" fontWeight="bold" color="white" sx={{ textShadow: "2px 2px 4px black" }}>
                    {item.snippet.title.slice(0, 60)}...
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


