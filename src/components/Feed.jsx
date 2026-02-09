import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos, Sidebar } from "./";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  // Change 1: 'null' nahi, empty array [] rakha hai taaki videos jud sakein
  const [videos, setVideos] = useState([]); 
  const [nextPageToken, setNextPageToken] = useState(""); // Token ke liye jagah banayi

  // 1. Jab Category badle, toh pehle 50 videos load karo
  useEffect(() => {
    setVideos([]);
    setNextPageToken("");

    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => {
        if (data?.items) {
          setVideos(data.items);
          setNextPageToken(data.nextPageToken); // Token save kiya
        }
      })
      .catch((error) => console.log("Error loading feed:", error));
  }, [selectedCategory]);

  // 2. Scroll karne par aur videos mangwane ka function
  const fetchMoreVideos = () => {
    // Agar agla page nahi hai toh ruk jao
    if (!nextPageToken) return;

    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`, { pageToken: nextPageToken })
      .then((data) => {
        if (data?.items) {
          // Purane videos mein naye videos jod do (...spread operator)
          setVideos((prevVideos) => [...prevVideos, ...data.items]);
          setNextPageToken(data.nextPageToken); // Naya token set karo
        }
      })
      .catch((error) => console.log("Error loading more videos:", error));
  };

  // 3. Scroll detect karne ka logic
  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    // Agar user niche pahunchne wala hai (50px dur), toh load karo
    if (scrollHeight - scrollTop <= clientHeight + 50) {
      fetchMoreVideos();
    }
  };

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box sx={{ height: { sx: "auto", md: "92vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        
        <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: '#fff' }}>
          Copyright © 2026 Ayush Raj
        </Typography>
      </Box>

      {/* Change 2: Yahan 'onScroll' lagaya hai */}
      <Box p={2} onScroll={handleScroll} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
          {selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
        </Typography>

        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
