import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
    navigate("/dashboard");
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