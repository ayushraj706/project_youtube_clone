import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos, Sidebar } from "./";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(""); // Agle page ke liye token

  // Pehli baar video load karne ke liye
  useEffect(() => {
    setVideos([]);
    setNextPageToken("");

    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => {
        setVideos(data.items);
        setNextPageToken(data.nextPageToken); // Token save kar lo
      });
  }, [selectedCategory]);

  // Naye videos load karne ka function
  const fetchMoreVideos = () => {
    if (!nextPageToken) return;

    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`, nextPageToken)
      .then((data) => {
        setVideos((prevVideos) => [...prevVideos, ...data.items]); // Purane + Naye videos
        setNextPageToken(data.nextPageToken); // Naya token set karo
      });
  };

  // Scroll detect karne ka logic
  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    // Agar user bottom se 100px door hai, toh aur load karo
    if (scrollHeight - scrollTop <= clientHeight + 100) {
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

      {/* handleScroll yahan add kiya hai */}
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
