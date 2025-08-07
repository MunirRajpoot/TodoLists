import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Welcome, {user?.name}</Typography>
      <Typography>Email: {user?.email}</Typography>
      <Button 
        variant="contained" 
        sx={{ mt: 2, mr: 2 }} 
        onClick={() => navigate('/todos')}
      >
        Go to Todo App
      </Button>
      <Button variant="outlined" sx={{ mt: 2 }} onClick={logout}>Logout</Button>
    </Box>
  );
};

export default Dashboard;