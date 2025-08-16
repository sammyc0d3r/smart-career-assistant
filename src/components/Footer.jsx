import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center text-gray-600 py-6 mt-auto">
      <div className="max-w-7xl mx-auto w-full px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 py-8 border-t border-gray-200">
          {/* Left: Mission & Credit */}
          <div className="flex-1 text-center md:text-left mb-4 md:mb-0">
            <div className="text-lg font-semibold text-indigo-700 mb-2">Smart Career Assistant</div>
            <div className="text-gray-600 mb-2 text-sm">Empowering your career journey with AI-driven guidance, job suggestions, and personalized insights.</div>
            <div className="text-xs text-gray-400">&copy; 2025 Smart Career Assistant. All rights reserved.</div>
            <div className="text-xs text-gray-500 mt-2">A project by <span className="font-bold">Jamhuriya University</span></div>
          </div>

          {/* Center: Quick Links */}
          <div className="flex-1 flex flex-col items-center">
            <div className="mb-2 text-sm font-semibold text-indigo-700">Quick Links</div>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="/" className="text-indigo-600 hover:underline">Home</a>
              <a href="/about" className="text-indigo-600 hover:underline">About Us</a>
              <a href="/faqs" className="text-indigo-600 hover:underline">FAQs</a>
              <a href="/privacy-policy" className="text-indigo-600 hover:underline">Privacy Policy</a>
              <a href="/terms-and-conditions" className="text-indigo-600 hover:underline">Terms &amp; Conditions</a>
            </div>
          </div>

          {/* Right: Tech & Social */}
          <div className="flex-1 flex flex-col items-center md:items-end mt-6 md:mt-0">
            <div className="text-xs text-gray-500 mb-2">Powered by <span className="font-bold">FastAPI + React</span></div>
            <div className="flex gap-4 mt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg className="w-5 h-5 text-gray-400 hover:text-indigo-600 transition" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.631.771-1.631 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <svg className="w-5 h-5 text-gray-400 hover:text-indigo-600 transition" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195A4.92 4.92 0 0 0 16.616 3c-2.73 0-4.942 2.21-4.942 4.937 0 .387.045.765.127 1.127C7.728 8.842 4.1 6.884 1.671 3.965a4.822 4.822 0 0 0-.666 2.475c0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.239-.616v.062c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.317 0-.626-.03-.927-.086.627 1.956 2.444 3.377 4.6 3.417A9.868 9.868 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A9.936 9.936 0 0 0 24 4.557z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg className="w-5 h-5 text-gray-400 hover:text-indigo-600 transition" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.966 0-1.75-.79-1.75-1.76s.784-1.75 1.75-1.75 1.75.79 1.75 1.75-.784 1.76-1.75 1.76zm15.5 10.29h-3v-4.5c0-1.07-.02-2.44-1.49-2.44-1.5 0-1.73 1.17-1.73 2.36v4.58h-3v-9h2.89v1.23h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.74zm0 0"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg className="w-5 h-5 text-gray-400 hover:text-indigo-600 transition" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.975 1.246 2.242 1.308 3.608.058 1.266.069 1.646.069 4.851s-.011 3.584-.069 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.974-2.242 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.011-4.851-.069c-1.366-.062-2.633-.334-3.608-1.308-.974-.975-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.851c.062-1.366.334-2.633 1.308-3.608C4.516 2.497 5.783 2.225 7.149 2.163 8.415 2.105 8.795 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.632.385 3.678 1.339c-.954.954-1.208 2.093-1.267 3.374C2.013 8.332 2 8.741 2 12s.013 3.668.072 4.948c.059 1.281.313 2.42 1.267 3.374.954.954 2.093 1.208 3.374 1.267C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.42-.313 3.374-1.267.954-.954 1.208-2.093 1.267-3.374.059-1.28.072-1.689.072-4.948s-.013-3.668-.072-4.948c-.059-1.281-.313-2.42-1.267-3.374-.954-.954-2.093-1.208-3.374-1.267C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
