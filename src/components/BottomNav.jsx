import React from 'react';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo'; // Shorts ke liye icon
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Agar user video dekh raha hai (full screen), toh patti chupalo
  if (location.pathname.includes('/video/')) return null;

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={location.pathname === '/' ? '/feed' : location.pathname} // Home ko feed pe point karega
        onChange={(event, newValue) => {
          navigate(newValue);
        }}
        sx={{ backgroundColor: '#000', borderTop: '1px solid #3d3d3d' }}
      >
        <BottomNavigationAction 
          label="Home" 
          value="/feed" 
          icon={<HomeIcon sx={{ color: location.pathname === '/feed' || location.pathname === '/' ? '#FC1503' : 'white' }} />} 
          sx={{ color: 'gray', '&.Mui-selected': { color: '#FC1503' } }} 
        />
        <BottomNavigationAction 
          label="Shorts" 
          value="/shorts" 
          icon={<SlowMotionVideoIcon sx={{ color: location.pathname === '/shorts' ? '#FC1503' : 'white' }} />} 
          sx={{ color: 'gray', '&.Mui-selected': { color: '#FC1503' } }} 
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;

