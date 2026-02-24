import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';

import { ChannelDetail, VideoDetail, SearchFeed, Navbar, Feed, PlaylistDetail } from './components';
import LandingPage from './components/LandingPage'; 

const App = () => (
  <BrowserRouter>
    <Box sx={{ backgroundColor: '#000', minHeight: '100vh' }}>
      <Navbar />
      
      {/* SAARA KHEL YAHAN HAI: Routes ke andar hi sab kuch hona chahiye */}
      <Routes>
        {/* Sirf jab link ayus.fun/ hoga, tabhi Landing Page dikhega */}
        <Route exact path='/' element={<LandingPage />} />

        {/* Baaki sab apne-apne link par dikhenge */}
        <Route path='/feed' element={<Feed />} />
        <Route path='/video/:id' element={<VideoDetail />} />
        <Route path='/channel/:id' element={<ChannelDetail />} />
        <Route path='/playlist/:id' element={<PlaylistDetail />} />
        <Route path='/search/:searchTerm' element={<SearchFeed />} />
      </Routes>
      
    </Box>
  </BrowserRouter>
);

export default App;
