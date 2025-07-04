import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { 
    setPosts, 
    setCurrentPost, 
    addPost, 
    updatePostInState, 
    removePost, 
    setLoading, 
    setError 
} from '../store/postSlice';
import appwriteService from '../appwrite/config';
import { Query } from 'appwrite';

export function usePosts() {
    const dispatch = useDispatch();
    const { posts, currentPost, status, error } = useSelector((state) => state.posts);

    // Fetch all posts with useCallback to prevent unnecessary re-renders
    const fetchPosts = useCallback(async (status = 'active', userId = null) => {
        try {
            const postsData = await appwriteService.getPosts();
            console.log(postsData)
            
            // Update the Redux store
            const action = await dispatch(setPosts(postsData.documents));
            return action.payload;
        } catch (error) {
            console.error('Error in fetchPosts:', {
                error,
                message: error.message,
                stack: error.stack
            });
            dispatch(setError(error.message));
            dispatch(setPosts([]));
            return [];
        }
    }, [dispatch]);

    // Fetch a single post by ID
    const fetchPostById = async (postId) => {
        try {
            dispatch(setLoading());
            const post = await appwriteService.getPost(postId);
            dispatch(setCurrentPost(post));
            return post;
        } catch (error) {
            dispatch(setError(error.message));
            throw error;
        }
    };

    // Create a new post
    const createPost = async (postData) => {
        try {
            dispatch(setLoading());
            const newPost = await appwriteService.createPost(postData);
            dispatch(addPost(newPost));
            return newPost;
        } catch (error) {
            dispatch(setError(error.message));
            throw error;
        }
    };

    // Update an existing post
    const updatePost = async (postId, postData) => {
        try {
            dispatch(setLoading());
            const updatedPost = await appwriteService.updatePost(postId, postData);
            dispatch(updatePostInState(updatedPost));
            return updatedPost;
        } catch (error) {
            dispatch(setError(error.message));
            throw error;
        }
    };

    // Delete a post
    const deletePost = async (postId) => {
        try {
            dispatch(setLoading());
            await appwriteService.deletePost(postId);
            dispatch(removePost(postId));
        } catch (error) {
            dispatch(setError(error.message));
            throw error;
        }
    };

    return {
        posts,
        currentPost,
        status,
        error,
        fetchPosts,
        fetchPostById,
        createPost,
        updatePost,
        deletePost,
    };
}
