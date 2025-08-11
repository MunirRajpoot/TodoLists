import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/Login.jsx';
import SignupPage from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';


const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/" element={<PrivateRoute><Navigate to="/dashboard" /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

const LoginWrapper = () => {
  const { login, isLoading, error } = useAuth();
  const { user } = useAuth();
  
  if (user) {
    return <Navigate to="/dashboard" />;
  }
  
  return <LoginPage onLogin={login} isLoading={isLoading} error={error} />;
};

const RegisterWrapper = () => {
  const { register, isLoading, error } = useAuth();
  const { user } = useAuth();
  
  if (user) {
    return <Navigate to="/dashboard" />;
  }
  
  return <SignupPage onRegister={register} isLoading={isLoading} error={error} />;
};

export default App;