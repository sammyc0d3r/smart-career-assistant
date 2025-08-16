import React from 'react';
import { useNavigate } from 'react-router-dom';

const TermsAndConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-4 py-16">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-700">Terms &amp; Conditions</h1>
          <button 
            onClick={() => navigate('/')} 
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Go Back Home
          </button>
        </div>
        <h2 className="text-2xl font-semibold text-indigo-600 mb-2">User Responsibilities</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
          <li>All information you provide, including your CV and profile details, must be accurate and up to date.</li>
          <li>You agree not to misuse the platform or engage in any unlawful activities.</li>
        </ul>
        <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Content Ownership</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li>You retain ownership of the content you upload, including your CV and profile information.</li>
          <li>By uploading content, you grant Smart Career Assistant a license to process your data solely for providing personalized career services.</li>
        </ul>
        <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Data Usage</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li>Your data is used exclusively to deliver platform features such as career guidance, job suggestions, and course recommendations.</li>
          <li>We do not sell or share your data with third parties.</li>
          <li>Usage of the platform is subject to compliance with these terms and all applicable laws.</li>
        </ul>
        <p className="text-gray-500 text-sm">By using Smart Career Assistant, you agree to these Terms &amp; Conditions. Please contact support if you have any questions.</p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
