import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Stack } from '@mui/material';

const LandingPage = () => {
  return (
    <Box sx={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      
      {/* 1. Hero Section (Jo sabse pehle dikhega) */}
      <Stack direction="column" alignItems="center" justifyContent="center" height="80vh" spacing={3} textAlign="center">
        <Typography variant="h2" fontWeight="bold" sx={{ color: '#FC1503' }}>
          Ayush Video App
        </Typography>
        <Typography variant="h5" color="gray">
          Bihar Board Students ke liye No. 1 Free Learning Platform
        </Typography>
        
        {/* Ye wo Button hai jo andar le jayega */}
        <Link to="/feed" style={{ textDecoration: 'none' }}>
          <Button variant="contained" sx={{ backgroundColor: '#FC1503', fontSize: '18px', padding: '10px 30px' }}>
            Start Watching For Free
          </Button>
        </Link>
      </Stack>

      {/* 2. Content Section (Ye AdSense ke liye hai - Isme kahani likhni hogi) */}
      <Box sx={{ maxWidth: '800px', margin: 'auto', paddingBottom: '50px' }}>
        <Typography variant="h4" fontWeight="bold" mb={2}>Why Choose Us?</Typography>
        <Typography variant="body1" paragraph>
          Welcome to Ayush Video App. We provide the best educational content for Class 10th students strictly based on the Bihar Board syllabus. Our goal is to make education free and accessible to everyone.
        </Typography>
        
        <Typography variant="h5" fontWeight="bold" mt={3} mb={1}>Features:</Typography>
        <ul>
          <li><Typography>No Ads Interruptions (Focus Mode)</Typography></li>
          <li><Typography>Free PDF Notes & Model Papers</Typography></li>
          <li><Typography>High-Quality Lectures for Science & Maths</Typography></li>
        </ul>
      </Box>

    </Box>
  );
};

export default LandingPage;

