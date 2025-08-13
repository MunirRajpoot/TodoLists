import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password, // plain password sent securely over HTTPS
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
    />
  );
};

export default Login;
