import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Box } from '@mui/material';
import { ChannelDetail, VideoDetail, SearchFeed, Navbar, Feed, Shorts, BottomNav, SubscriptionPage } from './components'; // SubscriptionPage add kiya
import LandingPage from './components/LandingPage'; 
import LoginPage from './components/LoginPage';

const AppContent = () => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
  const isAuthPage = location.pathname === '/' || location.pathname === '/login';

  return (
    <Box sx={{ backgroundColor: '#000', minHeight: '100vh', color: 'white' }}>
      {!isAuthPage && <Navbar />}
      
      <Routes>
        <Route exact path='/' element={isLoggedIn ? <Navigate to="/feed" /> : <LandingPage />} />
        <Route path='/login' element={isLoggedIn ? <Navigate to="/feed" /> : <LoginPage />} />
        
        <Route path='/feed' element={<Feed />} />
        <Route path='/subscriptions' element={<SubscriptionPage />} /> {/* Naya Route */}
        <Route path='/shorts' element={<Shorts />} />
        <Route path='/video/:id' element={<VideoDetail />} />
        <Route path='/channel/:id' element={<ChannelDetail />} />
        <Route path='/search/:searchTerm' element={<SearchFeed />} />
      </Routes>

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
