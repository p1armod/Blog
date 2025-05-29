import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    userData: null,
    isAuthenticated: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = 'succeeded';
            state.error = null;
            state.userData = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.status = 'idle';
            state.error = null;
            state.userData = null;
            state.isAuthenticated = false;
        },
        setAuthStatus: (state, action) => {
            state.status = action.payload;
            if (action.payload === 'loading') {
                state.error = null;
            }
        },
        setError: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        }
    }
});

export const { login, logout, setAuthStatus, setError, clearError } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.userData;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
