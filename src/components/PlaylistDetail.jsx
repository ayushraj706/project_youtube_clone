import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import { Videos } from "./"; // Tumhara existing Videos component
import { fetchFromAPI } from "../utils/fetchFromAPI";

const PlaylistDetail = () => {
  const [videos, setVideos] = useState([]);
  const { id } = useParams(); // URL se Playlist ID nikalega

  useEffect(() => {
    // Playlist ke andar ke videos mangwao
    fetchFromAPI(`playlistItems?part=snippet&playlistId=${id}&maxResults=50`)
      .then((data) => {
         // YouTube ka data format thoda alag hota hai playlist ke liye, 
         // isliye hum 'resourceId' ko 'videoId' bana rahe hain taaki VideoCard samajh sake
         const formattedVideos = data.items.map(item => ({
             ...item,
             id: { videoId: item.snippet.resourceId.videoId } 
         }));
         setVideos(formattedVideos);
      });
  }, [id]);

  return (
    <Box minHeight="95vh" p={2}>
      <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
        Playlist <span style={{ color: "#FC1503" }}>Videos</span>
      </Typography>
      
      {/* Saare videos yahan dikhenge */}
      <Videos videos={videos} />
    </Box>
  );
};

export default PlaylistDetail;

