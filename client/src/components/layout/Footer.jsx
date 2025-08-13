import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, GitHub } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.primary.main
            : theme.palette.background.paper,
        color: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.common.white
            : theme.palette.text.primary,
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid 
          container 
          spacing={{ xs: 4, sm: 6, md: 18 }} // responsive spacing
          justifyContent={{ xs: 'center', md: 'flex-start' }} // center on small screens
          textAlign={{ xs: 'center', sm: 'left' }} // center text on mobile
        >
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Todo App
            </Typography>
            <Typography variant="body2">
              Organize your life, one task at a time.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Quick Links
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              <li><Link href="#" color="inherit" underline="hover">Home</Link></li>
              <li><Link href="#" color="inherit" underline="hover">My Tasks</Link></li>
              <li><Link href="#" color="inherit" underline="hover">Completed</Link></li>
              <li><Link href="#" color="inherit" underline="hover">Settings</Link></li>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Resources
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              <li><Link href="#" color="inherit" underline="hover">Documentation</Link></li>
              <li><Link href="#" color="inherit" underline="hover">Help Center</Link></li>
              <li><Link href="#" color="inherit" underline="hover">Privacy Policy</Link></li>
              <li><Link href="#" color="inherit" underline="hover">Terms of Service</Link></li>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Connect With Us
            </Typography>
            <Box>
              <IconButton aria-label="Facebook" color="inherit"><Facebook /></IconButton>
              <IconButton aria-label="Twitter" color="inherit"><Twitter /></IconButton>
              <IconButton aria-label="Instagram" color="inherit"><Instagram /></IconButton>
              <IconButton aria-label="GitHub" color="inherit"><GitHub /></IconButton>
            </Box>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Subscribe to our newsletter
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ mt: 5, textAlign: 'center' }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} Todo App. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
