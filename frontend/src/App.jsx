import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import Chat from './pages/chat';
import Login from './pages/login';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat/:businessId/:investorId" element={<Chat />} />
      </Routes>
    </Router>
  );
};

export default App;
