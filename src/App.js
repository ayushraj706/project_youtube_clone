import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';

// Purane components wahi hain
import { ChannelDetail, VideoDetail, SearchFeed, Navbar, Feed } from './components';

// Naya Landing Page import kiya (Dhyaan dena yahan)
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

        {/* Baaki sab same hai */}
        <Route path='/video/:id' element={<VideoDetail />} />
        <Route path='/channel/:id' element={<ChannelDetail />} />
        <Route path='/search/:searchTerm' element={<SearchFeed />} />
      </Routes>
    </Box>
  </BrowserRouter>
);

export default App;
