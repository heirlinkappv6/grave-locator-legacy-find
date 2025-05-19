
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
    <div className="min-h-screen flex flex-col bg-[#FEF7CD]/10">
      <Navigation />
      
      <main className="flex-grow py-8">
        {isSearching ? (
          <div className="container mx-auto px-4 py-12">
            <SearchingAnimation 
              firstName={searchParams.firstName} 
              lastName={searchParams.lastName} 
            />
          </div>
        ) : (
          <div className="relative">
            {/* Decorative family tree background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <div className="absolute top-0 left-0 w-64 h-64">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-brand-800">
                  <path d="M16 20h3a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-1a1 1 0 0 1-1-1V9a1 1 0 0 0-1-1h-1" />
                  <path d="M8 4H5a1 1 0 0 0-1 1v1a2 2 0 0 0 2 2h1a1 1 0 0 1 1 1v6a1 1 0 0 0 1 1h1" />
                  <path d="M2 2h20v2H2z" />
                  <path d="M2 20h20v2H2z" />
                  <path d="M12 2v20" />
                </svg>
              </div>
              <div className="absolute top-1/3 right-0 w-48 h-48">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-brand-800">
                  <circle cx="9" cy="9" r="2" />
                  <circle cx="9" cy="15" r="2" />
                  <circle cx="15" cy="15" r="2" />
                  <path d="M9 9h.01" />
                  <path d="M9 15h.01" />
                  <path d="M15 15h.01" />
                  <path d="M9 11v2" />
                  <path d="M11 15h2" />
                </svg>
              </div>
              <div className="absolute bottom-0 left-1/4 w-72 h-72">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-brand-800">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
            </div>
            
            <div className="relative z-10">
              <SearchResults 
                firstName={searchParams.firstName}
                lastName={searchParams.lastName}
                city={searchParams.city}
                state={searchParams.state}
              />
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Results;
