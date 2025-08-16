import React from 'react';

const Hero = ({ onUploadClick }) => {
  return (
    <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 text-white py-24 px-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="inline-block mb-6 px-3 py-1 rounded-full bg-indigo-500 bg-opacity-30 backdrop-blur-sm">
          <span className="text-sm font-medium">✨ AI-Powered Career Guidance</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Transform Your Career Journey<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">
            With Smart AI Assistant
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto mb-10 leading-relaxed">
          Upload your CV and let our AI analyze your skills, suggest career paths,
          and guide you towards your dream job with personalized recommendations.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={onUploadClick}
            className="bg-white text-indigo-600 font-semibold py-4 px-8 rounded-full shadow-lg hover:bg-indigo-50 transition-all transform hover:scale-105 inline-flex items-center"
          >
            <span>Upload Your CV</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button 
            onClick={onUploadClick}
            className="text-white border-2 border-white border-opacity-50 font-semibold py-4 px-8 rounded-full hover:bg-white hover:text-indigo-600 transition-all transform hover:scale-105"
          >
            Get Started Now
          </button>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
          <div>
            <div className="text-3xl font-bold mb-2">1M+</div>
            <div className="text-indigo-200">CVs Analyzed</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">95%</div>
            <div className="text-indigo-200">Accuracy Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">50K+</div>
            <div className="text-indigo-200">Career Paths</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">24/7</div>
            <div className="text-indigo-200">AI Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;