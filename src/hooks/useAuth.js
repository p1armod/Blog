import { useDispatch, useSelector } from 'react-redux';
import { 
    login as authLogin, 
    logout as authLogout, 
    setAuthStatus, 
    setError, 
    clearError,
    selectCurrentUser,
    selectIsAuthenticated,
    selectAuthStatus,
    selectAuthError
} from '../store/authSlice';
import authService from '../appwrite/auth';
import { useCallback } from 'react';

export function useAuth() {
    const dispatch = useDispatch();
    
    // Selectors
    const user = useSelector(selectCurrentUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const status = useSelector(selectAuthStatus);
    const error = useSelector(selectAuthError);
    const isLoading = status === 'loading';

    // Clear any existing errors
    const clearAuthError = useCallback(() => {
        dispatch(clearError());
    }, [dispatch]);

    // Get current user session
    const getCurrentUser = useCallback(async () => {
        try {
            dispatch(setAuthStatus('loading'));
            const userData = await authService.getCurrentUser();
            if (userData) {
                dispatch(authLogin(userData));
            }
            return userData;
        } catch (error) {
            dispatch(setError(error.message));
            return null;
        }
    }, [dispatch]);

    // Login with email and password
    const login = async ({ email, password }) => {
        try {
            dispatch(setAuthStatus('loading'));
            const session = await authService.login({ email, password });
            if (session) {
                // Get the user data after successful login
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData));
                    return { success: true };
                }
                return { success: false, error: 'Failed to fetch user data' };
            }
        } catch (error) {
            dispatch(setError(error.message));
            throw error;
        }
    };

    // Register a new user
    const register = async (userData) => {
        try {
            dispatch(setAuthStatus('loading'));
            const user = await authService.createAccount(userData);
            if (user) {
                // Auto-login after registration if email and password are provided
                if (userData.email && userData.password) {
                    return await login({
                        email: userData.email,
                        password: userData.password
                    });
                }
                return user;
            }
        } catch (error) {
            dispatch(setError(error.message));
            throw error;
        }
    };

    // Logout the current user
    const logout = async () => {
        try {
            dispatch(setAuthStatus('loading'));
            // Clear all auth-related data
            await authService.logout();
            // Reset the auth state
            dispatch(authLogout());
            // Reset any query caches if you're using React Query
            if (window.queryClient) {
                window.queryClient.clear();
            }
            return true;
        } catch (error) {
            console.error('Logout error:', error);
            dispatch(setError(error.message));
            // Even if there's an error, we want to clear the auth state
            dispatch(authLogout());
            return true;
        }
    };

    // Get user data by ID
    const getUserData = async (userId) => {
        try {
            dispatch(setAuthStatus('loading'));
            const userData = await authService.getUserData(userId);
            return userData;
        } catch (error) {
            dispatch(setError(error.message));
            throw error;
        } finally {
            dispatch(setAuthStatus('idle'));
        }
    };

    // Check if user is authenticated
    const checkAuth = async () => {
        try {
            const userData = await getCurrentUser();
            return !!userData;
        } catch (error) {
            return false;
        }
    };

    return {
        user,
        isAuthenticated,
        isLoading,
        error,
        status,
        login,
        logout,
        register,
        getCurrentUser,
        getUserData,
        checkAuth,
        clearAuthError
    };
}