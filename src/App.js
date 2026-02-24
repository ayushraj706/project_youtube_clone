import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Box } from '@mui/material';
import { ChannelDetail, VideoDetail, SearchFeed, Navbar, Feed, Shorts, BottomNav } from './components';
import LandingPage from './components/LandingPage'; 
import LoginPage from './components/LoginPage';

const AppContent = () => {
  const location = useLocation();
  
  // Memory check: Kya user login hai?
  const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';

  // Auth pages (Home aur Login) par search bar nahi dikhana hai
  const isAuthPage = location.pathname === '/' || location.pathname === '/login';

  return (
    <Box sx={{ backgroundColor: '#000', minHeight: '100vh' }}>
      {!isAuthPage && <Navbar />}
      
      <Routes>
        {/* Agar login hai, toh seedha Feed par bhej do, warna Landing dikhao */}
        <Route exact path='/' element={isLoggedIn ? <Navigate to="/feed" /> : <LandingPage />} />
        <Route path='/login' element={isLoggedIn ? <Navigate to="/feed" /> : <LoginPage />} />
        
        {/* Aapke purane saare zaroori routes */}
        <Route path='/feed' element={<Feed />} />
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
          
