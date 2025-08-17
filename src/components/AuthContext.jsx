import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';

const API_URL = 'https://api.smartcareerassistant.online';
export const AUTH_ENDPOINTS = {
  login: `${API_URL}/auth/login`,
  register: `${API_URL}/auth/register`,
  me: `${API_URL}/auth/me`,
  jobs: `${API_URL}/auth/jobs`,
  cvAnalysis: `${API_URL}/cv-analysis`,
  analyze: `${API_URL}/api/analyze`
};

// Utility functions for localStorage
const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return key === 'user' ? JSON.parse(item) : item;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, key === 'user' ? JSON.stringify(value) : value);
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

const AuthContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => storage.get('isAuthenticated') === 'true');
  const [user, setUser] = useState(() => storage.get('user'));
  const [token, setToken] = useState(() => storage.get('token'));
  const [jobs, setJobs] = useState(() => storage.get('jobs') || []);
  const [loading, setLoading] = useState(true); // NEW

  const fetchJobs = useCallback(async () => {
    if (!token) return null;
    try {
      // Check session storage first
      const cachedData = sessionStorage.getItem('jobs_cache');
      if (cachedData) {
        const { jobs: cachedJobs, timestamp } = JSON.parse(cachedData);
        // Cache is valid for 1 hour
        if (Date.now() - timestamp < 3600000) {
          console.log('Using cached jobs');
          setJobs(cachedJobs);
          return cachedJobs;
        }
      }

      console.log('Fetching fresh jobs data');
      const response = await fetch(AUTH_ENDPOINTS.jobs, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Failed to fetch jobs');
      const data = await response.json();
      const jobsList = data.jobs || [];
      
      // Cache the jobs with timestamp
      sessionStorage.setItem('jobs_cache', JSON.stringify({
        jobs: jobsList,
        timestamp: Date.now()
      }));
      
      setJobs(jobsList);
      storage.set('jobs', jobsList);
      return jobsList;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return null;
    }
  }, [token]);

  const fetchProfile = useCallback(async () => {
    if (!token) return null;
    try {
      const response = await fetch(AUTH_ENDPOINTS.me, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Failed to fetch profile');
      const profileData = await response.json();
      setUser(profileData);
      storage.set('user', profileData);
      return profileData;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  }, [token]);

  const login = useCallback(async (username, password) => {
    try {
      const formData = new URLSearchParams();
      formData.append('grant_type', 'password');
      formData.append('username', username);
      formData.append('password', password);
      formData.append('scope', '');
      formData.append('client_id', 'string');
      formData.append('client_secret', 'string');

      const response = await fetch(AUTH_ENDPOINTS.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = 'Failed to login. Please check your credentials.';
        if (errorData.detail) {
          errorMessage = Array.isArray(errorData.detail)
            ? errorData.detail.map(err => err.msg || err).join('\n')
            : errorData.detail;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setToken(data.access_token);
      setIsAuthenticated(true);
      storage.set('token', data.access_token);
      storage.set('isAuthenticated', 'true');
      await fetchProfile();
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }, [fetchProfile]);

  const register = useCallback(async (username, email, password, field, technicalSkillsPercentage) => {
    try {
      // First, register the user
      const registerResponse = await fetch(AUTH_ENDPOINTS.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          username,
          email: email || `${username}@example.com`, // Provide a default email if none provided
          password,
          field,
          technical_skills_percentage: parseInt(technicalSkillsPercentage)
        })
      });

      if (!registerResponse.ok) {
        let errorMessage = 'Registration failed';
        try {
          const errorData = await registerResponse.json();
          errorMessage = Array.isArray(errorData?.detail)
            ? errorData.detail.map(err => err.msg || err).join('\n')
            : errorData?.detail || errorMessage;
        } catch (e) {
          // If we can't parse JSON, try to get text
          const text = await registerResponse.text();
          if (text) errorMessage = text;
        }

        // Provide a cleaner message for common database constraint errors
        if (/duplicate key value/i.test(errorMessage) || /already exists/i.test(errorMessage)) {
          errorMessage = 'Username already exists';
        }

        throw new Error(errorMessage);
      }

      // After successful registration, log in to get the token
      const loginData = new URLSearchParams();
      loginData.append('grant_type', 'password');
      loginData.append('username', username);
      loginData.append('password', password);
      loginData.append('scope', '');
      loginData.append('client_id', 'string');
      loginData.append('client_secret', 'string');

      const loginResponse = await fetch(AUTH_ENDPOINTS.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body: loginData
      });

      if (!loginResponse.ok) {
        throw new Error('Registration successful but failed to log in automatically');
      }

      const loginResult = await loginResponse.json();
      const access_token = loginResult.access_token;
      
      if (!access_token) {
        throw new Error('No access token received during login');
      }

      // Get user data using the access token
      const userResponse = await fetch(AUTH_ENDPOINTS.me, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Accept': 'application/json'
        }
      });

      if (!userResponse.ok) {
        throw new Error('Failed to fetch user data after registration');
      }

      const userData = await userResponse.json();

      // Set authentication state
      setToken(access_token);
      setIsAuthenticated(true);
      setUser(userData);

      // Store in localStorage
      storage.set('user', userData);
      storage.set('token', access_token);
      storage.set('isAuthenticated', 'true');

      // Start fetching data in background
      fetchProfile();
      fetchJobs();

      // Return immediately with needed data
      return {
        user: userData,
        token: access_token
      };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }, [fetchProfile, fetchJobs, login]);

  const logout = useCallback(() => {
    ['isAuthenticated', 'user', 'token'].forEach(key => storage.remove(key));
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
  }, []);

  // 🔁 Auto re-authenticate on refresh
  useEffect(() => {
    const init = async () => {
      if (token) {
        const profile = await fetchProfile();
        if (!profile) logout(); // token invalid
      }
      setLoading(false);
    };
    init();
  }, [token, fetchProfile, logout]);

  const value = useMemo(() => ({
    isAuthenticated,
    user,
    token,
    jobs,
    login,
    logout,
    register,
    fetchProfile,
    fetchJobs
  }), [isAuthenticated, user, token, jobs, login, logout, register, fetchProfile, fetchJobs]);

  if (loading) return <div>Loading...</div>; // ⏳ Prevent rendering before auth check

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
