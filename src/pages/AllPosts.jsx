import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

export default function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const postsData = await appwriteService.getPosts([]);
                if (postsData) {
                    setPosts(postsData.documents);
                }
            } catch (err) {
                console.error("Error fetching posts:", err);
                setError("Failed to load posts. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="w-full py-16 bg-gray-50 min-h-screen">
                <Container>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full py-16 bg-gray-50 min-h-screen flex items-center justify-center">
                <Container>
                    <div className="text-center p-8 bg-white rounded-lg shadow-sm border border-red-100">
                        <div className="text-red-500 mb-4">
                            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-medium text-gray-900 mb-2">Something went wrong</h2>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-12 bg-gray-50 min-h-screen">
            <Container>
                <div className="mb-8 text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">All Blog Posts</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover our latest articles, tutorials, and updates on web development, design, and more.
                    </p>
                </div>
                
                {posts.length === 0 ? (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No posts found</h3>
                        <p className="mt-1 text-gray-500">Check back later for new content!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {posts.map((post) => (
                            <Link
                                key={post.$id}
                                to={`/post/${post.slug}`}
                                className="block h-full transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:rounded-lg"
                            >
                                <PostCard 
                                    title={post.title}
                                    content={post.content}
                                    status={post.status}
                                    featured-image={post['featured-image']}
                                    className="h-full"
                                />
                            </Link>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}