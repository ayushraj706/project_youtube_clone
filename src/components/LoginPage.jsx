import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#000">
      <Stack spacing={3} alignItems="center" sx={{ width: '90%', maxWidth: '400px', p: 4, borderRadius: '15px', border: '1px solid #333' }}>
        
        {/* Aapka Hexagon Logo */}
        <img src="/favicon.ico" alt="logo" height={80} />
        
        <Typography variant="h4" fontWeight="bold" color="white">Login</Typography>
        <Typography variant="body2" color="gray" textAlign="center">
          Apna Email daalein aur 10th Board ki taiyari shuru karein!
        </Typography>

        <TextField 
          fullWidth 
          label="Email Address" 
          variant="outlined" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ input: { color: 'white' }, label: { color: 'gray' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' } } }}
        />

        <Button fullWidth variant="contained" sx={{ bgcolor: '#FF1100', py: 1.5, fontWeight: 'bold' }}>
          SEND OTP
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginPage;
