import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function LogoutBtn({ className = '', ...props }) {
    const { logout } = useAuth();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        if (isLoggingOut) return;
        
        setIsLoggingOut(true);
        try {
            await logout();
            // Force a full page reload to ensure all state is cleared
            window.location.href = '/';
        } catch (error) {
            // Even if logout fails, redirect to home
            window.location.href = '/';
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`${className} inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed`}
            {...props}
        >
            {isLoggingOut ? 'Signing out...' : 'Sign out'}
        </button>
    );
}