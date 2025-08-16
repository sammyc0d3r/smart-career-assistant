import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const careerFields = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "AI Engineer",
    "Machine Learning Engineer",
    "Data Scientist",
    "Computer Vision Engineer",
    "Natural Language Processing (NLP) Engineer",
    "Data Analyst",
    "Business Intelligence (BI) Developer",
    "Big Data Engineer",
    "Data Architect",
    "Quantitative Analyst (Quant)",
    "Cybersecurity Analyst",
    "Penetration Tester (Ethical Hacker)",
    "Security Architect",
    "Incident Responder",
    "Cryptographer",
    "iOS Developer",
    "Android Developer",
    "Cross-Platform Developer",
    "Mobile Game Developer",
    "Mobile UI/UX Designer",
    "Software Developer",
    "Embedded Systems Engineer",
    "Systems Programmer",
    "Game Developer",
    "Blockchain Developer",
    "Network Administrator",
    "Database Administrator (DBA)",
    "IT Support Specialist",
    "Help Desk Technician",
    "System Administrator",
    "CI/CD Engineer",
    "Automation Engineer",
    "Site Reliability Engineer (SRE)",
    "Configuration Manager",
    "Release Manager",
    "IoT Developer",
    "IoT Solutions Architect",
    "IoT Security Specialist",
    "Edge Computing Engineer",
    "Smart Home Developer",
    "AR Developer",
    "VR Developer",
    "3D Artist",
    "XR Engineer",
    "Interaction Designer",
    "Product Manager",
    "Technical Product Manager",
    "Scrum Master",
    "Product Owner",
    "Growth Hacker",
    "QA Engineer",
    "Automation Tester",
    "Performance Tester",
    "Security Tester",
    "Manual Tester",
    "Fintech Developer",
    "Algorithmic Trader",
    "Risk Analyst",
    "Blockchain Consultant",
    "RegTech Specialist",
    "Quantum Computing Engineer",
    "Robotics Engineer",
    "Biotech Developer",
    "Autonomous Vehicle Engineer",
    "Space Tech Engineer"
];

const CareerFieldDropdown = ({ onFieldSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const filteredFields = careerFields.filter(field => 
    field.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFieldSelect = (field) => {
    if (onFieldSelect) {
      onFieldSelect(field);
    }
    if (isAuthenticated && user) {
      navigate('/dashboard', { state: { selectedField: field } });
    } else {
      navigate('/register', { state: { selectedField: field } });
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white rounded-xl shadow-lg p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Explore Other Fields</span>
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-lg max-h-[60vh] overflow-auto z-10">
          <div className="p-4 border-b">
            <div className="relative">
              <input
                type="text"
                placeholder="Search career fields..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="p-4">
            {filteredFields.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No fields found</p>
            ) : (
              <div className="space-y-2">
                {filteredFields.map((field, index) => (
                  <button
                    key={index}
                    onClick={() => handleFieldSelect(field)}
                    className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-all duration-200"
                  >
                    {field}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerFieldDropdown;
