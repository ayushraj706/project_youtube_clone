import React, { useState } from 'react';
import { Link } from "react-router-dom"; 
import { Typography, Card, CardContent, CardMedia, IconButton, Menu, MenuItem } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Teen dot ke liye icon
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';

import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from "../utils/constants";

const VideoCard = ({ video: { id, snippet } }) => {
  const videoId = id?.videoId || id;
  const [anchorEl, setAnchorEl] = useState(null); // Menu kholne ke liye state

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  // --- Logic for Buttons ---
  const copyLink = () => {
    const link = `https://ayus.fun/video/${videoId}`;
    navigator.clipboard.writeText(link);
    alert("Link copy ho gaya!");
    handleCloseMenu();
  };

  const shareVideo = () => {
    const shareData = {
      title: snippet?.title,
      url: `https://ayus.fun/video/${videoId}`
    };
    if (navigator.share) {
      navigator.share(shareData);
    } else {
      copyLink(); // Agar browser share support nahi karta to link copy kar do
    }
  };

  const downloadVideo = () => {
    // YouTube video direct download nahi hota legal wajah se, 
    // par hum ek external service link de sakte hain
    window.open(`https://www.y2mate.com/youtube/${videoId}`, "_blank");
    handleCloseMenu();
  };

  return (
    <Card sx={{ width: { xs: '100%', sm: '358px', md: "320px", }, boxShadow: "none", borderRadius: 0, position: 'relative' }}>
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl }>
        <CardMedia image={snippet?.thumbnails?.high?.url || demoThumbnailUrl} alt={snippet?.title} 
          sx={{ width: { xs: '100%', sm: '358px'}, height: 180 }} 
        />
      </Link>
      
      <CardContent sx={{ backgroundColor: "#1E1E1E", height: '106px', position: 'relative' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Link to={videoId ? `/video/${videoId}` : demoVideoUrl } style={{ flex: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
              {snippet?.title.slice(0, 50) || demoVideoTitle.slice(0, 50)}...
            </Typography>
          </Link>

          {/* --- TEEN DOT MENU --- */}
          <IconButton onClick={handleOpenMenu} sx={{ color: 'white', p: 0 }}>
            <MoreVertIcon />
          </IconButton>
        </Box>

        <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl} >
          <Typography variant="subtitle2" color="gray">
            {snippet?.channelTitle || demoChannelTitle}
            <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
          </Typography>
        </Link>

        {/* --- MENU OPTIONS --- */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}
          PaperProps={{ style: { backgroundColor: '#333', color: 'white' } }}>
          <MenuItem onClick={shareVideo}><ShareIcon sx={{ mr: 1 }} /> Share</MenuItem>
          <MenuItem onClick={copyLink}><ContentCopyIcon sx={{ mr: 1 }} /> Copy Link</MenuItem>
          <MenuItem onClick={downloadVideo}><DownloadIcon sx={{ mr: 1 }} /> Download</MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
