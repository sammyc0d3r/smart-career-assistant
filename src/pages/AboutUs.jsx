import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-4 py-16">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-700">About Us</h1>
          <button 
            onClick={() => navigate('/')} 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Go Back Home
          </button>
        </div>
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Our Mission</h2>
            <p className="text-gray-700">
              At Smart Career Assistant, we are dedicated to helping professionals navigate their career journey with confidence and success. 
              Our mission is to provide personalized career guidance, relevant job opportunities, and valuable learning resources to empower 
              individuals in achieving their professional aspirations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">Career Experts</h3>
                <p className="text-gray-600">Our team of experienced professionals brings years of industry knowledge to help guide your career path.</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">Technology Team</h3>
                <p className="text-gray-600">Innovative developers and designers working to create the best career management platform.</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">Support Staff</h3>
                <p className="text-gray-600">Dedicated support team ready to assist you with any questions or concerns.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Contact Us</h2>
            <div className="space-y-4">
              <p className="text-gray-700">Have questions or need assistance? Reach out to us:</p>
              <div className="flex flex-col space-y-2">
                <a 
                  href="mailto:support@smartcareerassistant.com" 
                  className="text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  support@smartcareerassistant.com
                </a>
                <p className="text-gray-600">We'll get back to you as soon as possible.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
