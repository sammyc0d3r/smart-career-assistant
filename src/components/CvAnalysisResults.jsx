import React, { useEffect, useState } from 'react';
import FieldCard from './FieldCard';
import CareerFieldDropdown from './CareerFieldDropdown';
import { useAuth } from './AuthContext';

const CvAnalysisResults = ({ extractedInfo, relatedFields, filename = 'cv.pdf', fileType = 'pdf' }) => {
  const { token } = useAuth();
  const [analysisSubmitted, setAnalysisSubmitted] = useState(false);

  useEffect(() => {
    const submitAnalysis = async () => {
      if (!token || analysisSubmitted) return;

      try {
        const response = await fetch('https://api.smartcareerassistant.online/cv-analysis', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            filename,
            file_type: fileType,
            status: 'success',
            top_field: relatedFields[0]?.name || '',
            match_score: relatedFields[0]?.score || 0,
            processing_time: 2.5, // You might want to track actual processing time
            error_message: null
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('CV analysis submitted successfully:', result);
        setAnalysisSubmitted(true);
      } catch (error) {
        console.error('Error submitting CV analysis:', error);
      }
    };

    submitAnalysis();
  }, [token, filename, fileType, relatedFields, analysisSubmitted]);
  return (
    <div className="mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">CV Analysis Results</h2>
        <p className="text-lg text-gray-600">Here's what we found in your CV</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Extracted Information */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Extracted Information</h3>
          
          {/* Skills */}
          {extractedInfo.skills?.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-700 mb-3">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {extractedInfo.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Job Titles */}
          {extractedInfo.job_titles?.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-700 mb-3">Experience</h4>
              <ul className="space-y-2">
                {extractedInfo.job_titles.map((title, index) => (
                  <li key={index} className="text-gray-600 flex items-center">
                    <svg className="w-4 h-4 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {title}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Certifications */}
          {extractedInfo.certifications?.length > 0 && (
            <div>
              <h4 className="text-lg font-medium text-gray-700 mb-3">Certifications</h4>
              <ul className="space-y-2">
                {extractedInfo.certifications.map((cert, index) => (
                  <li key={index} className="text-gray-600 flex items-center">
                    <svg className="w-4 h-4 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Career Field Suggestions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Suggested Career Fields</h3>
          <p className="text-gray-600 mb-6">Based on your CV, here are the career paths that best match your profile:</p>
          
          <div className="grid gap-4">
            {relatedFields.map((field, index) => (
              <FieldCard 
                key={index} 
                title={typeof field === 'object' ? field.field : field} 
                score={typeof field === 'object' ? field.score : Math.round(Math.random() * 3 + 7)}
              />
            ))}
          </div>

          <div className="mt-8">
            <CareerFieldDropdown />
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Click on a field to proceed with registration and get personalized career guidance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CvAnalysisResults;
