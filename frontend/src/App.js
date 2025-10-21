// ============================================
// FILE: src/App.js - VERIFIED VERSION
// ============================================
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import VhsDetail from './pages/VhsDetail';
import MyRentals from './pages/MyRentals';
import MyReviews from './pages/MyReviews';
import Admin from './pages/Admin';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/vhs/:id" element={<VhsDetail />} />
            <Route 
              path="/my-rentals" 
              element={
                <ProtectedRoute>
                  <MyRentals />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/my-reviews" 
              element={
                <ProtectedRoute>
                  <MyReviews />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <Admin />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;