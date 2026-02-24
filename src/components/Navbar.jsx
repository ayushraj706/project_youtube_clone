import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

import SearchBar from "./SearchBar"; // SearchBar ko import kiya

const Navbar = () => (
  <Stack 
    direction="row" 
    alignItems="center" 
    p={2} 
    sx={{ 
      position: "sticky", 
      background: '#000', 
      top: 0, 
      justifyContent: "space-between", 
      zIndex: 100,
      borderBottom: '1px solid #3d3d3d' // Halki patti jo design ko premium banati hai
    }}
  >
    {/* Logo Section */}
    <Link to="/" style={{ display: "flex", alignItems: "center" }}>
      <img 
        src="/favicon.ico" 
        alt="Ayush Video App Logo" 
        height={45} 
      />
    </Link>
    
    {/* Search Bar Section (Right Side) */}
    <SearchBar /> 
  </Stack>
);

export default Navbar;
