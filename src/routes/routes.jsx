import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Signup, AllPosts, AddPost, Post, EditPost } from "../pages";
import { About, Contact, Privacy, Terms, Faq } from "../pages";
import App from "../App";
import AuthLayout from "../components/AuthLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "login",
                element: <AuthLayout authentication={false}><Login /></AuthLayout>
            },
            {
                path: "signup",
                element: <AuthLayout authentication={false}><Signup /></AuthLayout>
            },
            {
                path: "all-posts",
                element: <AuthLayout authentication={true}><AllPosts /></AuthLayout>
            },
            {
                path: "add-post",
                element: <AuthLayout authentication={true}><AddPost /></AuthLayout>
            },
            {
                path: "edit-post/:slug",
                element: <AuthLayout authentication={true}><EditPost /></AuthLayout>
            },
            {
                path: "post/:slug",
                element: <AuthLayout authentication={true}><Post /></AuthLayout>
            },
            {
                path: "about",
                element: <AuthLayout authentication={false}><About /></AuthLayout>
            },
            {
                path: "contact",
                element: <AuthLayout authentication={false}><Contact /></AuthLayout>
            },
            {
                path: "privacy",
                element: <AuthLayout authentication={false}><Privacy /></AuthLayout>
            },
            {
                path: "terms",
                element: <AuthLayout authentication={false}><Terms /></AuthLayout>
            },
            {
                path: "faq",
                element: <AuthLayout authentication={false}><Faq /></AuthLayout>
            }
        ]
    }
])
        
export default router;