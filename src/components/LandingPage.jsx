import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Stack, Container, Grid, Paper } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const LandingPage = () => {
  return (
    <Box sx={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      
      {/* ---------------- HERO SECTION ---------------- */}
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
        <Typography variant="caption" sx={{ mt: 2, color: 'gray' }}>
          *No Login Required for Basic Access
        </Typography>
      </Box>

      {/* ---------------- CONTENT SECTION (AdSense Text) ---------------- */}
      <Container maxWidth="lg" sx={{ paddingBottom: '100px' }}>
        
        {/* Why Choose Us */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ borderLeft: '5px solid #FC1503', pl: 2 }}>
            Our Mission: Education for All
          </Typography>
          <Typography variant="body1" sx={{ color: '#ccc', lineHeight: 1.8, fontSize: '1.1rem', mb: 3 }}>
            Welcome to <b>Ayush Video App</b>, a revolutionary initiative started by Ayush Raj to democratize education in India. We believe that quality education is a fundamental right, not a privilege. In today's digital age, many students from rural areas in Bihar and across India struggle to find structured educational content. They waste hours searching on YouTube for the right chapters, often getting distracted by entertainment videos.
          </Typography>
          <Typography variant="body1" sx={{ color: '#ccc', lineHeight: 1.8, fontSize: '1.1rem' }}>
            Our platform solves this problem by curating the <b>Best Educational Videos</b> from top educators and organizing them subject-wise. Whether you are preparing for your <b>Matriculation Board Exams 2026</b> or just want to clear your concepts in Science and Maths, Ayush Video App is your one-stop solution. We ensure that students stay focused, motivated, and on the right track to achieve 90%+ marks.
          </Typography>
        </Box>

        {/* Features Grid */}
        <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ borderLeft: '5px solid #FC1503', pl: 2, mb: 4 }}>
          Why Students Love Us?
        </Typography>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {[
            { icon: <SchoolIcon sx={{ fontSize: 50, color: '#FC1503' }} />, title: "Structured Syllabus", desc: "Complete coverage of NCERT and Bihar Board syllabus for Class 10th." },
            { icon: <OndemandVideoIcon sx={{ fontSize: 50, color: '#FC1503' }} />, title: "HD Video Lectures", desc: "Learn from the best teachers in India. Concepts explained in simple Hindi." },
            { icon: <MenuBookIcon sx={{ fontSize: 50, color: '#FC1503' }} />, title: "Free PDF Notes", desc: "Download chapter-wise notes, formula sheets, and previous year question papers." },
            { icon: <VerifiedUserIcon sx={{ fontSize: 50, color: '#FC1503' }} />, title: "Zero Distractions", desc: "A clean interface designed purely for studying. No reels, no spam, just learning." }
          ].map((item, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper sx={{ p: 4, backgroundColor: '#1e1e1e', color: '#fff', borderRadius: '15px' }}>
                {item.icon}
                <Typography variant="h5" fontWeight="bold" sx={{ mt: 2, mb: 1 }}>{item.title}</Typography>
                <Typography variant="body1" color="gray">{item.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Detailed Syllabus (More Keywords for AdSense) */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Subjects We Cover
          </Typography>
          <Typography variant="body1" sx={{ color: '#ccc', mb: 2 }}>
            We provide comprehensive study material for the following subjects:
          </Typography>
          <ul>
            <li style={{ color: '#ccc', marginBottom: '10px' }}><b>Mathematics (Ganit):</b> Real Numbers, Polynomials, Trigonometry, Geometry, Statistics.</li>
            <li style={{ color: '#ccc', marginBottom: '10px' }}><b>Science (Vigyan):</b> Chemical Reactions, Acids Bases & Salts, Life Processes, Light Reflection & Refraction, Electricity.</li>
            <li style={{ color: '#ccc', marginBottom: '10px' }}><b>Social Science (Samajik Vigyan):</b> History, Geography, Civics, Economics, Disaster Management.</li>
            <li style={{ color: '#ccc', marginBottom: '10px' }}><b>Languages:</b> Hindi (Godhuli), Sanskrit, and English Grammar.</li>
          </ul>
        </Box>

        {/* FAQ Section (AdSense Booster) */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ borderLeft: '5px solid #FC1503', pl: 2 }}>
            Frequently Asked Questions
          </Typography>
          <Stack spacing={3} sx={{ mt: 3 }}>
            <Box>
              <Typography variant="h6" fontWeight="bold" color="#FC1503">Q: Is this app completely free?</Typography>
              <Typography variant="body1" color="#ccc">Yes! Ayush Video App is 100% free for all students. Our mission is to support education.</Typography>
            </Box>
            <Box>
              <Typography variant="h6" fontWeight="bold" color="#FC1503">Q: Do you provide Bihar Board specific content?</Typography>
              <Typography variant="body1" color="#ccc">Absolutely. Our content is tailored for BSEB (Bihar School Examination Board) students.</Typography>
            </Box>
            <Box>
              <Typography variant="h6" fontWeight="bold" color="#FC1503">Q: How can I contact the developer?</Typography>
              <Typography variant="body1" color="#ccc">You can reach out to Ayush Raj at contact@ayus.fun for any queries or suggestions.</Typography>
            </Box>
          </Stack>
        </Box>

        {/* Footer */}
        <Box sx={{ borderTop: '1px solid #333', pt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="gray">
            Copyright © 2026 Ayush Raj. All Rights Reserved.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
            <Typography variant="caption" color="gray" sx={{ cursor: 'pointer' }}>Privacy Policy</Typography>
            <Typography variant="caption" color="gray" sx={{ cursor: 'pointer' }}>Terms of Service</Typography>
            <Typography variant="caption" color="gray" sx={{ cursor: 'pointer' }}>About Developer</Typography>
          </Stack>
        </Box>

      </Container>
    </Box>
  );
};

export default LandingPage;
