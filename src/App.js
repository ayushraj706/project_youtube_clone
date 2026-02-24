import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';

// Naye Shorts aur BottomNav ko import kiya
import { ChannelDetail, VideoDetail, SearchFeed, Navbar, Feed, PlaylistDetail, Shorts, BottomNav } from './components';
import LandingPage from './components/LandingPage'; 

const App = () => (
  <BrowserRouter>
    {/* pb: '70px' isliye diya taaki Bottom Nav ke piche ka content chhupe nahi */}
    <Box sx={{ backgroundColor: '#000', minHeight: '100vh', pb: '70px' }}>
      <Navbar />
      
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        
        <Route path='/feed' element={<Feed />} />
        
        {/* NAYA: Shorts Route */}
        <Route path='/shorts' element={<Shorts />} />

        <Route path='/video/:id' element={<VideoDetail />} />
        <Route path='/channel/:id' element={<ChannelDetail />} />
        <Route path='/playlist/:id' element={<PlaylistDetail />} />
        <Route path='/search/:searchTerm' element={<SearchFeed />} />
      </Routes>

      {/* NAYA: Bottom Navigation Patti */}
      <BottomNav />
      
    </Box>
  </BrowserRouter>
);

export default App;
