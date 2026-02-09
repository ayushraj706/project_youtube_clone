import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';

// Dhyan do: Yahan maine 'PlaylistDetail' add kiya hai list mein
import { ChannelDetail, VideoDetail, SearchFeed, Navbar, Feed, PlaylistDetail } from './components';

import LandingPage from './components/LandingPage'; 

const App = () => (
  <BrowserRouter>
    <Box sx={{ backgroundColor: '#000' }}>
      <Navbar />
      <Routes>
        {/* 1. Jab koi site kholega, toh Landing Page dikhega */}
        <Route exact path='/' element={<LandingPage />} />

        {/* 2. Button dabane par wo yahan aayega (Video Feed) */}
        <Route path='/feed' element={<Feed />} />

        {/* 3. Single Video */}
        <Route path='/video/:id' element={<VideoDetail />} />

        {/* 4. Channel Detail */}
        <Route path='/channel/:id' element={<ChannelDetail />} />

        {/* --- 5. NAYA: Playlist Detail (Ye add kiya hai) --- */}
        <Route path='/playlist/:id' element={<PlaylistDetail />} />

        {/* 6. Search Result */}
        <Route path='/search/:searchTerm' element={<SearchFeed />} />
      </Routes>
    </Box>
  </BrowserRouter>
);

export default App;
