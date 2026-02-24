import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos, Sidebar } from "./";
import { useStore } from "../store/useStore"; 

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");

  const { watchedCategories } = useStore(); 

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

  const fetchMoreVideos = () => {
    if (!nextPageToken) return;

    const query = (selectedCategory === "New" && watchedCategories.length > 0)
      ? watchedCategories[0]
      : selectedCategory;

    fetchFromAPI(`search?part=snippet&q=${query}&pageToken=${nextPageToken}`)
      .then((data) => {
        if (data?.items && data.items.length > 0) {
          setVideos((prevVideos) => [...prevVideos, ...data.items]);
          setNextPageToken(data.nextPageToken || ""); 
        } else {
          setNextPageToken(""); 
        }
      })
      .catch((error) => {
        console.log("Error loading more videos:", error);
        setNextPageToken("");
      });
  };

  return (
    <Stack sx={{ flexDirection: { xs: "column", md: "row" } }}>
      {/* Sidebar - Desktop me ye apni jagah fasa rahega (sticky) */}
      <Box sx={{ 
        height: { xs: "auto", md: "92vh" }, 
        borderRight: "1px solid #3d3d3d", 
        px: { xs: 0, md: 2 },
        position: { md: "sticky" }, 
        top: 0 
      }}>
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        
        <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: '#fff' }}>
          Copyright © 2026 Ayush Raj
        </Typography>
      </Box>

      {/* SABSE BADA BADLAV: 
        Yahan se 'height', 'overflowY' aur 'id' sab hata diya. 
        Ab div automatically lamba hoga aur phone ki natural scrolling use hogi.
      */}
      <Box p={2} sx={{ flex: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
          {selectedCategory === "New" && watchedCategories.length > 0 ? "Recommended" : selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
        </Typography>

        <InfiniteScroll
          dataLength={videos.length}
          next={fetchMoreVideos}
          hasMore={!!nextPageToken} 
          loader={<Typography color="white" mt={2} textAlign="center">Loading more videos...</Typography>}
          // YAHAN SE 'scrollableTarget' HATA DIYA. Ab ye phone ke main scroll ko track karega!
        >
          <Videos videos={videos} />
        </InfiniteScroll>
      </Box>
    </Stack>
  );
};

export default Feed;
