import React from 'react';
import { useAuth } from '../../components/AuthContext';

const CareerProgress = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-lg shadow p-6 col-span-2">
      <h2 className="text-xl font-semibold mb-4">Career Progress</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-700">Selected Career Path</h3>
          <p className="text-gray-600">{user?.field || 'No career path selected'}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-700">Skills Progress</h3>
          <div className="mt-2 space-y-3">
            {[
              { name: 'Technical Skills', percentage: user?.technical_skills_percentage || 0 },
              { name: 'Soft Skills', percentage: 70 },
              { name: 'Industry Knowledge', percentage: 70 }
            ].map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-600">{skill.name}</span>
                  <span className="text-sm font-medium text-indigo-600">{skill.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${skill.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700">Next Steps</h3>
          <ul className="mt-2 space-y-2">
            <li className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Complete skill assessments
            </li>
            <li className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Update your portfolio
            </li>
            <li className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Network with industry professionals
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CareerProgress;
