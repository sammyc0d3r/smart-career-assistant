import React, { useEffect, useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import Sidebar from '../components/dashboard/Sidebar';
import CareerProgress from '../components/dashboard/CareerProgress';
import RecommendedCourses from '../components/dashboard/RecommendedCourses';
import JobSuggestions from '../components/dashboard/JobSuggestions';
import InterviewQuestions from '../components/dashboard/InterviewQuestions';
import Settings from '../components/dashboard/Settings';
import Profile from '../components/dashboard/Profile';
import BookRecommendations from '../components/dashboard/BookRecommendations';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, fetchProfile, isAuthenticated } = useAuth();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('dashboard_theme');
    if (savedTheme) {
      const theme = JSON.parse(savedTheme);
      const root = document.documentElement;
      root.style.setProperty('--primary-color', theme.primary);
      root.style.setProperty('--secondary-color', theme.secondary);
      root.style.setProperty('--background-color', theme.background);
      root.style.setProperty('--text-color', theme.text);
      root.style.setProperty('--card-color', theme.card);
    }
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[var(--background-color)] flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      <div className="flex-1 ml-0 md:ml-64">
        <DashboardHeader user={user} onMenuClick={() => setSidebarOpen(true)} />
        <main className="px-4 pb-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-2">
                  <CareerProgress />
                </div>
                <div>
                  <RecommendedCourses />
                </div>
                <div>
                  <JobSuggestions />
                </div>
                <div>
                  <BookRecommendations />
                </div>
                <div className="lg:col-span-2">
                  <InterviewQuestions />
                </div>
                <div className="lg:col-span-2 mt-6">
                  <Profile />
                </div>
              </div>
            } />
            <Route path="/career" element={<CareerProgress />} />
            <Route path="/courses" element={<RecommendedCourses />} />
            <Route path="/jobs" element={<JobSuggestions />} />
            <Route path="/interview-questions" element={<InterviewQuestions />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/books" element={<BookRecommendations />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
