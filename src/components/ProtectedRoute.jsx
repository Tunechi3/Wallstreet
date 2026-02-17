import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';

/**
 * ProtectedRoute Component
 * 
 * Protects dashboard routes from unauthenticated access
 * Redirects to login if no valid token is found
 * Uses UserContext for centralized authentication state
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useUser();
  const location = useLocation();

  // Show loading spinner while checking authentication
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

  // If not authenticated, redirect to login
  // Save the attempted location so we can redirect back after login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the protected component
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

export default ProtectedRoute;