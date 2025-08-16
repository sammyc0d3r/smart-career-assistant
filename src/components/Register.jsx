import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedFieldData = location.state?.selectedField;
  const selectedField = selectedFieldData?.name || selectedFieldData;
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    technicalSkillsPercentage: (selectedFieldData?.score ? (selectedFieldData.score * 10).toString() : '0'),
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.trim() // Remove whitespace
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.username || !formData.email || !formData.password || !formData.technicalSkillsPercentage || !selectedField) {
      setError('Please fill in all fields and select a career field');
      return;
    }

    // Technical skills percentage validation
    const technicalSkillsPercentage = parseInt(formData.technicalSkillsPercentage);
    if (isNaN(technicalSkillsPercentage) || technicalSkillsPercentage < 0 || technicalSkillsPercentage > 100) {
      setError('Technical Skills Percentage must be a number between 0 and 100');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Password length validation
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);

    try {
      const userData = await register(formData.username, formData.email, formData.password, selectedField, formData.technicalSkillsPercentage);

      if (!userData?.token) {
        throw new Error('Failed to retrieve authentication token.');
      }

      // Redirect to dashboard once token is confirmed
      navigate('/dashboard', { state: { selectedField, user: userData.user || userData } });

      // Submit CV analysis in background if exists
      const pendingAnalysis = sessionStorage.getItem('pendingCvAnalysis');
      if (pendingAnalysis) {
        try {
          const { fileInfo, relatedFields } = JSON.parse(pendingAnalysis);
          fetch('https://api.smartcareerassistant.online/cv-analysis', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userData.token}`
            },
            body: JSON.stringify({
              filename: fileInfo.filename,
              file_type: fileInfo.fileType,
              status: 'success',
              top_field: relatedFields[0]?.name || '',
              match_score: relatedFields[0]?.score || 0,
              processing_time: 2.5,
              error_message: null
            })
          }).finally(() => {
            sessionStorage.removeItem('pendingCvAnalysis');
          });
        } catch (error) {
          console.error('Error submitting CV analysis:', error);
          sessionStorage.removeItem('pendingCvAnalysis');
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to create an account.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedField) {
      navigate('/');
    }
  }, [selectedField, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl transform transition-all hover:scale-[1.01]">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
            {selectedField && (
              <p className="mt-2 text-sm text-gray-600">
                Selected Career: <span className="font-semibold text-indigo-600">{selectedField}</span>
              </p>
            )}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
              {error.split('\n').map((line, i) => (
                <div key={i} className="mb-1">{line}</div>
              ))}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="technicalSkillsPercentage">
                Technical Skills Percentage (0-100)
              </label>
              <input
                type="number"
                id="technicalSkillsPercentage"
                name="technicalSkillsPercentage"
                value={formData.technicalSkillsPercentage}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter percentage (0-100)"
                min="0"
                max="100"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter password"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </div>

          <p className="text-xs text-center text-gray-500">
            By signing up, you agree to our{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              Privacy Policy
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
