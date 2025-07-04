import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    userData: null,
    isAuthenticated: false,
    lastChecked: 0
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Set loading state
        setLoading: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        
        // Successful login
        loginSuccess: (state, action) => {
            state.status = 'succeeded';
            state.error = null;
            state.userData = action.payload;
            state.isAuthenticated = true;
            state.lastChecked = Date.now();
        },
        
        // Login failed
        loginFailed: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
            state.userData = null;
            state.isAuthenticated = false;
        },
        
        // Successful registration
        registerSuccess: (state, action) => {
            state.status = 'succeeded';
            state.error = null;
            state.userData = action.payload;
            state.isAuthenticated = true;
            state.lastChecked = Date.now();
        },
        
        // Registration failed
        registerFailed: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        
        // Logout
        logout: (state) => {
            state.status = 'idle';
            state.error = null;
            state.userData = null;
            state.isAuthenticated = false;
            state.lastChecked = 0;
        },
        
        // Set authentication status
        setAuthStatus: (state, action) => {
            state.status = action.payload;
            if (action.payload === 'loading') {
                state.error = null;
            }
        },
        
        // Set error
        setError: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        
        // Clear error
        clearError: (state) => {
            state.error = null;
            state.status = 'idle';
        },
        
        // Set last checked timestamp
        setLastChecked: (state) => {
            state.lastChecked = Date.now();
        }
    }
});

// Export actions
export const { 
    setLoading,
    loginSuccess, 
    loginFailed,
    registerSuccess,
    registerFailed,
    logout, 
    setAuthStatus, 
    setError, 
    clearError,
    setLastChecked
} = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.userData;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
