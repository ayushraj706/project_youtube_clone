import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpScreen, setShowOtpScreen] = useState(false);

  // OTP Input handle karne ka logic (xxxxxx placeholder)
  const handleOtpChange = (e) => {
    const val = e.target.value.replace(/\D/g, ''); // Sirf numbers allow karein
    if (val.length <= 6) setOtp(val);
  };

  // Display ke liye placeholder logic
  const displayOtp = otp + "x".repeat(6 - otp.length);

  const handleSendOtp = async () => {
    if(!email) return alert("Bhai, Email toh daalo!");
    try {
      // Vercel backend ko call karein
      await axios.post('/api/send-otp', { email });
      setShowOtpScreen(true);
    } catch (err) { alert("OTP bhejne mein galti hui!"); }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#000">
      <Stack spacing={3} alignItems="center" sx={{ width: '90%', maxWidth: '400px', p: 4, borderRadius: '15px', border: '1px solid #333' }}>
        <img src="/favicon.ico" alt="logo" height={80} />
        
        {!showOtpScreen ? (
          <>
            <Typography variant="h4" fontWeight="bold" color="white">Login</Typography>
            <TextField 
              fullWidth label="Email Address" 
              variant="outlined" value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' } } }}
            />
            <Button fullWidth onClick={handleSendOtp} variant="contained" sx={{ bgcolor: '#FF1100', fontWeight: 'bold' }}>
              SEND OTP
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h4" fontWeight="bold" color="white">Verify OTP</Typography>
            <Typography color="gray">Ek 6-digit code aapke email par bheja gaya hai.</Typography>
            
            {/* Custom Styled OTP Input */}
            <Box sx={{ position: 'relative', width: '100%' }}>
              <Typography variant="h3" sx={{ textAlign: 'center', letterSpacing: '10px', color: '#FF1100', fontWeight: 'bold', fontFamily: 'monospace' }}>
                {displayOtp}
              </Typography>
              <input 
                type="text" value={otp} onChange={handleOtpChange}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
              />
            </Box>

            <Button fullWidth variant="contained" sx={{ bgcolor: '#FF1100', fontWeight: 'bold' }}>
              LOGIN NOW
            </Button>
            <Typography onClick={() => setShowOtpScreen(false)} sx={{ color: 'gray', cursor: 'pointer', fontSize: '14px' }}>
              Galti ho gayi? Email badlein
            </Typography>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default LoginPage;
