import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Box } from '@mui/material';
import { ChannelDetail, VideoDetail, SearchFeed, Navbar, Feed, Shorts, BottomNav } from './components';
import LandingPage from './components/LandingPage'; 
import LoginPage from './components/LoginPage';

const AppContent = () => {
  const location = useLocation();
  
  // LOGIC 1: Check karo user pehle se login hai ya nahi (localStorage se)
  const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';

  // LOGIC 2: Navbar aur BottomNav ko Landing/Login page par hide karna
  const isAuthPage = location.pathname === '/' || location.pathname === '/login';

  return (
    <Box sx={{ backgroundColor: '#000', minHeight: '100vh' }}>
      
      {/* Search bar sirf tab dikhega jab user login ho kar feed/video dekh raha ho */}
      {!isAuthPage && <Navbar />}
      
      <Routes>
        {/* LOGIC 3: Agar logged in hai, toh Landing/Login page nahi dikhega, seedha Feed aayega */}
        <Route exact path='/' element={isLoggedIn ? <Navigate to="/feed" /> : <LandingPage />} />
        <Route path='/login' element={isLoggedIn ? <Navigate to="/feed" /> : <LoginPage />} />
        
        {/* Aapke purane saare routes safe hain */}
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
