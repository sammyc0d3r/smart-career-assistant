import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/AuthContext';

// Utility functions for localStorage
const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing ${key} to localStorage:`, error);
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
  }
};

const InterviewQuestions = () => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState(() => {
    if (user?.field) {
      const cached = storage.get(`interview_questions_${user.field}`);
      return Array.isArray(cached) ? cached : [];
    }
    return [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchQuestions = async () => {
      if (!user?.field) {
        if (isMounted) {
          setError('Please select your career field to view interview questions');
          setLoading(false);
        }
        return;
      }
      
      // Check if we already have data
      const cached = storage.get(`interview_questions_${user.field}`);
      if (cached && Array.isArray(cached)) {
        if (isMounted) {
          setQuestions(cached);
          setLoading(false);
        }
        return;
      }
      
      setLoading(true);
      try {
        console.log('Fetching questions for field:', user.field);
        const response = await fetch(`https://api.smartcareerassistant.online/api/interview-questions?skill=${encodeURIComponent(user.field)}`, {
          headers: {
            'accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch interview questions: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (!data || !data.questions) {
          throw new Error('Invalid response format from API');
        }

        let parsedQuestions;
        try {
          // Clean up the HTML-encoded JSON
          const cleanedQuestions = data.questions
            .replace(/<p><code>json\n/g, '') // Remove opening HTML tags
            .replace(/<\/code><\/p>/g, '') // Remove closing HTML tags
            .replace(/&quot;/g, '"') // Replace HTML quotes with actual quotes
            .replace(/&lt;/g, '<') // Replace HTML lt with <
            .replace(/&gt;/g, '>') // Replace HTML gt with >
            .replace(/&amp;/g, '&') // Replace HTML amp with &
            .trim(); // Remove any extra whitespace

          parsedQuestions = JSON.parse(cleanedQuestions);
        } catch (error) {
          console.error('Error parsing interview questions:', error);
          parsedQuestions = [];
        }
        
        if (Array.isArray(parsedQuestions)) {
          storage.set(`interview_questions_${user.field}`, parsedQuestions);
          if (isMounted) {
            setQuestions(parsedQuestions);
          }
        } else {
          throw new Error('Parsed questions is not an array');
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
        console.error('API Error:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchQuestions();

    return () => {
      isMounted = false;
    };
  }, [user?.field]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Interview Questions</h2>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Interview Questions</h2>
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!user?.field) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Interview Questions</h2>
        <p className="text-gray-600">Please select your career field to view relevant interview questions.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Interview Questions</h2>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300
                         border border-transparent hover:border-blue-500
                         ring-1 ring-inset ring-blue-500/10
                         backdrop-blur-sm bg-white/90
                         relative overflow-hidden animate-pulse">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl blur-lg"></div>
              <div className="relative">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Interview Questions</h2>
        <div className="text-center text-red-600 p-4">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!user?.field) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Interview Questions</h2>
        <div className="text-center text-gray-500 p-4">
          <p>Please select your career field to view relevant interview questions.</p>
        </div>
      </div>
    );
  }

  if (Array.isArray(questions) && questions.length > 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Interview Questions for {user.field}</h2>
        <div className="space-y-6">
          {questions.map((q, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300
                         border border-transparent hover:border-blue-500
                         ring-1 ring-inset ring-blue-500/10
                         backdrop-blur-sm bg-white/90
                         relative overflow-hidden"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl blur-lg"></div>
              <div className="relative">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">{q.question}</h3>
                <p className="text-gray-700 leading-relaxed">{q.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Interview Questions for {user.field}</h2>
      <div className="text-center text-gray-500 p-4">
        <p>No questions available yet. Please try refreshing the page.</p>
      </div>
    </div>
  );
};

export default InterviewQuestions; 