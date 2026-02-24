import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Box } from '@mui/material';
import { ChannelDetail, VideoDetail, SearchFeed, Navbar, Feed, PlaylistDetail, Shorts, BottomNav } from './components';
import LandingPage from './components/LandingPage'; 
import LoginPage from './components/LoginPage'; // Naya LoginPage import kiya

const AppContent = () => {
  const location = useLocation();
  
  // LOGIC: Agar path '/' (Landing Page) hai, toh Navbar mat dikhao
  const showNavbar = location.pathname !== '/';

  return (
    <Box sx={{ backgroundColor: '#000', minHeight: '100vh' }}>
      {showNavbar && <Navbar />}
      
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/shorts' element={<Shorts />} />
        <Route path='/video/:id' element={<VideoDetail />} />
        <Route path='/channel/:id' element={<ChannelDetail />} />
        <Route path='/search/:searchTerm' element={<SearchFeed />} />
      </Routes>

      {/* BottomNav ko bhi sirf feed/shorts mein dikhana behtar hoga */}
      {showNavbar && location.pathname !== '/login' && <BottomNav />}
    </Box>
  );
};

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
