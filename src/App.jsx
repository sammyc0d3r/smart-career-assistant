import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import Home from './pages/Home';
import About from './pages/About';
import FAQs from './pages/FAQs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import CvAnalysis from './pages/CvAnalysis';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/cv-analysis" element={<CvAnalysis />} />
                  <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
