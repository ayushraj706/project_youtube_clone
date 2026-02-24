import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component"; // Modern Scroll
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos, Sidebar } from "./";
import { useStore } from "../store/useStore"; // Smart Tracker

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  
  // Zustand store se user ki pichli dekhi hui history nikal rahe hain
  const { watchedCategories } = useStore(); 

  useEffect(() => {
    setVideos([]);
    setNextPageToken("");

    // SMART SYSTEM: Agar user pehli baar aaya hai ("New" category par) aur uski history hai, 
    // toh default ki jagah uski pasand ki video search hogi.
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
      .catch((error) => console.log("Error loading feed:", error));
  }, [selectedCategory, watchedCategories]);

  const fetchMoreVideos = () => {
    if (!nextPageToken) return;

    const query = (selectedCategory === "New" && watchedCategories.length > 0)
      ? watchedCategories[0]
      : selectedCategory;

    // API me pageToken bhej kar agla data mangwa rahe hain
    fetchFromAPI(`search?part=snippet&q=${query}&pageToken=${nextPageToken}`)
      .then((data) => {
        if (data?.items) {
          setVideos((prevVideos) => [...prevVideos, ...data.items]); // Purane data me naya joda
          setNextPageToken(data.nextPageToken || ""); 
        }
      })
      .catch((error) => console.log("Error loading more videos:", error));
  };

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box sx={{ height: { sx: "auto", md: "92vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        
        <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: '#fff' }}>
          Copyright © 2026 Ayush Raj
        </Typography>
      </Box>

      {/* Yahan ID 'scrollableDiv' diya hai taaki InfiniteScroll ko pata chale kahan scroll ho raha hai */}
      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }} id="scrollableDiv">
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
          {selectedCategory === "New" && watchedCategories.length > 0 ? "Recommended" : selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
        </Typography>

        {/* Modern Infinite Scroll - Ab manual math calculation ki zaroorat nahi */}
        <InfiniteScroll
          dataLength={videos.length}
          next={fetchMoreVideos}
          hasMore={!!nextPageToken} // Jab tak token hai, scroll hota rahega
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
