import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';

const RecommendedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      console.log('Fetching courses for user:', user);
      
      // If no user or field, show error
      if (!user) {
        console.log('No user found');
        setError('Please log in to view course recommendations');
        setLoading(false);
        return;
      }

      if (!user.field) {
        console.log('No field found');
        setError('Please set your career field in settings to view course recommendations');
        setLoading(false);
        return;
      }

      // Check if we have cached courses for this field
      const cachedCourses = sessionStorage.getItem(`courses_${user.field}`);
      if (cachedCourses) {
        console.log('Using cached courses');
        setCourses(JSON.parse(cachedCourses));
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching from API...');
        setLoading(true);
        setError(null);
        
        const response = await fetch('https://api.smartcareerassistant.online/courses/recommend', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            career_path: user.field,
            level_percent: parseInt(user.technical_skills_percentage) || 50
          })
        });

        console.log('API Response status:', response.status);

        if (!response.ok) {
          throw new Error(`Failed to fetch course recommendations: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('API Response data:', data);

        if (!data.recommended_courses || !Array.isArray(data.recommended_courses)) {
          throw new Error('Invalid response format from API');
        }

        setCourses(data.recommended_courses);
        
        // Cache the results
        sessionStorage.setItem(`courses_${user.field}`, JSON.stringify(data.recommended_courses));
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recommended Courses</h2>
        </div>
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recommended Courses</h2>
        </div>
        <div className="text-center text-red-600 p-4">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!courses.length) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recommended Courses</h2>
        </div>
        <div className="text-center text-gray-500 p-4">
          <p>No course recommendations available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recommended Courses</h2>
        <button className="text-sm text-indigo-600 hover:text-indigo-800">View All</button>
      </div>
      <div className="space-y-4">
        {courses.map((course, index) => (
          <a
            key={index}
            href={course.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-gray-200 rounded-lg p-4 hover:border-indigo-500 transition-colors cursor-pointer"
          >
            <h3 className="font-medium text-gray-900">{course.course_title}</h3>
            <div className="mt-2 flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
                </svg>
                {course.platform}
              </span>
              <span className="text-sm text-gray-500">
                <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {course.duration}
              </span>
              <span className="text-sm text-gray-500">
                <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {course.level}
              </span>
              {course.rating && (
                <span className="text-sm text-gray-500">
                  <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {course.rating} ({course.num_reviews?.toLocaleString()})
                </span>
              )}
              {course.is_free === "true" && (
                <span className="text-sm text-green-600 font-medium">
                  Free
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default RecommendedCourses;
