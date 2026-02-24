import React, { useState } from 'react';
import { Stack, Box, Avatar, Menu, MenuItem, IconButton, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../utils/constants";
import { SearchBar } from "./";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  // 1. LocalStorage se email uthana
  const userEmail = localStorage.getItem('userEmail') || "User";
  const firstLetter = userEmail.charAt(0).toUpperCase(); // Pehla akshar bada karke

  const handleClick = (event) => { setAnchorEl(event.currentTarget); };
  const handleClose = () => { setAnchorEl(null); };

  const handleLogout = () => {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userEmail');
    handleClose();
    navigate('/');
    window.location.reload(); 
  };

  return (
    <Stack direction="row" alignItems="center" p={2} sx={{ position: "sticky", background: '#000', top: 0, justifyContent: "space-between", zIndex: 10 }}>
      
      <Box display="flex" alignItems="center">
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="logo" height={45} />
        </Link>

        {/* Dynamic Avatar: Pehla Letter automatic dikhega */}
        <IconButton onClick={handleClick} sx={{ ml: 1.5, p: 0 }}>
          <Avatar 
            sx={{ 
              width: 38, 
              height: 38, 
              bgcolor: '#FF5722', // Mast rangin dabba
              fontSize: '18px',
              fontWeight: 'bold',
              border: '2px solid #333'
            }}
          >
            {firstLetter}
          </Avatar>
        </IconButton>
      </Box>

      <SearchBar />

      {/* Logout Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            bgcolor: '#111',
            color: 'white',
            mt: 1.5,
            minWidth: '180px',
            border: '1px solid #333',
            '& .MuiMenuItem-root:hover': { bgcolor: '#222' }
          }
        }}
      >
        <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #222' }}>
          <Typography variant="caption" color="gray">Account</Typography>
          <Typography variant="body2" sx={{ fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {userEmail}
          </Typography>
        </Box>
        
        {/* LAL RANG KA LOGOUT */}
        <MenuItem onClick={handleLogout} sx={{ color: '#FF1100', fontWeight: 'bold', py: 1.5 }}>
          LOGOUT
        </MenuItem>
      </Menu>
    </Stack>
  );
};

export default Navbar;
