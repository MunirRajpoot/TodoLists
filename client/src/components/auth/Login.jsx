import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthForm from "./AuthForm";
import axios from "axios";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { Box } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showInitialSpinner, setShowInitialSpinner] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Check if coming from signup page
  useEffect(() => {
    if (location.state?.fromSignup) {
      setShowInitialSpinner(true);

      const timer = setTimeout(() => {
        setShowInitialSpinner(false);
        // Clear the state so spinner won't show again on refresh
        navigate(location.pathname, { replace: true });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [location.state, location.pathname, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      toast.success("Logged in successfully!");
      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // Show spinner before form if coming from signup
  if (showInitialSpinner) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ClipLoader color="#536dfe" size={60} />
      </Box>
    );
  }

  return (
    <AuthForm
      title="Sign In"
      onSubmit={handleSubmit}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      submitButtonText="Sign In"
      footerText="Don't have an account?"
      footerLinkText="Sign Up"
      footerLinkPath="/signup"
      isLoading={isLoading}
      error={error}
      checkboxText="Remember me"
      imageUrl= "/Images/login.jpg"
    />
  );
};

export default Login;
