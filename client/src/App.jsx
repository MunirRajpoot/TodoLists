import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './auth/Login';
import Register from './auth/Register';
import Dashboard from './components/Dashboard';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginWrapper />} />
          <Route path="/register" element={<RegisterWrapper />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

const LoginWrapper = () => {
  const { login, isLoading, error } = useAuth();
  return <Login onLogin={login} isLoading={isLoading} error={error} />;
};

const RegisterWrapper = () => {
  const { register, isLoading, error } = useAuth();
  return <Register onRegister={register} isLoading={isLoading} error={error} />;
};

export default App;
