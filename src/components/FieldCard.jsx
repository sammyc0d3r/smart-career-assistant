import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

const FieldCard = ({ title, score }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const handleSelect = () => {
    const fieldData = {
      name: title,
      score: score
    };

    if (isAuthenticated && user) {
      navigate('/dashboard', { state: { selectedField: fieldData } });
    } else {
      navigate('/register', { state: { selectedField: fieldData } });
    }
  };

  return (
    <div
      onClick={handleSelect}
      className="p-4 rounded-xl border border-gray-300 bg-white shadow hover:shadow-lg transform hover:scale-105 transition cursor-pointer"
    >
      <h4 className="text-lg font-semibold text-gray-700">{title}</h4>
      <p className="text-sm text-gray-500 mt-2">Match Score: {score}/10</p>
      <div className="mt-3 text-sm text-indigo-600">Click to select →</div>
    </div>
  );
};

export default FieldCard;
