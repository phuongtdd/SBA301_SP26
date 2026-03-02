import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import Login from './pages/authen/Login';
import Register from './pages/authen/Register';
import Rooms from './pages/room/Rooms';
import Profile from './pages/profile/Profile';
import MyBookings from './pages/booking/MyBookings';
import StaffRooms from './pages/staff/StaffRooms';
import StaffCustomers from './pages/staff/StaffCustomers';
import StaffBookings from './pages/staff/StaffBookings';

// Placeholder for protected routes later
const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Customer Routes */}
              <Route path="/profile" element={
                <ProtectedRoute role="CUSTOMER">
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/my-bookings" element={
                <ProtectedRoute role="CUSTOMER">
                  <MyBookings />
                </ProtectedRoute>
              } />

              {/* Staff Routes */}
              <Route path="/staff/rooms" element={
                <ProtectedRoute role="STAFF">
                  <StaffRooms />
                </ProtectedRoute>
              } />
              <Route path="/staff/customers" element={
                <ProtectedRoute role="STAFF">
                  <StaffCustomers />
                </ProtectedRoute>
              } />
              <Route path="/staff/bookings" element={
                <ProtectedRoute role="STAFF">
                  <StaffBookings />
                </ProtectedRoute>
              } />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
