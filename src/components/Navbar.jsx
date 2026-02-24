import React, { useState } from 'react';
import { Stack, Box, Avatar, Menu, MenuItem, IconButton, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../utils/constants";
import { SearchBar } from "./";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  // Profile pic par click karne ka logic
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // LOGOUT LOGIC: Sab kuch saaf karke landing page par bhej do
  const handleLogout = () => {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userEmail');
    handleClose();
    navigate('/');
    window.location.reload(); // State reset karne ke liye
  };

  return (
    <Stack direction="row" alignItems="center" p={2} sx={{ position:  "sticky", background: '#000', top: 0, justifyContent: "space-between", zIndex: 10 }}>
      
      <Box display="flex" alignItems="center">
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="logo" height={45} />
        </Link>

        {/* NAYA FEATURE: Default Profile Pic */}
        <IconButton onClick={handleClick} sx={{ ml: 1, p: 0 }}>
          <Avatar 
            sx={{ width: 35, height: 35, bgcolor: '#333', border: '1px solid #444' }}
            src="/default-user.png" // Agar aapke paas koi image hai toh yahan path dein
          />
        </IconButton>
      </Box>

      <SearchBar />

      {/* Logout Menu Popup */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            bgcolor: '#1a1a1a',
            color: 'white',
            mt: 1.5,
            border: '1px solid #333',
            '& .MuiMenuItem-root:hover': { bgcolor: '#333' }
          }
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="caption" color="gray">Logged in as:</Typography>
          <Typography variant="body2">{localStorage.getItem('userEmail')}</Typography>
        </Box>
        
        {/* LAL RANG KA LOGOUT BUTTON */}
        <MenuItem onClick={handleLogout} sx={{ color: '#FC1503', fontWeight: 'bold' }}>
          LOGOUT
        </MenuItem>
      </Menu>
    </Stack>
  );
};

export default Navbar;
