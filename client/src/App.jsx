import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import Dashboard from './components/Dashboard';

const App = () => {


  return (
    <Router>
      <Routes>
        <Route path="/login"     element={<Login />}     />
        <Route path="/register"  element={<Register />}  />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/"          element={<Login />}     />
      </Routes>
    </Router>
  );
};

export default App;