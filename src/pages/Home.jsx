import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, PostCard, Button } from '../components';
import { usePosts } from '../hooks/usePosts';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated, selectCurrentUser } from '../store/authSlice';
import { setPosts } from '../store/postSlice';

function Home() {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const { 
        posts = [], 
        status: postsStatus, 
        error, 
        fetchPosts 
    } = usePosts();

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!isAuthenticated && postsStatus !== 'loading') {
            navigate('/login', { replace: true });
        }
    }, [isAuthenticated, postsStatus, navigate]);

    // Fetch posts when component mounts or when currentUser changes
    useEffect(() => {
        let isMounted = true;
        
        const loadPosts = async () => {
            if (!currentUser?.$id) {
                return;
            }

            try {
                await fetchPosts('active', currentUser.$id);
            } catch (error) {
                console.error('Error loading posts:', error);
                // Handle error silently or show user-friendly message
            }
        };

        // Always load posts when user changes or component mounts
        if (currentUser?.$id) {
            loadPosts();
        }

        // Cleanup function to prevent state updates after unmount
        return () => {
            isMounted = false;
        };
    }, [currentUser?.$id]);
    
    // Reset posts when user logs out
    useEffect(() => {
        if (!isAuthenticated) {
            dispatch(setPosts([]));
        }
    }, [isAuthenticated, dispatch]);

    // Show login prompt if not authenticated
    if (!isAuthenticated) {
        return (
            <div className="w-full py-16 bg-gray-50 flex items-center justify-center min-h-[60vh]">
                <Container>
                    <div className="max-w-md mx-auto text-center p-8 bg-white rounded-lg shadow">
                        <h2 className="text-2xl font-bold mb-4">Please Login</h2>
                        <p className="mb-6 text-gray-600">You need to be logged in to view this content.</p>
                        <Button
                            onClick={() => navigate('/login')}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        >
                            Go to Login
                        </Button>
                    </div>
                </Container>
            </div>
        );
    }

    // Show loading state
    if (postsStatus === 'loading') {
        return (
            <div className="w-full py-8">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-gray-200 rounded-xl h-64"></div>
                        ))}
                    </div>
                </Container>
            </div>
        );
    }

    // Show empty state if no posts
    if (postsStatus !== 'loading' && (!posts || posts.length === 0)) {
        return (
            <div className="w-full py-16">
                <Container>
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">No posts yet</h2>
                        <p className="text-gray-600 mb-6">You haven't created any posts yet. Create your first post now!</p>
                        <Link
                            to="/add-post"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Create Your First Post
                        </Link>
                    </div>
                </Container>
            </div>
        );
    }

    // Show error state if there's an error
    if (error) {
        return (
            <div className="w-full py-16 bg-gray-50 flex items-center justify-center min-h-[60vh]">
                <Container>
                    <div className="max-w-2xl mx-auto text-center p-8 bg-white rounded-lg shadow-sm border border-red-100">
                        <div className="text-red-500 mb-4">
                            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                            {error.title || 'Error Loading Posts'}
                        </h2>
                        <p className="text-gray-600 mb-6">
                            {error.message || 'There was an error loading the posts. Please try again later.'}
                        </p>
                        <button
                            onClick={() => fetchPosts('active')}
                            className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Retrying...' : 'Retry'}
                        </button>
                    </div>
                </Container>
            </div>
        );
    }

    // Filter posts by current user and ensure it's always an array
    const displayPosts = Array.isArray(posts) 
        ? posts.filter(post => post['user-id'] === currentUser?.$id)
        : [];
    const hasPosts = displayPosts.length > 0;

    return (
        <div className="w-full py-12 bg-gray-50 min-h-[60vh]">
            <Container>
                <div className="mb-12 text-center max-w-3xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                        {hasPosts ? 'Latest Blog Posts' : 'Welcome to Our Blog'}
                    </h1>
                    <p className="text-gray-600 text-lg">
                        {hasPosts 
                            ? 'Discover the latest articles, tutorials, and insights on web development, design, and more.'
                            : 'Get started by creating your first post.'}
                    </p>
                </div>
                
                {!hasPosts ? (
                    <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-100">
                        <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="mt-4 text-xl font-medium text-gray-900">
                            {status === 'loading' ? 'Loading posts...' : 'No posts found'}
                        </h3>
                        <p className="mt-2 text-gray-500 max-w-md mx-auto">
                            {status === 'loading' 
                                ? 'Fetching the latest posts...' 
                                : 'It looks like there are no published posts yet. Check back soon for updates!'}
                        </p>
                        {status !== 'loading' && (
                            <div className="mt-6">
                                <Link
                                    to="/add-post"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Create Your First Post
                                </Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {displayPosts.map((post) => (
                                <Link
                                    key={post.$id || post.id}
                                    to={`/post/${post.slug}`}
                                    className="block h-full transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:rounded-lg"
                                    aria-label={`Read more about ${post.title}`}
                                >
                                    <PostCard {...post} />
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Home;