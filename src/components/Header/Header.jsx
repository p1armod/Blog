import React, { useState, useEffect } from 'react';
import { Logo, LogoutBtn, Container } from "../index";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !isAuthenticated && !isLoading
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !isAuthenticated && !isLoading
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: isAuthenticated
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: isAuthenticated
    },
  ];

  const activeItems = navItems.filter(item => item.active);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <Container>
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-gray-800">
            <Logo width="50px" />
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-4">
            {activeItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.slug)}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600"
              >
                {item.name}
              </button>
            ))}
            {isAuthenticated && (
              <LogoutBtn className="ml-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-indigo-600 border border-gray-300 rounded-md hover:bg-gray-50" />
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-indigo-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <span className="block w-6 h-0.5 bg-current transform transition-transform rotate-45 translate-y-1.5"></span>
              ) : (
                <span className="block w-6 h-0.5 bg-current transform transition-transform mb-1.5"></span>
              )}
              <span className={`block w-6 h-0.5 bg-current mb-1.5 transition-opacity ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block w-6 h-0.5 bg-current transform transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden px-4 pb-4">
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              {activeItems.map((item) => (
                <button
                  key={`mobile-${item.name}`}
                  onClick={() => navigate(item.slug)}
                  className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  {item.name}
                </button>
              ))}
              {isAuthenticated && (
                <div className="pt-2 border-t border-gray-200 mt-2">
                  <LogoutBtn className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md" />
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
