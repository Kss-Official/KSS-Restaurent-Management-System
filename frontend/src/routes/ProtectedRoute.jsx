import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROLES } from '../utils/constants';

export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, currentUser, role } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login with redirect path
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // If specific roles are required, verify access
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    // If a customer tries to access staff portals, or staff tries to access unauthorized sections
    alert(`Access Denied: Your current role (${role}) does not have permission to access this portal.`);
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
