import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login.jsx';
import SignupPage from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CssBaseline } from "@mui/material";
import Footer from './components/layout/Footer.jsx';

// Simple private route check
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Private Routes */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/" element={<PrivateRoute><Navigate to="/dashboard" /></PrivateRoute>} />
          <Route path="/footer" element={<PrivateRoute><Footer /></PrivateRoute>} />

          {/* Catch-All Route */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
