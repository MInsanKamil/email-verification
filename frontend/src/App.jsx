import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Verify from './components/Verify';
import ResendVerification from './components/ResendVerification';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify/:token" element={<Verify />} />
        <Route path="/verify-email" element={<ResendVerification />} />
      </Routes>
    </Router>
  );
};

export default App;
