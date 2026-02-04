import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import CategoryPage from './pages/admin/CategoryPage';
import NewsPage from './pages/admin/NewsPage';
import UsersPage from './pages/admin/UsersPage';
import SettingsPage from './pages/admin/SettingsPage';
import ProfilePage from './pages/admin/ProfilePage';
import NewsHistoryPage from './pages/admin/NewsHistoryPage';
import { useAuth } from './hooks';

// Simple Role Protection Component
// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  // Check role: user.accountRole (from API) or user.role (mock/fallback)
  const userRole = user.accountRole || user.role;

  if (userRole !== requiredRole) {
    // Redirect to dashboard if role doesn't match
    return <Navigate to="/admin" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<MainLayout />}>
            <Route index element={<DashboardPage />} />

            {/* Admin Only Route */}
            <Route path="users" element={<ProtectedRoute requiredRole={1}><UsersPage /></ProtectedRoute>} />

            {/* Staff Only Routes */}
            <Route path="categories" element={<ProtectedRoute requiredRole={2}><CategoryPage /></ProtectedRoute>} />
            <Route path="news" element={<ProtectedRoute requiredRole={2}><NewsPage /></ProtectedRoute>} />
            <Route path="history" element={<ProtectedRoute requiredRole={2}><NewsHistoryPage /></ProtectedRoute>} />
            <Route path="profile" element={<ProtectedRoute requiredRole={2}><ProfilePage /></ProtectedRoute>} />

            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Redirect root to admin */}
          <Route path="/" element={<Navigate to="/admin" replace />} />

          {/* 404 - Redirect to admin */}
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
