import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const renderOtpMask = () => {
    const fullPlaceholder = "xxxxxx";
    return otp + fullPlaceholder.slice(otp.length);
  };

  const handleSendOtp = async () => {
    if (!email) return alert("Bhai, Email toh daalo!");
    setLoading(true);
    
    try {
      const response = await axios.post('/api/send-otp', { email });
      if (response.data.success) {
        setIsOtpSent(true);
      }
    } catch (err) {
      console.error("Full Error Object:", err);
      
      // LOGIC: Server se jo error message aayega use nikalna
      const serverError = err.response?.data?.error; 
      const networkError = err.message;
      
      // Detailed Alert
      alert(`OTP Bhejne Mein Galti Hui!\n\nReason: ${serverError || networkError || "Unknown Issue"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#000">
      <Stack spacing={3} alignItems="center" sx={{ width: '90%', maxWidth: '400px', p: 4, borderRadius: '15px', border: '1px solid #333', background: '#0a0a0a' }}>
        <img src="/favicon.ico" alt="logo" height={70} />

        {!isOtpSent ? (
          <>
            <Typography variant="h4" fontWeight="bold" color="white">Login</Typography>
            <TextField 
              fullWidth label="Email Address" 
              variant="outlined" value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' } } }}
            />
            <Button fullWidth onClick={handleSendOtp} disabled={loading} variant="contained" sx={{ bgcolor: '#FF1100', py: 1.5, fontWeight: 'bold' }}>
              {loading ? "Checking..." : "SEND OTP"}
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h4" fontWeight="bold" color="white">Verify OTP</Typography>
            <Box sx={{ position: 'relative', py: 4 }}>
              <Typography variant="h3" sx={{ letterSpacing: '12px', fontFamily: 'monospace', color: '#FF1100', fontWeight: 'bold' }}>
                {renderOtpMask()}
              </Typography>
              <input 
                autoFocus type="text" maxLength="6" value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'text' }}
              />
            </Box>
            <Button fullWidth variant="contained" sx={{ bgcolor: '#2ea44f', py: 1.5, fontWeight: 'bold' }}>
              VERIFY & LOGIN
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default LoginPage;
