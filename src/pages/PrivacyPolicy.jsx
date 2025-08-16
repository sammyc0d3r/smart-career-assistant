import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-4 py-16">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-700">Privacy Policy</h1>
          <button 
            onClick={() => navigate('/')} 
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Go Back Home
          </button>
        </div>
        <p className="text-lg text-gray-700 mb-6">
          At Smart Career Assistant, your privacy is our top priority. We are committed to protecting your personal information and ensuring your data is handled securely.
        </p>
        <h2 className="text-2xl font-semibold text-indigo-600 mb-2">How We Handle Your Data</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li>All CVs uploaded to our platform are processed securely using encrypted channels.</li>
          <li>Personal data, including your CV and profile information, is never shared with third parties.</li>
          <li>We use your information solely to provide personalized career guidance and improve your experience.</li>
          <li>Your data is stored securely and can be deleted at your request.</li>
        </ul>
        <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Your Rights</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li>You may request deletion of your account and all associated data at any time.</li>
          <li>We do not sell, rent, or otherwise disclose your personal information.</li>
        </ul>
        <p className="text-gray-500 text-sm">If you have any questions about our privacy practices, please contact us via the support section in your dashboard.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
