import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = useCallback(() => {
    logout();
    navigate('/');
  }, [logout, navigate]);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text hover:from-indigo-500 hover:to-purple-500 transition-all">
          SmartCareerAI
        </Link>

        <nav className="flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors">Home</Link>
          {isAuthenticated && user ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Dashboard
              </Link>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{user.username || user.email}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all"
              >
                Login
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
