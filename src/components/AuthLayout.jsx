import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { selectIsAuthenticated, selectAuthStatus } from '../store/authSlice';

export default function AuthLayout({ children, authentication = true }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const authStatus = useSelector(selectAuthStatus);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If we're still loading auth state, do nothing
    if (authStatus === 'loading') return;

    // If authentication is required but user is not authenticated, redirect to login
    if (authentication && !isAuthenticated) {
      navigate('/login', { 
        state: { from: location },
        replace: true 
      });
    } 
    // If authentication is not required but user is authenticated, redirect to home
    else if (!authentication && isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, authentication, navigate, authStatus, location]);

  // Show loading state only when we're checking auth status
  if (authStatus === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  // If we're on an auth page and not authenticated, or on a protected page and authenticated
  if ((!authentication && !isAuthenticated) || (authentication && isAuthenticated)) {
    return <>{children}</>;
  }

  // If none of the above, show nothing (will be redirected by the useEffect)
  return null;
}