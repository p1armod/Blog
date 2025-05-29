import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { login, logout, selectIsAuthenticated } from '../store/authSlice';
import authService from '../appwrite/auth';

const AuthContext = createContext();

// Debounce function
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [initialized, setInitialized] = useState(false);
    const [error, setError] = useState(null);
    const [lastAuthCheck, setLastAuthCheck] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = useSelector(selectIsAuthenticated);

    // Secure error messages
    const getErrorMessage = (error) => {
        if (!error) return 'An error occurred. Please try again.';
        
        // Appwrite specific error codes
        if (error.code === 401 || error.code === 400) {
            return 'Invalid credentials. Please check your email and password.';
        } else if (error.code === 409) {
            return 'An account with this email already exists.';
        } else if (error.code === 429) {
            return 'Too many requests. Please try again later.';
        } else if (error.code >= 500) {
            return 'Server error. Please try again later.';
        } else if (error.message) {
            return error.message;
        }
        
        return 'An unexpected error occurred. Please try again.';
    };

    // Debounced auth check with cooldown
    const checkAuth = useCallback(debounce(async (force = false) => {
        const now = Date.now();
        // Skip if last check was less than 5 seconds ago and not forced
        if (!force && now - lastAuthCheck < 5000) {
            return;
        }

        setLastAuthCheck(now);
        setLoading(true);
        
        try {
            const userData = await authService.getCurrentUser();
            if (userData) {
                dispatch(login(userData));
            } else {
                dispatch(logout());
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            dispatch(logout());
        } finally {
            setLoading(false);
            if (!initialized) {
                setInitialized(true);
            }
        }
    }, 300), [dispatch, initialized, lastAuthCheck]);

    // Initialize auth check on mount and when dependencies change
    useEffect(() => {
        checkAuth();
        
        // Set up interval for periodic auth checks (every 5 minutes)
        const authCheckInterval = setInterval(() => {
            checkAuth(true); // Force check
        }, 5 * 60 * 1000);

        // Cleanup function
        return () => {
            clearInterval(authCheckInterval);
            checkAuth.cancel?.();
        };
    }, [checkAuth]);

    // Handle route changes and authentication state
    useEffect(() => {
        if (!initialized) return;
        
        const publicPaths = ['/login', '/signup', '/', '/about', '/faq'];
        const isPublicPath = publicPaths.some(path => 
            location.pathname === path || location.pathname.startsWith(`${path}/`)
        );
        
        if (!isAuthenticated && !isPublicPath) {
            navigate('/login', { 
                state: { 
                    from: location,
                    message: 'Please log in to access this page.'
                },
                replace: true 
            });
        } else if (isAuthenticated && (location.pathname === '/login' || location.pathname === '/signup')) {
            // Redirect to all-posts or previous location
            const from = location.state?.from?.pathname || '/all-posts';
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, location, navigate, initialized]);

    // Context value
    const value = {
        loading,
        isAuthenticated,
        error,
        setError: (error) => setError(getErrorMessage(error)),
        clearError: () => setError(null),
        getErrorMessage,
        checkAuth: (force = false) => checkAuth(force)
    };

    // Show loading state only during initial load
    if (!initialized) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse">Loading application...</div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};
