import React, { useState } from 'react';
// 🚀 Smart Imports for UI Components
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { Link, useNavigate } from "react-router-dom";
import { logo } from "../utils/constants";
import { SearchBar } from "./";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const userEmail = localStorage.getItem('userEmail') || "User";
  const firstLetter = userEmail.charAt(0).toUpperCase();

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

        <IconButton onClick={handleClick} sx={{ ml: 1.5, p: 0 }}>
          <Avatar sx={{ width: 38, height: 38, bgcolor: '#FF5722', fontSize: '18px', fontWeight: 'bold', border: '2px solid #333' }}>
            {firstLetter}
          </Avatar>
        </IconButton>
      </Box>

      <SearchBar />

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { bgcolor: '#111', color: 'white', mt: 1.5, minWidth: '180px', border: '1px solid #333', '& .MuiMenuItem-root:hover': { bgcolor: '#222' } }
        }}
      >
        <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #222' }}>
          <Typography variant="caption" color="gray">Account</Typography>
          <Typography variant="body2" sx={{ fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {userEmail}
          </Typography>
        </Box>
        <MenuItem onClick={handleLogout} sx={{ color: '#FF1100', fontWeight: 'bold', py: 1.5 }}>
          LOGOUT
        </MenuItem>
      </Menu>
    </Stack>
  );
};

export default Navbar;
