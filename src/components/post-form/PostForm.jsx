import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RTE } from '../index';
import { Input, Select, Button } from '../index';
import appwriteService from '../../appwrite/config';
import { usePosts } from '../../hooks/usePosts';

export default function PostForm({ post }) {
    const navigate = useNavigate();
    const { createPost, updatePost, status } = usePosts();
    const userData = useSelector((state) => state.auth.userData);
    
    const { 
        register, 
        handleSubmit, 
        watch, 
        setValue, 
        control, 
        getValues, 
        formState: { errors } 
    } = useForm({
        defaultValues: {
            title: post?.title || '',
            content: post?.content || '',
            slug: post?.slug || '',
            status: post?.status || 'active',
        }  
    });
    
    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-');
        }
        return '';
    }, []);

    // Handle slug generation when title changes
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, setValue, slugTransform]);

    const onSubmit = async (data) => {
        let fileId = post?.['featured-image'] || null;
        
        try {
            // Handle file upload if an image is provided
            if (data.image && data.image[0]) {
                const file = await appwriteService.uploadFile(data.image[0]);
                if (file) {
                    // Delete old image if exists
                    if (post?.['featured-image']) {
                        await appwriteService.deleteFile(post['featured-image']);
                    }
                    fileId = file.$id;
                }
            }
        
            // Prepare post data with consistent field names
            const postData = {
                title: data.title,
                slug: data.slug,
                content: data.content,
                status: data.status || 'active',
                'user-id': userData.$id,
                'featured-image': fileId
            };
        
            if (post) {
                // Update existing post
                const updatedPost = await updatePost(post.$id, postData);
                navigate(`/post/${updatedPost.slug}`);
            } else {
                // Create new post
                const newPost = await createPost(postData);
                navigate(`/post/${newPost.slug}`);
            }
        } catch (error) {
            console.error('Error saving post:', error);
            // You might want to show an error message to the user here
        }
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    error={errors.title?.message}
                    {...register("title", { 
                        required: 'Title is required',
                        minLength: {
                            value: 3,
                            message: 'Title must be at least 3 characters long'
                        }
                    })}
                />
                
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    error={errors.slug?.message}
                    {...register("slug", { 
                        required: 'Slug is required',
                        pattern: {
                            value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                            message: 'Slug can only contain lowercase letters, numbers, and hyphens'
                        }
                    })}
                />
                
                <div className="mb-4">
                    <RTE 
                        label="Content :" 
                        name="content" 
                        control={control} 
                        defaultValue={getValues("content")} 
                        rules={{ required: 'Content is required' }}
                    />
                    {errors.content && (
                        <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
                    )}
                </div>
            </div>
            
            <div className="w-1/3 px-2">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Featured Image {!post && <span className="text-red-500">*</span>}
                    </label>
                    <input
                        type="file"
                        className="block w-full text-sm text-gray-500
                                  file:mr-4 file:py-2 file:px-4
                                  file:rounded-md file:border-0
                                  file:text-sm file:font-semibold
                                  file:bg-blue-50 file:text-blue-700
                                  hover:file:bg-blue-100"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { 
                            required: !post ? 'Featured image is required' : false 
                        })}
                    />
                    {errors.image && (
                        <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
                    )}
                    
                    {post && post['featured-image'] && (
                        <div className="mt-2">
                            <img
                                src={appwriteService.getFilePreview(post['featured-image'])}
                                alt={post.title}
                                className="w-full h-auto rounded-lg border border-gray-200"
                            />
                            <p className="mt-1 text-xs text-gray-500">Current featured image</p>
                        </div>
                    )}
                </div>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        {...register("status", { required: true })}
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                
                <Button 
                    type="submit" 
                    bgColor={post ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"} 
                    className="w-full py-2 px-4 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    disabled={status === 'loading'}
                >
                    {status === 'loading' ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {post ? 'Updating...' : 'Creating...'}
                        </span>
                    ) : post ? 'Update Post' : 'Create Post'}
                </Button>
            </div>
        </form>
    );
}
