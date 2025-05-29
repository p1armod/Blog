import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPost() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const fetchedPost = await appwriteService.getPostById(slug);
                if (fetchedPost) {
                    setPost(fetchedPost);
                } else {
                    navigate('/all-posts');
                }
            } catch (error) {
                console.error("Error fetching post:", error);
                navigate('/all-posts');
            }
            setLoading(false);
        };

        fetchPost();
    }, [slug, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!post) {
        return null; // or a loading state
    }

    return (
        <div className="py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    );
}