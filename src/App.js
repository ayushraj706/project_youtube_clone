import React, { Suspense, lazy, useEffect } from 'react'; 
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
// 🚀 Smart Imports: Poori library ki jagah sirf kaam ke components
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { Navbar, BottomNav } from './components'; 
import LandingPage from './components/LandingPage'; 
import LoginPage from './components/LoginPage';

const Feed = lazy(() => import('./components/Feed'));
const SubscriptionPage = lazy(() => import('./components/SubscriptionPage'));
const Shorts = lazy(() => import('./components/Shorts'));
const VideoDetail = lazy(() => import('./components/VideoDetail'));
const ChannelDetail = lazy(() => import('./components/ChannelDetail'));
const SearchFeed = lazy(() => import('./components/SearchFeed'));

const AppContent = () => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
  const isAuthPage = location.pathname === '/' || location.pathname === '/login';

  // 🌐 ADAPTIVE LOADING: Slow internet detect karne ke liye
  useEffect(() => {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn) {
      if (conn.saveData || ['slow-2g', '2g', '3g'].includes(conn.effectiveType)) {
        console.log("Slow connection detected. Optimizing resources...");
        // Yahan aap future mein heavy features ko disable karne ka logic daal sakte hain
      }
    }
  }, []);

  return (
    <Box sx={{ backgroundColor: '#000', minHeight: '100vh', color: 'white' }}>
      {!isAuthPage && <Navbar />}
      
      <Suspense fallback={
        <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
          <CircularProgress sx={{ color: '#FF1100' }} />
        </Box>
      }>
        <Routes>
          <Route exact path='/' element={isLoggedIn ? <Navigate to="/feed" /> : <LandingPage />} />
          <Route path='/login' element={isLoggedIn ? <Navigate to="/feed" /> : <LoginPage />} />
          
          <Route path='/feed' element={<Feed />} />
          <Route path='/subscriptions' element={<SubscriptionPage />} />
          <Route path='/shorts' element={<Shorts />} />
          <Route path='/video/:id' element={<VideoDetail />} />
          <Route path='/channel/:id' element={<ChannelDetail />} />
          <Route path='/search/:searchTerm' element={<SearchFeed />} />
        </Routes>
      </Suspense>

      {!isAuthPage && <BottomNav />}
    </Box>
  );
};

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
  
