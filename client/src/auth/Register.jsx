import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
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
