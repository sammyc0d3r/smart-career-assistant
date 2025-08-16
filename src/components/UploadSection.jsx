import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const UploadSection = ({ fileInputRef: externalFileInputRef }) => {
  const navigate = useNavigate();
  const internalFileInputRef = useRef(null);
  const fileInputRef = externalFileInputRef || internalFileInputRef;
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('cv', file);

    try {
      const response = await fetch('https://api.smartcareerassistant.online/api/analyze', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Something went wrong while analyzing the CV.');
      }

      const data = await response.json();
      
      // Check if the response has empty fields
      const hasEmptyFields = !data.fields?.length && 
        (!data.extracted_info?.skills?.length && 
         !data.extracted_info?.certifications?.length && 
         !data.extracted_info?.job_titles?.length);

      if (hasEmptyFields) {
        setError('We couldn\'t find any tech-related information in your CV. Our platform currently only supports CVs related to technology and computer science fields. Please upload a CV with relevant technical experience.');
      } else {
        // Navigate to analysis page with the results
        // Store CV analysis data in sessionStorage
        const analysisData = {
          relatedFields: data.fields || [],
          extractedInfo: data.extracted_info || {},
          fileInfo: {
            filename: file.name,
            fileType: file.type.split('/')[1],
            uploadedAt: new Date().toISOString()
          }
        };
        sessionStorage.setItem('pendingCvAnalysis', JSON.stringify(analysisData));
        navigate('/cv-analysis', { state: analysisData });
      }
    } catch (err) {
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center py-20 bg-white px-4">
      {!error && (
        <>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Upload Your CV</h2>
          <p className="text-gray-500 mb-6">Supported formats: PDF, DOCX</p>
        </>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current.click()}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-full transition"
      >
        Select File
      </button>

      {fileName && <p className="mt-4 text-green-600">{fileName} selected.</p>}

      {loading && <p className="mt-4 text-indigo-600 animate-pulse">Analyzing CV...</p>}
      {error && (
        <div className="mt-4 max-w-2xl w-full">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-sm">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">CV Analysis Result</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                  <div className="mt-4">
                    <p className="font-medium">What you can do:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Upload a CV with technical experience</li>
                      <li>Make sure your CV includes relevant skills and certifications</li>
                      <li>Check if your job titles reflect technical roles</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setError('');
              setFileName('');
              fileInputRef.current.value = '';
            }}
            className="mt-6 text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Try Again
          </button>
        </div>
      )}


    </section>
  );
};

export default UploadSection;
