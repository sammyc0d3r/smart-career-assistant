import React from 'react';
import { useNavigate } from 'react-router-dom';
import FAQAccordion from '../components/FAQAccordion';

const FAQs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-4 py-16">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-700">Frequently Asked Questions</h1>
          <button 
            onClick={() => navigate('/')} 
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Go Back Home
          </button>
        </div>
        <FAQAccordion />
      </div>
    </div>
  );
};

export default FAQs;
