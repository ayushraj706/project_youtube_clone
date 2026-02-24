import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => (
  <Stack 
    direction="row" 
    alignItems="center" 
    p={2} 
    sx={{ position: "sticky", background: '#000', top: 0, justifyContent: "space-between", zIndex: 100 }}
  >
    <Link to="/" style={{ display: "flex", alignItems: "center" }}>
      {/* YAHAN DEKHO: 
          Agar aapne public folder mein 'favicon.ico' rakha hai toh rasta hoga "/favicon.ico"
          Agar aapne wahan 'logo.png' rakha hai toh rasta hoga "/logo.png"
      */}
      <img 
        src="/favicon.ico" 
        alt="Ayush Video App Logo" 
        height={45} 
      />
    </Link>
    
    {/* SearchBar Component yahan aayega */}
  </Stack>
);

export default Navbar;
