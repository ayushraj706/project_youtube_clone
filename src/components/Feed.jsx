import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos, Sidebar } from "./";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    // Purana data saaf karo naya load hone se pehle
    setVideos(null);

    // Ye tumhare Backend API ko call karega
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => {
        // Safety check: Agar data aaya to hi set karo
        if (data?.items) {
          setVideos(data.items);
        }
      })
      .catch((error) => console.log("Error loading feed:", error));
      
    }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box sx={{ height: { sx: "auto", md: "92vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        
        <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: '#fff' }}>
          Copyright © 2026 Ayush Raj
        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
          {selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
        </Typography>

        {/* Ye component saare videos ki list dikhayega */}
        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
