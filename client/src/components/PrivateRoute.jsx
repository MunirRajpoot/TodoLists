import React from "react";
import { useState,useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

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
        }
        checkToken();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // while checking token
    }

    return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;