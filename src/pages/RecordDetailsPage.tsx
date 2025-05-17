
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import RecordDetail from '@/components/RecordDetail';

const RecordDetailsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow bg-gray-50 py-8">
        <RecordDetail />
      </main>
      
      <Footer />
    </div>
  );
};

export default RecordDetailsPage;
