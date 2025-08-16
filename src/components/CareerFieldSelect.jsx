import React, { useState } from 'react';

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

careerFields.sort(); // Sort alphabetically

const CareerFieldSelect = ({ value, onChange, placeholder = 'Select your career field' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFields = careerFields.filter(field => 
    field.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (field) => {
    onChange(field);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative">
      <div
        className="flex items-center justify-between w-full px-3 py-2 bg-[var(--background-color)] border border-gray-600 rounded-md text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-400">{value || placeholder}</span>
        <svg
          className={`w-5 h-5 text-gray-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
          <div className="p-2 border-b">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search fields..."
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="p-2">
            {filteredFields.length === 0 ? (
              <div className="text-gray-500 text-center py-4">No fields found</div>
            ) : (
              filteredFields.map((field) => (
                <div
                  key={field}
                  onClick={() => handleSelect(field)}
                  className={`p-2 cursor-pointer hover:bg-gray-100 ${
                    value === field ? 'bg-gray-100' : ''
                  }`}
                >
                  {field}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerFieldSelect;
