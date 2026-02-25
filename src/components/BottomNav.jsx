import React, { useState, useEffect } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { Home, SlowMotionVideo, Subscriptions } from '@mui/icons-material'; // Subscriptions icon add kiya
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(0);

  // URL ke hisaab se sahi button ko highligh (red) karne ke liye
  useEffect(() => {
    if (location.pathname === '/feed') setValue(0);
    else if (location.pathname === '/shorts') setValue(1);
    else if (location.pathname === '/subscriptions') setValue(2);
  }, [location.pathname]);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          if (newValue === 0) navigate('/feed');
          if (newValue === 1) navigate('/shorts');
          if (newValue === 2) navigate('/subscriptions'); // Subscription par bhejne ke liye
        }}
        sx={{ bgcolor: '#000', '& .Mui-selected': { color: '#FF1100 !important' } }}
      >
        <BottomNavigationAction 
          label="Home" 
          icon={<Home />} 
          sx={{ color: '#fff' }} 
        />
        <BottomNavigationAction 
          label="Shorts" 
          icon={<SlowMotionVideo />} 
          sx={{ color: '#fff' }} 
        />
        {/* YAHAN NAYA BUTTON AA GAYA */}
        <BottomNavigationAction 
          label="Subscriptions" 
          icon={<Subscriptions />} 
          sx={{ color: '#fff' }} 
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
