import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import parse from 'html-react-parser';

export default function PostCard({ title, content, status, 'featured-image': featuredImage, className = '' }) {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadImage = async () => {
            setLoading(true);
            setError(null);

            if (!featuredImage) {
                setLoading(false);
                return;
            }

            try {
                const fileUrl = appwriteService.getFilePreview(featuredImage);
                if (!fileUrl) {
                    throw new Error('Failed to generate file URL');
                }
                setImage(fileUrl);
            } catch (err) {
                console.error("Error getting file URL:", err);
                setError("Error loading image");
            } finally {
                setLoading(false);
            }
        };

        loadImage();
    }, [featuredImage]);

    if (loading) {
        return (
            <div className={`w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 animate-pulse ${className}`}>
                <div className="w-full aspect-video bg-gray-100 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-400"></div>
                </div>
                <div className="p-4">
                    <div className="h-6 bg-gray-100 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                </div>
            </div>
        );
    }

    return (
        <div className={`rounded-lg overflow-hidden border border-gray-100 hover:border-gray-200 h-full flex flex-col transition-all duration-200 bg-white hover:shadow-sm ${className}`}>
            {error ? (
                <div className="w-full aspect-video bg-gray-50 flex items-center justify-center">
                    <div className="text-center p-4">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="mt-2 text-sm text-gray-600">Image not available</p>
                        <p className="text-xs text-gray-400 mt-1">Click to view post</p>
                    </div>
                </div>
            ) : image ? (
                <div className="w-full aspect-video overflow-hidden bg-gray-50 relative">
                    <img 
                        src={image} 
                        alt={title || 'Post image'}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                        crossOrigin="anonymous"
                        onError={(e) => {
                            console.error("Image failed to load");
                            e.target.onerror = null;
                            setError("Failed to load image");
                        }}
                    />
                </div>
            ) : (
                <div className="w-full aspect-video bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                    <svg className="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
            )}
            <div className="p-4 flex-grow flex flex-col">
                <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">
                    {title}
                </h3>
                <div className="text-gray-600 text-sm flex-grow line-clamp-3 mb-3">
                    {parse(content)}
                </div>
                {status && (
                    <div className="mt-auto pt-3 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                {status}
                            </span>
                            <span className="text-xs text-gray-500">
                                Read more →
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
