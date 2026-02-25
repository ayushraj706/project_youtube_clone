import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const renderOtpMask = () => {
    const fullPlaceholder = "xxxxxx";
    return otp + fullPlaceholder.slice(otp.length);
  };

  const handleSendOtp = async () => {
    if (!email) return alert("Bhai, Email toh daalo!");
    
    // Pehla Pop-up: Ye confirm karega ki button zinda hai
    alert("1. Button daba diya gaya hai! Ab Vercel ko request jayegi."); 
    
    setLoading(true);
    try {
      const res = await axios.post('/api/send-otp', { email });
      // Dusra Pop-up: Agar Vercel ne OTP bhej diya
      alert("2. Vercel tak request chali gayi. Jawab aaya: " + JSON.stringify(res.data)); 
      setIsOtpSent(true);
    } catch (err) {
      // Teesra Pop-up: Raste ka asli error yahan dikhega
      alert("3. Raste mein error aaya: " + err.message); 
    } finally { 
      setLoading(false); 
    }
  };

  const handleVerifyAndLogin = async () => {
    if (otp.length < 6) return alert("Pura 6 digit code daaliye!");
    setLoading(true);
    try {
      const response = await axios.post('/api/verify-otp', { email, otp });
      if (response.data.success) {
        localStorage.setItem('userLoggedIn', 'true');
        navigate('/feed');
        window.location.reload();
      }
    } catch (err) {
      alert("Galat OTP! Fir se koshish karein.");
    } finally { setLoading(false); }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="background.default" color="text.primary">
      <Stack spacing={3} alignItems="center" sx={{ width: '90%', maxWidth: '400px', p: 4, borderRadius: '15px', border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
        <img src="/favicon.ico" alt="logo" height={70} />

        {!isOtpSent ? (
          <>
            <Typography variant="h4" fontWeight="bold">Login</Typography>
            <TextField fullWidth label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button 
              fullWidth 
              onClick={handleSendOtp} 
              disabled={loading}
              variant="contained" 
              sx={{ bgcolor: '#2ea44f', color: 'white', py: 1.5, '&:hover': { bgcolor: '#2c974b' } }}
            >
              {loading ? "Sending..." : "SEND OTP"}
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h4" fontWeight="bold">Verify OTP</Typography>
            <Box sx={{ position: 'relative', py: 4 }}>
              <Typography variant="h3" sx={{ letterSpacing: '12px', fontFamily: 'monospace', color: '#2ea44f', fontWeight: 'bold' }}>
                {renderOtpMask()}
              </Typography>
              <input 
                autoFocus type="text" inputMode="numeric" pattern="[0-9]*"
                maxLength="6" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'text' }}
              />
            </Box>
            <Button fullWidth onClick={handleVerifyAndLogin} disabled={loading} variant="contained" sx={{ bgcolor: '#2ea44f', color: 'white', py: 1.5, '&:hover': { bgcolor: '#2c974b' } }}>
              {loading ? "Checking..." : "VERIFY & LOGIN"}
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default LoginPage;
