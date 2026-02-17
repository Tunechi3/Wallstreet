import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';

/**
 * AdminProtectedRoute
 *
 * Wraps any admin-only page.
 * - Redirects unauthenticated users → /admin/login
 * - Redirects non-admin users       → /dashboard/overview
 * - Renders children only for role: 'admin' | 'super_admin'
 */
const AdminProtectedRoute = ({ children }) => {
  const { user, isAuthenticated, loading } = useUser();
  const location = useLocation();

  if (loading) {
    return (
      <div style={loadingStyle}>
        <div style={spinnerStyle} />
        <p style={{ color: '#e8eaf0', fontFamily: 'DM Sans, sans-serif' }}>
          Checking permissions…
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (user?.role !== 'admin' && user?.role !== 'super_admin') {
    return <Navigate to="/dashboard/overview" replace />;
  }

  return children;
};

const loadingStyle = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#0d0f14',
  gap: '1rem',
};

const spinnerStyle = {
  width: '40px',
  height: '40px',
  border: '3px solid #2a2f3d',
  borderTopColor: '#D4AF37',
  borderRadius: '50%',
  animation: 'spin 0.8s linear infinite',
};

export default AdminProtectedRoute;