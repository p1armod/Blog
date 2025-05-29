import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-gray-300 pt-12 pb-8 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Logo width="120px" className="text-white" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Sharing knowledge and insights through thoughtful articles and stories. 
              Join our community of readers and writers.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/all-posts"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  All Posts
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Blog. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link 
                to="/privacy" 
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;