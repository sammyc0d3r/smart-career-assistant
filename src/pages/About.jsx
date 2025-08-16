import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-4 py-16">
      <div className="flex flex-col items-start w-full max-w-2xl gap-4">
        {/* Go Back Home Button */}
        <button
          className="flex items-center mb-4 px-4 py-2 bg-white border border-gray-300 rounded-full shadow hover:bg-gray-100 transition group"
          onClick={() => navigate('/')}
        >
          <svg className="w-5 h-5 mr-2 text-indigo-600 group-hover:text-indigo-800 transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium text-indigo-700 group-hover:text-indigo-900">Go Back Home</span>
        </button>
        <div className="w-full bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-indigo-700 mb-4">About Smart Career Assistant</h1>
          <p className="text-lg text-gray-700 mb-6">
            Smart Career Assistant is a modern web application designed to empower individuals in their career journeys. Our platform leverages AI-driven insights to provide personalized career guidance, recommended courses, job suggestions, and CV analysis.
          </p>
          <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            We aim to make career development accessible and effective for everyone. By combining cutting-edge technology with expert knowledge, we help users discover new opportunities, upskill, and achieve their professional goals.
          </p>
          <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            <li>Personalized recommendations based on your unique profile</li>
            <li>Modern, intuitive, and responsive design</li>
            <li>Secure and privacy-focused</li>
            <li>Continuous updates and improvements</li>
          </ul>
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Smart Career Assistant. All rights reserved.</p>
        </div>

      </div>
    </div>
  );
};

export default About;
