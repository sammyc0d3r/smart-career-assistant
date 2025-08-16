import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import CvAnalysisResults from '../components/CvAnalysisResults';

const CvAnalysis = () => {
  const location = useLocation();
  const { extractedInfo, relatedFields, fileInfo } = location.state || {};

  // If no data is passed, redirect to home
  if (!extractedInfo || !relatedFields) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <CvAnalysisResults 
        extractedInfo={extractedInfo} 
        relatedFields={relatedFields}
        filename={fileInfo?.filename}
        fileType={fileInfo?.fileType}
      />
    </div>
  );
};

export default CvAnalysis;
