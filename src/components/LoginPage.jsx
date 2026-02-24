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
    setLoading(true);
    try {
      await axios.post('/api/send-otp', { email });
      setIsOtpSent(true);
    } catch (err) {
      alert("OTP nahi gaya! Vercel variables check karein.");
    } finally { setLoading(false); }
  };

  // ASLI LOGIC: Verify karke home page par bhejna
  const handleVerifyAndLogin = async () => {
    if (otp.length < 6) return alert("Pura 6 digit code daaliye!");
    setLoading(true);
    try {
      const response = await axios.post('/api/verify-otp', { email, otp });
      if (response.data.success) {
        // 1. Session Save Karo (Tijori mein token)
        localStorage.setItem('userLoggedIn', 'true');
        
        // 2. Feed par bhej do
        navigate('/feed');
        
        // 3. Refresh taaki App.js update ho jaye
        window.location.reload();
      }
    } catch (err) {
      alert("Galat OTP! Fir se koshish karein.");
    } finally { setLoading(false); }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#000">
      <Stack spacing={3} alignItems="center" sx={{ width: '90%', maxWidth: '400px', p: 4, borderRadius: '15px', border: '1px solid #333', background: '#0a0a0a' }}>
        <img src="/favicon.ico" alt="logo" height={70} />

        {!isOtpSent ? (
          <>
            <Typography variant="h4" fontWeight="bold" color="white">Login</Typography>
            <TextField fullWidth label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' } } }} />
            <Button fullWidth onClick={handleSendOtp} variant="contained" sx={{ bgcolor: '#FF1100', py: 1.5 }}>SEND OTP</Button>
          </>
        ) : (
          <>
            <Typography variant="h4" fontWeight="bold" color="white">Verify OTP</Typography>
            <Box sx={{ position: 'relative', py: 4 }}>
              <Typography variant="h3" sx={{ letterSpacing: '12px', fontFamily: 'monospace', color: '#FF1100', fontWeight: 'bold' }}>
                {renderOtpMask()}
              </Typography>
              {/* NUMERIC KEYBOARD LOGIC: inputMode numeric set kiya hai */}
              <input 
                autoFocus type="text" inputMode="numeric" pattern="[0-9]*"
                maxLength="6" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'text' }}
              />
            </Box>
            <Button fullWidth onClick={handleVerifyAndLogin} variant="contained" sx={{ bgcolor: '#2ea44f', py: 1.5 }}>
              {loading ? "Checking..." : "VERIFY & LOGIN"}
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default LoginPage;
