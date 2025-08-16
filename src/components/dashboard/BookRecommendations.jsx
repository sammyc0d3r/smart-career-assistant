import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
// Import the image using Vite's public directory reference
const bookCover = new URL('/src/assets/bookcover.webp', import.meta.url).href;

const BookRecommendations = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;

    const fetchRecommendations = async () => {
      try {
        if (!user.field) {
          throw new Error('Please set your career field in settings to view book recommendations');
        }

        const careerPath = user.field;
        
        const response = await fetch(`https://api.smartcareerassistant.online/books/recommend?career_path=${encodeURIComponent(careerPath)}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch recommendations: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        setBooks(data.recommendations);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [user]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Book Recommendations</h2>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex space-x-4">
                <div className="h-48 w-32 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Book Recommendations</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Book Recommendations</h2>
      <div className="space-y-4">
        {books.map((book, index) => (
          <div key={index} className="flex space-x-4">
            <div className="flex-shrink-0">
              <img 
                src={bookCover} 
                alt="Book cover"
                className="h-48 w-32 object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium text-gray-900 truncate">{book.book_title}</h3>
              <p className="text-sm text-gray-500">{book.author}</p>
              <p className="mt-1 text-sm text-gray-600 line-clamp-2">{book.description}</p>
              <div className="mt-2 flex items-center space-x-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {book.rating} ⭐
                </span>
                <a 
                  href={book.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  View on Amazon
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookRecommendations;
