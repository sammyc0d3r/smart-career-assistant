import React from 'react';

const Features = ({ onUploadClick }) => {
  const features = [
    {
      title: 'Smart CV Analysis',
      description: 'Our advanced AI analyzes your CV to extract skills, experience, and potential career paths with high accuracy.',
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      title: 'Intelligent Job Matching',
      description: 'Get matched with relevant job opportunities based on your skills, experience level, and career preferences.',
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Personalized Learning Path',
      description: 'Access curated courses and certifications that align with your career goals and industry demands.',
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor your skill development, course completions, and career milestones in an interactive dashboard.',
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Real-time Updates',
      description: 'Stay informed with instant notifications about new job opportunities and course recommendations.',
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      )
    },
    {
      title: 'Market Insights',
      description: 'Get detailed insights about salary ranges, in-demand skills, and industry trends for informed decisions.',
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      )
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Features</span>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            Everything You Need to Succeed
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive suite of tools and features is designed to help you make informed career decisions
            and achieve your professional goals.
          </p>
        </div>
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="relative bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="text-indigo-600 mb-5">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button 
              onClick={onUploadClick}
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Try It Now
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

export default Features;
