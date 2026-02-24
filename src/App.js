import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Box } from '@mui/material';

// Aapke purane saare components
import { ChannelDetail, VideoDetail, SearchFeed, Navbar, Feed, Shorts, BottomNav } from './components';
import LandingPage from './components/LandingPage'; 
import LoginPage from './components/LoginPage';

const AppContent = () => {
  const location = useLocation();
  
  // LOGIC: In do pages par Navbar (Search Bar) aur BottomNav nahi dikhega
  const isAuthPage = location.pathname === '/' || location.pathname === '/login';

  return (
    <Box sx={{ backgroundColor: '#000', minHeight: '100vh' }}>
      
      {/* Agar page Home ya Login nahi hai, tabhi Navbar dikhao */}
      {!isAuthPage && <Navbar />}
      
      <Routes>
        {/* Purana logic: Landing page ab '/' par hai */}
        <Route exact path='/' element={<LandingPage />} />
        
        {/* Naya Login page */}
        <Route path='/login' element={<LoginPage />} />
        
        {/* Aapke purane saare routes waise ke waise hi hain */}
        <Route path='/feed' element={<Feed />} />
        <Route path='/shorts' element={<Shorts />} />
        <Route path='/video/:id' element={<VideoDetail />} />
        <Route path='/channel/:id' element={<ChannelDetail />} />
        <Route path='/search/:searchTerm' element={<SearchFeed />} />
      </Routes>

      {/* Bottom Navigation bhi sirf main content mein dikhegi */}
      {!isAuthPage && <BottomNav />}
    </Box>
  );
};

// Main App component jo Router provide karta hai
const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
