
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SearchingAnimation from '@/components/SearchingAnimation';
import SearchResults from '@/components/SearchResults';

const Results = () => {
  const location = useLocation();
  const searchParams = location.state as { firstName?: string; lastName?: string; city?: string; state?: string } || {};
  const [isSearching, setIsSearching] = useState(true);

  useEffect(() => {
    // Simulate search delay - give enough time for the animation to complete
    const timer = setTimeout(() => {
      setIsSearching(false);
    }, 8000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow bg-gray-50 py-8">
        {isSearching ? (
          <div className="container mx-auto px-4 py-12">
            <SearchingAnimation 
              firstName={searchParams.firstName} 
              lastName={searchParams.lastName} 
            />
          </div>
        ) : (
          <SearchResults 
            firstName={searchParams.firstName}
            lastName={searchParams.lastName}
            city={searchParams.city}
            state={searchParams.state}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Results;
