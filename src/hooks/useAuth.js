import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { 
    loginSuccess,
    loginFailed,
    registerSuccess,
    registerFailed,
    logout as logoutAction,
    setLoading,
    clearError,
    selectIsAuthenticated,
    selectAuthStatus,
    selectAuthError,
    selectCurrentUser
} from '../store/authSlice';
import authService from '../appwrite/auth';

export function useAuth() {
    const dispatch = useDispatch();
    
    // Select auth state from Redux
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const status = useSelector(selectAuthStatus);
    const error = useSelector(selectAuthError);
    const user = useSelector(selectCurrentUser);
    const isLoading = status === 'loading';

    // Login function
    const login = useCallback(async (credentials) => {
        dispatch(clearError());
        dispatch(setLoading());
        
        try {
            const userData = await authService.login(credentials);
            if (userData) {
                dispatch(loginSuccess(userData));
                return { success: true };
            } else {
                const error = 'Invalid email or password';
                dispatch(loginFailed(error));
                return { success: false, error };
            }
        } catch (error) {
            const errorMsg = error.message || 'Login failed. Please try again.';
            dispatch(loginFailed(errorMsg));
            return { success: false, error: errorMsg };
        }
    }, [dispatch]);

    // Register function
    const register = useCallback(async (userData) => {
        dispatch(clearError());
        dispatch(setLoading());
        
        try {
            const newUser = await authService.createAccount(userData);
            if (newUser) {
                dispatch(registerSuccess(newUser));
                return { success: true };
            } else {
                const error = 'Failed to create account';
                dispatch(registerFailed(error));
                return { success: false, error };
            }
        } catch (error) {
            const errorMsg = error.message || 'Registration failed. Please try again.';
            dispatch(registerFailed(errorMsg));
            return { success: false, error: errorMsg };
        }
    }, [dispatch]);

    // Logout function
    const logout = useCallback(async () => {
        try {
            await authService.logout();
        } finally {
            // Always dispatch logout to clear local state, even if server logout fails
            dispatch(logoutAction());
        }
    }, [dispatch]);

    return {
        isAuthenticated,
        isLoading,
        error,
        user,
        login,
        register,
        logout
    };
}
