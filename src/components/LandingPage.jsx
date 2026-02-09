import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Stack, Container, Grid, Paper, Card, CardContent, CardMedia } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

// Yahan se Video Data aa raha hai (Jo aapne videoData.js banaya tha)
import { educationalVideos } from '../utils/videoData';

const LandingPage = () => {
  return (
    <Box sx={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      
      {/* ---------------- 1. HERO SECTION (Upar wala hissa) ---------------- */}
      <Box 
        sx={{
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(20,20,20,1) 100%)',
          textAlign: 'center',
          padding: '20px'
        }}
      >
        <Typography variant="h2" fontWeight="900" sx={{ color: '#FC1503', textTransform: 'uppercase', letterSpacing: '2px', mb: 2 }}>
          Ayush Video App
        </Typography>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 3, maxWidth: '800px' }}>
          India's #1 Free Learning Platform for <span style={{ color: '#FC1503' }}>Class 10th</span> Students
        </Typography>
        <Typography variant="body1" sx={{ color: 'gray', mb: 5, maxWidth: '600px', fontSize: '1.2rem' }}>
          Crack your Bihar Board (BSEB) & CBSE Matric Exams 2026 with our premium video lectures, PDF notes, and model papers. 100% Free. No Hidden Costs.
        </Typography>

        <Link to="/feed" style={{ textDecoration: 'none' }}>
          <Button 
            variant="contained" 
            size="large"
            sx={{ 
              backgroundColor: '#FC1503', 
              fontSize: '20px', 
              padding: '15px 50px', 
              borderRadius: '50px',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#d91202' }
            }}
          >
            Start Learning Now
          </Button>
        </Link>
      </Box>

      {/* ---------------- 2. CONTENT SECTION (AdSense Text) ---------------- */}
      <Container maxWidth="lg" sx={{ paddingBottom: '100px' }}>
        
        {/* Why Choose Us */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ borderLeft: '5px solid #FC1503', pl: 2 }}>
            Our Mission
          </Typography>
          <Typography variant="body1" sx={{ color: '#ccc', lineHeight: 1.8, fontSize: '1.1rem', mb: 3 }}>
            Welcome to <b>Ayush Video App</b>. We provide the best educational videos from top educators and organize them subject-wise. Whether you are preparing for your <b>Matriculation Board Exams 2026</b> or just want to clear your concepts in Science and Maths, Ayush Video App is your one-stop solution.
          </Typography>
        </Box>

        {/* ---------------- 3. VIDEO RECOMMENDATION (Yahan aayengi Videos) ---------------- */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ borderLeft: '5px solid #FC1503', pl: 2, mb: 4 }}>
            Popular Lectures (Must Watch)
          </Typography>
          
          <Grid container spacing={3}>
            {/* Ye Loop hai jo videoData.js se videos utha raha hai */}
            {educationalVideos.map((video, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper sx={{ backgroundColor: '#1e1e1e', color: '#fff', borderRadius: '10px', overflow: 'hidden', height: '100%' }}>
                  
                  {/* YouTube Video Player */}
                  <CardMedia
                    component="iframe"
                    height="200"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    sx={{ border: 'none' }}
                  />
                  
                  {/* Video ka Title aur Description */}
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, fontSize: '1rem', color: '#FC1503' }}>
                      {video.title}
                    </Typography>
                    <Typography variant="body2" color="#aaa" sx={{ fontSize: '0.85rem' }}>
                      {video.desc}
                    </Typography>
                  </CardContent>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Features Grid */}
        <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ borderLeft: '5px solid #FC1503', pl: 2, mb: 4 }}>
          Features
        </Typography>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {[
            { icon: <SchoolIcon sx={{ fontSize: 40, color: '#FC1503' }} />, title: "Structured Syllabus", desc: "Complete coverage of NCERT and Bihar Board syllabus." },
            { icon: <OndemandVideoIcon sx={{ fontSize: 40, color: '#FC1503' }} />, title: "HD Video Lectures", desc: "Learn from the best teachers in India." },
            { icon: <MenuBookIcon sx={{ fontSize: 40, color: '#FC1503' }} />, title: "Free PDF Notes", desc: "Download chapter-wise notes and papers." },
            { icon: <VerifiedUserIcon sx={{ fontSize: 40, color: '#FC1503' }} />, title: "Zero Distractions", desc: "A clean interface designed purely for studying." }
          ].map((item, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper sx={{ p: 3, backgroundColor: '#1e1e1e', color: '#fff', borderRadius: '15px' }}>
                {item.icon}
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 1 }}>{item.title}</Typography>
                <Typography variant="body2" color="gray">{item.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Footer */}
        <Box sx={{ borderTop: '1px solid #333', pt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="gray">
            Copyright © 2026 Ayush Raj. All Rights Reserved.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
            <Typography variant="caption" color="gray" sx={{ cursor: 'pointer' }}>Privacy Policy</Typography>
            <Typography variant="caption" color="gray" sx={{ cursor: 'pointer' }}>Terms of Service</Typography>
          </Stack>
        </Box>

      </Container>
    </Box>
  );
};

export default LandingPage;
