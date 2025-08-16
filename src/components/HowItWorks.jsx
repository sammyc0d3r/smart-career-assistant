import React from 'react';

const HowItWorks = ({ onUploadClick }) => {
  const steps = [
    {
      number: '01',
      title: 'Upload Your CV',
      description: 'Simply upload your CV or resume in any format. Our advanced AI will instantly analyze your skills, experience, and potential.',
      color: 'from-purple-400 to-indigo-500',
      icon: (
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      )
    },
    {
      number: '02',
      title: 'Explore Opportunities',
      description: 'Get instant insights about your ideal career paths, along with personalized job matches and skill recommendations.',
      color: 'from-blue-400 to-cyan-500',
      icon: (
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      number: '03',
      title: 'Track Progress',
      description: 'Follow your personalized learning path, track your progress, and get real-time updates about new opportunities.',
      color: 'from-green-400 to-emerald-500',
      icon: (
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">How It Works</span>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            Start Your Career Journey Today
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Our simple three-step process makes it easy to discover and pursue your ideal career path
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 via-blue-500 to-green-400 transform -translate-y-1/2" />

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="relative z-10">
                  <div 
                    className={`bg-gradient-to-br ${step.color} rounded-2xl p-8 shadow-xl transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl h-full flex flex-col items-center text-center`}
                  >
                    <div className="mb-6">{step.icon}</div>
                    <span className="text-4xl font-bold text-white mb-4">
                      {step.number}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-white text-opacity-90 text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 w-16 transform translate-x-8 -translate-y-1/2">
                    <svg
                      className="text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                )}
                {/* Connection Line for Mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden h-12 w-0.5 bg-gradient-to-b from-current to-transparent mx-auto my-4" 
                    style={{ background: `linear-gradient(to bottom, ${step.color.split(' ')[1]}, transparent)` }} 
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button 
              onClick={onUploadClick}
              className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get Started Now
              <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
