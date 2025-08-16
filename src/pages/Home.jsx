import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import UploadSection from '../components/UploadSection';
import Footer from '../components/Footer';

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition duration-300">
    <div className="text-indigo-600 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Home = () => {
  const fileInputRef = React.useRef(null);
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero onUploadClick={handleUploadClick} />
      <Features onUploadClick={handleUploadClick} />
      <UploadSection fileInputRef={fileInputRef} />
      <HowItWorks onUploadClick={handleUploadClick} />
      <Footer />
    </div>
  );
};

export default Home;