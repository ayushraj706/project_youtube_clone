import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Magic Logic: 'x' ko digits se replace karna
  const renderOtpDisplay = () => {
    const placeholder = "xxxxxx";
    return otp + placeholder.slice(otp.length);
  };

  const handleSendOtp = async () => {
    if (!email) return alert("Bhai, pehle Gmail toh daalo!");
    setLoading(true);
    try {
      // Backend call to Vercel API
      const response = await axios.post('/api/send-otp', { email });
      if (response.data.success) {
        setIsOtpSent(true);
      }
    } catch (err) {
      console.error(err);
      alert("OTP bhejne mein galti hui! Check karo Resend API sahi hai ya nahi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#000">
      <Stack spacing={4} alignItems="center" sx={{ width: '90%', maxWidth: '400px', p: 4, borderRadius: '20px', border: '1px solid #222', background: '#0a0a0a' }}>
        
        {/* Hexagon Logo */}
        <img src="/favicon.ico" alt="logo" height={70} />

        {!isOtpSent ? (
          <>
            <Typography variant="h4" fontWeight="bold" color="white">Login</Typography>
            <Typography variant="body2" color="gray" textAlign="center">Apna Email daalein aur 10th Board ki taiyari shuru karein!</Typography>
            
            <TextField 
              fullWidth placeholder="example@gmail.com" 
              value={email} onChange={(e) => setEmail(e.target.value)}
              sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' }, '&:hover fieldset': { borderColor: '#FF1100' } } }}
            />

            <Button fullWidth onClick={handleSendOtp} disabled={loading} variant="contained" sx={{ bgcolor: '#FF1100', py: 1.5, '&:hover': { bgcolor: '#cc0e00' } }}>
              {loading ? "Bhej raha hoon..." : "SEND OTP"}
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h4" fontWeight="bold" color="white">Verify Code</Typography>
            
            {/* GitHub Style xxxxx Display */}
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <Typography variant="h3" sx={{ letterSpacing: '8px', fontFamily: 'monospace', color: '#FF1100', fontWeight: 'bold' }}>
                {renderOtpDisplay()}
              </Typography>
              <Typography variant="caption" color="gray">Type your 6-digit code</Typography>
            </Box>

            <input 
              autoFocus type="text" maxLength="6" value={otp} 
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              style={{ opacity: 0, position: 'absolute', zIndex: -1 }} 
            />

            <Button fullWidth variant="contained" sx={{ bgcolor: '#2ea44f', py: 1.5, fontWeight: 'bold' }}>
              VERIFY & LOGIN
            </Button>
            
            <Typography onClick={() => setIsOtpSent(false)} sx={{ color: 'gray', cursor: 'pointer', mt: 2, fontSize: '13px' }}>
              Email galat hai? Wapas jaiye
            </Typography>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default LoginPage;
