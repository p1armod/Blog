import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    currentPost: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
};

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
            state.status = 'succeeded';
        },
        setCurrentPost: (state, action) => {
            state.currentPost = action.payload;
        },
        addPost: (state, action) => {
            state.posts.unshift(action.payload);
        },
        updatePostInState: (state, action) => {
            const index = state.posts.findIndex(post => post.$id === action.payload.$id);
            if (index !== -1) {
                state.posts[index] = action.payload;
            }
        },
        removePost: (state, action) => {
            state.posts = state.posts.filter(post => post.$id !== action.payload);
        },
        setLoading: (state) => {
            state.status = 'loading';
        },
        setError: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        resetPostState: () => initialState
    }
});

export default postSlice.reducer;

export const { 
    setPosts, 
    setCurrentPost, 
    addPost, 
    updatePostInState, 
    removePost, 
    setLoading, 
    setError, 
    resetPostState 
} = postSlice.actions;
