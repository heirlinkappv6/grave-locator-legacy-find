
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import RecordDetail from '@/components/RecordDetail';
import PaywallOverlay from '@/components/PaywallOverlay';

const RecordDetailsPage = () => {
  // In a real app, this would come from auth state or subscription check
  const [hasAccess] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow bg-gray-50 py-8">
        {hasAccess ? (
          <RecordDetail />
        ) : (
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h1 className="text-2xl font-bold mb-4">Record Details</h1>
              <div className="border-2 border-gray-200 rounded-lg p-8 mb-6">
                <div className="flex items-center justify-center h-48">
                  <div className="text-center">
                    <svg 
                      className="mx-auto h-12 w-12 text-gray-400 mb-4" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                      />
                    </svg>
                    <h2 className="text-xl font-semibold mb-2">This Record is Locked</h2>
                    <p className="text-gray-600">
                      Subscribe to unlock complete record details including full obituary, family connections, and more.
                    </p>
                  </div>
                </div>
              </div>
              
              <PaywallOverlay />
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default RecordDetailsPage;
