import React, { useState, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = checking
  const toastShown = useRef(false);

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
          if (!toastShown.current) {
            toast.error("Session expired. Please log in again.", { toastId: "session-expired" });
            toastShown.current = true;
          }
        }
      } catch (error) {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
        if (!toastShown.current) {
          toast.error("Invalid token. Please log in again.", { toastId: "invalid-token" });
          toastShown.current = true;
        }
      }
    };

    checkToken();
  }, []);

  if (isAuthenticated === null) {
    // 🔹 Show loading spinner while checking token
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
