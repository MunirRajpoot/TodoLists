// src/components/Auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';

const Login = ({ onLogin, isLoading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <AuthForm
      title="Sign in"
      onSubmit={handleSubmit}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      submitButtonText="Sign In"
      footerText="Don't have an account?"
      footerLinkText="Sign Up"
      footerLinkPath="/register"
      isLoading={isLoading}
      error={error}
    />
  );
};

export default Login;