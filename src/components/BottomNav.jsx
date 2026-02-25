import React, { useState, useEffect } from 'react';
// 🚀 Smart Imports for Navigation
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';

// 🚀 Icons are heavy, import them individually
import HomeIcon from '@mui/icons-material/Home';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';

import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(0);

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
          if (newValue === 2) navigate('/subscriptions');
        }}
        sx={{ bgcolor: '#000', '& .Mui-selected': { color: '#FF1100 !important' } }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} sx={{ color: '#fff' }} />
        <BottomNavigationAction label="Shorts" icon={<SlowMotionVideoIcon />} sx={{ color: '#fff' }} />
        <BottomNavigationAction label="Subscriptions" icon={<SubscriptionsIcon />} sx={{ color: '#fff' }} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
    
