import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';
import { ChannelDetail, VideoDetail, SearchFeed, Navbar, Feed, PlaylistDetail } from './components';
import LandingPage from './components/LandingPage'; 

const App = () => {
  return (
    <BrowserRouter>
      <Box sx={{ backgroundColor: '#000', minHeight: '100vh' }}>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<LandingPage />} />
          <Route path='/feed' element={<Feed />} />
          
          {/* Isme humne VideoPlayer wala logic integrate kiya hai */}
          <Route path='/video/:id' element={<VideoDetail />} />
          
          <Route path='/channel/:id' element={<ChannelDetail />} />
          <Route path='/playlist/:id' element={<PlaylistDetail />} />
          <Route path='/search/:searchTerm' element={<SearchFeed />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
};

export default App;
