import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AuthProvider } from './context/AuthProvider';

// Import your page components
import App from './App.jsx';
import { Home, AllPosts, AddPost, Post, EditPost } from './pages/index';
import { AuthLayout, Login, Signup } from './components/index';

// Import standard pages
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Faq from './pages/Faq';

// Create a wrapper component that uses useNavigate
const AppWithAuth = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<AppWithAuth />}>
            <Route index element={<Home />} />
            <Route 
              path="login" 
              element={
                <AuthLayout authentication={false}>
                  <Login />
                </AuthLayout>
              } 
            />
            <Route 
              path="signup" 
              element={
                <AuthLayout authentication={false}>
                  <Signup />
                </AuthLayout>
              } 
            />
            <Route 
              path="all-posts" 
              element={
                <AuthLayout authentication={true}>
                  <AllPosts />
                </AuthLayout>
              } 
            />
            <Route 
              path="add-post" 
              element={
                <AuthLayout authentication={true}>
                  <AddPost />
                </AuthLayout>
              } 
            />
            <Route path="post/:slug" element={<Post />} />
            <Route 
              path="edit-post/:slug" 
              element={
                <AuthLayout authentication={true}>
                  <EditPost />
                </AuthLayout>
              } 
            />
            
            {/* Standard Pages */}
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="faq" element={<Faq />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </StrictMode>
);
