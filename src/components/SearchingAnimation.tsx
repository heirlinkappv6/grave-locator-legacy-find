
import React from 'react';

type SearchingAnimationProps = {
  firstName?: string;
  lastName?: string;
};

const SearchingAnimation: React.FC<SearchingAnimationProps> = ({ firstName, lastName }) => {
  const searchTerms = [
    "Scanning death certificates",
    "Checking obituary databases",
    "Searching funeral records",
    "Finding family connections",
    "Analyzing memorial notices",
    "Gathering public records"
  ];

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-search p-8">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Searching for {firstName || ''} {lastName || ''}...
      </h2>
      
      <div className="space-y-6 mb-8">
        {searchTerms.map((term, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{term}</span>
              <span className="text-brand-600 font-medium">In progress...</span>
            </div>
            <div className="progress-indicator">
              <div 
                className="progress-bar" 
                style={{ 
                  width: `${Math.min(100, index * 20)}%`,
                  animationDelay: `${index * 0.2}s` 
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-center text-gray-500 text-sm">
        Please wait while we search our extensive database. This may take a few moments.
      </p>
    </div>
  );
};

export default SearchingAnimation;
