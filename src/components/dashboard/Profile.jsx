import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import CareerFieldSelect from '../CareerFieldSelect';

const Profile = () => {
  const { user, token, fetchProfile, fetchJobs } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    field: user?.field || ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    // Only send fields that have been changed
    const changedFields = {};
    if (formData.username !== user.username) changedFields.username = formData.username;
    if (formData.email !== user.email) changedFields.email = formData.email;
    if (formData.field !== user.field) changedFields.field = formData.field;

    // If no fields were changed, just close the form
    if (Object.keys(changedFields).length === 0) {
      setIsEditing(false);
      return;
    }
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validate email format
    if (formData.email && !validateEmail(formData.email)) {
      setError('Invalid email format');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://api.smartcareerassistant.online/auth/me', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(changedFields)
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 400) {
          setError(errorData.detail || 'Username or email already taken');
        } else if (response.status === 401) {
          setError('Your session has expired. Please log in again.');
          logout();
        } else if (response.status === 404) {
          setError('User not found.');
        } else if (response.status === 500) {
          setError('Server error. Please try again later.');
        } else {
          throw new Error('Failed to update profile');
        }
        return;
      }

      // If field was changed, clear the jobs cache
      if (changedFields.field) {
        // Clear old field's cache if it exists
        if (user.field) {
          sessionStorage.removeItem(`jobs_${user.field}`);
        }
        // Clear new field's cache to force a fresh fetch
        sessionStorage.removeItem(`jobs_${changedFields.field}`);
      }

      // Refresh all data after successful update
      await Promise.all([
        fetchProfile(),
        fetchJobs() // Also fetch new jobs for the updated field
      ]);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[var(--card-color)] rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[var(--text-color)]">Profile Information</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-[var(--primary-color)] text-[var(--text-color)] rounded-md hover:opacity-90 transition-opacity"
          >
            Edit Profile
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-[var(--text-color)] opacity-70">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-[var(--background-color)] border border-gray-600 rounded-md text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-[var(--text-color)] opacity-70">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-[var(--background-color)] border border-gray-600 rounded-md text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-[var(--text-color)] opacity-70">Field</label>
            <CareerFieldSelect
              value={formData.field}
              onChange={(field) => handleChange({ target: { name: 'field', value: field } })}
              placeholder="Select your career field"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[var(--primary-color)] text-[var(--text-color)] rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setError('');
                setFormData({
                  username: user.username || '',
                  email: user.email || '',
                  field: user.field || ''
                });
              }}
              className="px-4 py-2 bg-gray-600 text-[var(--text-color)] rounded-md hover:opacity-90 transition-opacity"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-[var(--text-color)] opacity-70">Username</label>
            <p className="mt-1 text-[var(--text-color)]">{user.username || 'Not provided'}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-[var(--text-color)] opacity-70">Email</label>
            <p className="mt-1 text-[var(--text-color)]">{user.email || 'Not provided'}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-[var(--text-color)] opacity-70">Field</label>
            <div className="mt-1 text-[var(--text-color)]">{user.field || 'Not provided'}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
