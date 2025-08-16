import React, { useState } from 'react';

const faqs = [
  {
    question: 'How accurate is the recommendation?',
    answer: 'Our AI-driven recommendations are based on your profile, uploaded CV, and industry best practices. While highly accurate, we recommend reviewing each suggestion to ensure it aligns with your personal goals.'
  },
  {
    question: 'Do I need an account?',
    answer: 'Yes, you need to create an account to access personalized features such as saving your progress, receiving tailored job suggestions, and using CV analysis.'
  },
  {
    question: 'Can I upload multiple CVs?',
    answer: 'Currently, you can upload one CV at a time for analysis. You can re-upload and analyze as many CVs as you like, but only your latest upload is stored.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes. We use secure authentication, encrypted storage, and never share your data with third parties. Your privacy is our top priority.'
  },
  {
    question: 'What technologies power Smart Career Assistant?',
    answer: 'Our platform is built with React 19, Vite, React Router DOM 7, and Tailwind CSS 3. The backend uses secure APIs and modern best practices.'
  },
  {
    question: 'How do I get job suggestions?',
    answer: 'After logging in and uploading your CV, you will receive AI-powered job suggestions tailored to your career field and experience.'
  },
  {
    question: 'Can I use the platform on mobile devices?',
    answer: 'Yes! The Smart Career Assistant is fully responsive and works seamlessly on desktops, tablets, and mobile phones.'
  },
  {
    question: 'How are recommended courses selected?',
    answer: 'Courses are recommended based on your selected career field, skills from your CV, and trending industry requirements.'
  },
  {
    question: 'Is there a cost to use Smart Career Assistant?',
    answer: 'The core features are free. Some advanced features may require a premium subscription in the future.'
  },
  {
    question: 'Who can I contact for support?',
    answer: 'You can reach out via our support email or contact form, available in the Settings section of your dashboard.'
  },
  {
    question: 'Can I reset my password?',
    answer: 'Yes. Use the “Forgot Password” link on the login page to reset your password securely.'
  }
];

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div>
      {faqs.map((faq, idx) => (
        <div key={idx} className="mb-4 border-b">
          <button
            className="w-full flex justify-between items-center py-4 text-left focus:outline-none focus:text-indigo-700 text-lg font-medium text-gray-800 hover:text-indigo-700 transition"
            aria-expanded={openIndex === idx}
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          >
            <span>{faq.question}</span>
            <svg
              className={`w-5 h-5 ml-2 transform transition-transform duration-200 ${openIndex === idx ? 'rotate-180 text-indigo-700' : 'text-gray-400'}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openIndex === idx && (
            <div className="pb-4 text-gray-600 animate-fade-in">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
