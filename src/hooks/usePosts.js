import { useDispatch, useSelector } from 'react-redux';
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

    // Fetch all posts
    const fetchPosts = async (status = null) => {
        try {
            dispatch(setLoading());
            const queries = [];
            if (status) {
                queries.push(Query.equal("status", status));
            }
            const postsData = await appwriteService.getPosts(queries);
            dispatch(setPosts(postsData.documents));
            return postsData.documents;
        } catch (error) {
            dispatch(setError(error.message));
            throw error;
        }
    };

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
