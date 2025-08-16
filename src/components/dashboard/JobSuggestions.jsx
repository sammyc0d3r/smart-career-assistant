import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/AuthContext';

const JobSuggestions = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, user } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const loadJobs = async () => {
      try {
        if (!token) {
          if (isMounted) {
            setError('Please log in to view job suggestions');
            setLoading(false);
          }
          return;
        }

        if (!user?.field) {
          if (isMounted) {
            setError('Please set your career field in settings to view job suggestions');
            setLoading(false);
          }
          return;
        }

        // Check cache first
        const cacheKey = `jobs_${user.field}`;
        const cachedData = sessionStorage.getItem(cacheKey);
        if (cachedData) {
          const { data: cachedJobs, timestamp } = JSON.parse(cachedData);
          // Cache is valid for 1 hour
          if (Date.now() - timestamp < 3600000) {
            if (isMounted) {
              console.log('Using cached jobs for field:', user.field);
              setJobs(cachedJobs);
              setError(null);
              setLoading(false);
            }
            return;
          } else {
            // Clear expired cache
            sessionStorage.removeItem(cacheKey);
          }
        }

        if (isMounted) {
          setLoading(true);
        }

        console.log('Fetching fresh jobs for field:', user.field);
        const response = await fetch('https://api.smartcareerassistant.online/auth/jobs', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Session expired. Please log in again.');
          } else if (response.status === 404) {
            throw new Error('User not found.');
          } else if (response.status === 500) {
            throw new Error('Error fetching jobs from server.');
          } else if (response.status === 504) {
            throw new Error('Job search service timed out.');
          } else {
            throw new Error(data.detail || 'Failed to fetch jobs');
          }
        }

        const jobsList = data.jobs || [];
        if (isMounted) {
          setJobs(jobsList);
          setError(null);

          // Cache the results
          sessionStorage.setItem(`jobs_${user.field}`, JSON.stringify({
            data: jobsList,
            timestamp: Date.now()
          }));
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error loading jobs:', err);
          setError(err.message || 'Failed to load job suggestions');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadJobs();

    return () => {
      isMounted = false;
    };
  }, [token, user?.field]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Job Matches</h2>
        </div>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Job Matches</h2>
        </div>
        <div className="text-center text-red-600 p-4">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!Array.isArray(jobs) || jobs.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Job Matches</h2>
        </div>
        <div className="text-center text-gray-500 p-4">
          <p>No job suggestions available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Job Matches</h2>
        <button className="text-sm text-indigo-600 hover:text-indigo-800">View All</button>
      </div>
      <div className="space-y-4">
        {jobs.map((job, index) => {
          // Defensive checks
          if (!job || !job.job_id || !job.job_title) return null;

          return (
            <div
              key={job.job_id || index}
              className="border border-gray-200 rounded-lg p-4 hover:border-indigo-500 transition-colors cursor-pointer relative"
              onClick={() => job.job_apply_link && window.open(job.job_apply_link, '_blank')}
            >
              <div className="absolute top-4 right-4 flex space-x-2">
                {job.job_employment_type && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {job.job_employment_type}
                  </span>
                )}
              </div>
              <h3 className="font-medium text-gray-900 pr-20">{job.job_title}</h3>
              <p className="text-sm text-gray-600 mt-1">{job.employer_name || 'Unknown Employer'}</p>
              <div className="mt-2 flex items-center space-x-4">
                {job.job_location && (
                  <span className="text-sm text-gray-500">
                    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {job.job_location}
                  </span>
                )}
                {job.job_publisher && (
                  <span className="text-sm text-gray-500">via {job.job_publisher}</span>
                )}
              </div>
              {job.job_highlights?.Responsibilities?.length > 0 && (
                <div className="mt-3 text-sm text-gray-600">
                  <p className="line-clamp-2">
                    <strong>Key Responsibility:</strong> {job.job_highlights.Responsibilities[0]}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobSuggestions;
