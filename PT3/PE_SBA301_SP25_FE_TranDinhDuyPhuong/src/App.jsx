import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Home from './pages/home/Home';
import Login from './pages/authen/Login';
import Register from './pages/authen/Register';
import CarList from './pages/cars/CarList';
import CarForm from './pages/cars/CarForm';
import Navigation from './components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/" />; // Redirecting to '/' since we use Modal for Login
  if (adminOnly && !isAdmin) return <Navigate to="/" />;

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/cars" element={
              <ProtectedRoute>
                <CarList />
              </ProtectedRoute>
            } />

            <Route path="/cars/add" element={
              <ProtectedRoute adminOnly={true}>
                <CarForm />
              </ProtectedRoute>
            } />

            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
