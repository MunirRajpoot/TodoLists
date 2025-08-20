import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login.jsx";
import SignupPage from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CssBaseline } from "@mui/material";
import Footer from "./components/layout/Footer.jsx";
import axios from "axios";
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Private Route Component
const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = still checking

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const res = await axios.get(`${API}/api/auth/validate`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.valid) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem("token");
          toast.error("Session expired. Please log in again.");
        }
      } catch (error) {
        console.log("error", error);
        setIsAuthenticated(false);
        localStorage.removeItem("token");
        toast.error("Invalid token. Please log in again.");
      }
    };

    checkToken();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // while checking token
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={1000} />
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
