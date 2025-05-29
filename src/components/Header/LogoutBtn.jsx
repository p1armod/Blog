import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function LogoutBtn({ className = '', ...props }) {
    const { logout, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            // Force a full page reload to ensure all state is cleared
            window.location.href = '/';
        } catch (error) {
            console.error('Logout failed:', error);
            // Even if logout fails, redirect to home
            window.location.href = '/';
        }
    };

    return (
        <button
            onClick={handleLogout}
            disabled={isLoading}
            className={`${className} inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed`}
            {...props}
        >
            {isLoading ? 'Signing out...' : 'Sign out'}
        </button>
    );
}