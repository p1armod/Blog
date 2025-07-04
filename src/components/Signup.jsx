import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Logo } from './index';
import { useForm } from 'react-hook-form';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';


export default function Signup() {
    const { register: signup, isAuthenticated, isLoading, error } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const onSubmit = async (data) => {
        const { success } = await signup(data);
        if (success) {
            navigate('/', { replace: true });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <div className="flex justify-center">
                        <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center transform transition-transform duration-300 hover:scale-105">
                            <Logo className="w-12 h-12 text-indigo-600" />
                        </div>
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link 
                            to="/login" 
                            className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>

                <div className="bg-white py-8 px-6 shadow-xl rounded-2xl sm:px-10">
                    {error && (
                        <div className="mb-6 p-4 text-sm text-red-700 bg-red-50 rounded-lg border border-red-100">
                            {error}
                        </div>
                    )}

                    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <div className="relative rounded-lg shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FiUser className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="name"
                                        type="text"
                                        autoComplete="name"
                                        className={`pl-12 py-3 text-base ${errors.name ? 'border-red-300' : 'border-gray-300'}`}
                                        {...register('name', {
                                            required: 'Name is required',
                                            minLength: {
                                                value: 3,
                                                message: 'Name must be at least 3 characters',
                                            },
                                        })}
                                    />
                                </div>
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email address
                                </label>
                                <div className="relative rounded-lg shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FiMail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        className={`pl-12 py-3 text-base ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Invalid email address',
                                            },
                                        })}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <div className="relative rounded-lg shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FiLock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="new-password"
                                        className={`pl-12 pr-12 py-3 text-base ${errors.password ? 'border-red-300' : 'border-gray-300'}`}
                                        {...register('password', {
                                            required: 'Password is required',
                                            minLength: {
                                                value: 8,
                                                message: 'Password must be at least 8 characters',
                                            },
                                        })}
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                        <button
                                            type="button"
                                            className="p-1 text-gray-400 hover:text-gray-500 focus:outline-none rounded-full hover:bg-gray-100"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <FiEyeOff className="h-5 w-5" />
                                            ) : (
                                                <FiEye className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                {errors.password ? (
                                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                                ) : (
                                    <p className="mt-1 text-xs text-gray-500">
                                        Must be at least 8 characters
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                className={`group w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                <span className="flex items-center">
                                    {isLoading ? 'Creating account...' : (
                                        <>
                                            Sign up
                                            <FiArrowRight className={`ml-2 h-4 w-4 transition-transform duration-200 ${isHovered ? 'translate-x-1' : ''}`} />
                                        </>
                                    )}
                                </span>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}