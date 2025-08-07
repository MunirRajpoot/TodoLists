import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
      await register({ name, email, password });
      navigate('/login');
  };

  const additionalFields = [
    {
      id: 'name',
      name: 'name',
      label: 'Full Name',
      value: name,
      onChange: (e) => setName(e.target.value),
      required: true,
    },
  ];

  return (
    <AuthForm
      title="Sign up"
      onSubmit={handleSubmit}
      additionalFields={additionalFields}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      submitButtonText="Sign Up"
      footerText="Already have an account?"
      footerLinkText="Sign In"
      footerLinkPath="/login"
      isLoading={isLoading}
      error={error}
    />
  );
};

export default Register;
