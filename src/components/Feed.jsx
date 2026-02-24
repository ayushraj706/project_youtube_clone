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

  // 1. Initial Load: Jab pehli baar site khule
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
        setNextPageToken(""); 
      });
  }, [selectedCategory, watchedCategories]);

  // --------------------------------------------------------
  // 2. YAHI HAI WOH 'fetchMoreVideos' FUNCTION
  // --------------------------------------------------------
  const fetchMoreVideos = () => {
    console.log("👉 SCROLL DETECT HUA! fetchMoreVideos function chal gaya."); 

    if (!nextPageToken) {
      console.log("❌ Token khali hai, yahin se wapas ja raha hu.");
      return;
    }

    const query = (selectedCategory === "New" && watchedCategories.length > 0)
      ? watchedCategories[0]
      : selectedCategory;

    console.log("⏳ API ko call ja rahi hai is token ke sath:", nextPageToken);

    fetchFromAPI(`search?part=snippet&q=${query}&pageToken=${nextPageToken}`)
      .then((data) => {
        console.log("✅ API se naya data aa gaya!", data); 
        if (data?.items && data.items.length > 0) {
          setVideos((prevVideos) => [...prevVideos, ...data.items]);
          setNextPageToken(data.nextPageToken || ""); 
        } else {
          setNextPageToken(""); 
        }
      })
      .catch((error) => {
        console.log("🚨 Error aa gayi API me:", error);
        setNextPageToken("");
      });
  };

  // 3. UI Render Wala Hissa
  return (
    <Stack sx={{ flexDirection: { xs: "column", md: "row" } }}>
      <Box sx={{ height: { xs: "auto", md: "92vh" }, borderRight: "1px solid #3d3d3d", px: { xs: 0, md: 2 } }}>
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        
        <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: '#fff' }}>
          Copyright © 2026 Ayush Raj
        </Typography>
      </Box>

      {/* DEBUGGING KE LIYE: Mobile view me is box par lal rang ka border aayega */}
      <Box 
        p={2} 
        sx={{ 
          overflowY: "auto", 
          height: { xs: "400px", md: "calc(100vh - 90px)" }, 
          flex: 2,
          border: { xs: "5px solid red", md: "none" } // Naya line: Laal border sirf mobile me
        }} 
        id="scrollableDiv"
      >
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
          {selectedCategory === "New" && watchedCategories.length > 0 ? "Recommended" : selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
        </Typography>

        <InfiniteScroll
          dataLength={videos.length}
          next={fetchMoreVideos} // InfiniteScroll yahan se us function ko call karta hai
          hasMore={!!nextPageToken} 
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
