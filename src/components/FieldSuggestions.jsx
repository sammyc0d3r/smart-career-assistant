import React from 'react';
import FieldCard from './FieldCard';

const FieldSuggestions = ({ fields }) => {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Suggested Career Fields</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {fields.map((item, index) => (
          <FieldCard key={index} title={item.field} score={item.score} />
        ))}
      </div>
    </div>
  );
};

export default FieldSuggestions;
