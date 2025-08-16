import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const DashboardHeader = ({ user }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.username || user.email}!</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your career progress and recommendations</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
