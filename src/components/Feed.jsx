import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos, Sidebar } from "./";
import { useStore } from "../store/useStore"; // Smart Tracker

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");

  const { watchedCategories } = useStore(); 

  // 1. Initial Load: Jab category badle ya page pehli baar khule
  useEffect(() => {
    setVideos([]);
    setNextPageToken("");

    const query = (selectedCategory === "New" && watchedCategories.length > 0)
      ? watchedCategories[0] 
      : selectedCategory;

    fetchFromAPI(`search?part=snippet&q=${query}`)
      .then((data) => {
        if (data?.items) {
          setVideos(data.items);
          setNextPageToken(data.nextPageToken || ""); 
        }
      })
      .catch((error) => {
        console.log("Error loading feed:", error);
        setNextPageToken(""); // Error aaye toh loading rok do
      });
  }, [selectedCategory, watchedCategories]);

  // 2. Infinite Scroll Load: Jab user niche scroll kare
  const fetchMoreVideos = () => {
    if (!nextPageToken) return;

    const query = (selectedCategory === "New" && watchedCategories.length > 0)
      ? watchedCategories[0]
      : selectedCategory;

    fetchFromAPI(`search?part=snippet&q=${query}&pageToken=${nextPageToken}`)
      .then((data) => {
        if (data?.items) {
          setVideos((prevVideos) => [...prevVideos, ...data.items]);
          setNextPageToken(data.nextPageToken || ""); 
        } else {
          setNextPageToken(""); // API limit khatam hone par loading rok do
        }
      })
      .catch((error) => {
        console.log("Error loading more videos:", error);
        setNextPageToken(""); // Error aane par loading rok do
      });
  };

  // 3. UI Render (Aapka return wala hissa yahan hai)
  return (
    <Stack sx={{ flexDirection: { xs: "column", md: "row" } }}>
      <Box sx={{ height: { xs: "auto", md: "92vh" }, borderRight: "1px solid #3d3d3d", px: { xs: 0, md: 2 } }}>
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        
        <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: '#fff' }}>
          Copyright © 2026 Ayush Raj
        </Typography>
      </Box>

      {/* Yahan id="scrollableDiv" zaroori hai InfiniteScroll ke liye */}
      <Box p={2} sx={{ overflowY: "auto", height: "calc(100vh - 90px)", flex: 2 }} id="scrollableDiv">
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
          {selectedCategory === "New" && watchedCategories.length > 0 ? "Recommended" : selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
        </Typography>

        <InfiniteScroll
          dataLength={videos.length}
          next={fetchMoreVideos}
          hasMore={!!nextPageToken} // Jab tak token hai tab tak scroll karo
          loader={<Typography color="white" mt={2} textAlign="center">Loading more videos...</Typography>}
          scrollableTarget="scrollableDiv"
        >
          <Videos videos={videos} />
        </InfiniteScroll>
      </Box>
    </Stack>
  );
};

export default Feed;
