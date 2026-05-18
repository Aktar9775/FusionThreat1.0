import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import AdminLogin from './pages/Auth/AdminLogin';
import Registration from './pages/Auth/Registration';
import Dashboard from './pages/User/Dashboard';
import './App.css';

/**
 * +------------------------------------------------------------------------------+
 * �                                                                              �
 * �               FUSIONTHREAT - ENTERPRISE-LEVEL ROUTING SETUP                 �
 * �                                                                              �
 * �  Industry-standard routing pattern with:                                    �
 * �  ? Protected routes for authenticated users                                 �
 * �  ? OAuth & email/password authentication                                    �
 * �  ? Session persistence                                                      �
 * �  ? Proper error handling and redirects                                      �
 * �                                                                              �
 * +------------------------------------------------------------------------------+
 */

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/register" element={<Registration />} />
          
          {/* PROTECTED ROUTES */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
