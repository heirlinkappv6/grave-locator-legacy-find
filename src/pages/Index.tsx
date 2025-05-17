
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SearchForm from '@/components/SearchForm';
import FeatureSection from '@/components/FeatureSection';
import TestimonialSection from '@/components/TestimonialSection';
import HowItWorks from '@/components/HowItWorks';
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="search-container py-20 px-4">
          <div className="container mx-auto text-center text-white mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Death Records, Obituaries &amp; Family Connections
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Access millions of death records, obituaries, and discover information about relatives of the deceased.
            </p>
          </div>
          
          <SearchForm />
        </div>
        
        <HowItWorks />
        <FeatureSection />
        
        {/* Additional Info Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Comprehensive Memorial Records</h2>
              <p className="text-lg text-gray-600 mb-8">
                Our database contains millions of death records, obituaries, and related family information dating back decades. Whether you're researching your family history, looking for information about a loved one, or conducting genealogical research, we provide the tools to help you find what you need.
              </p>
              <Button className="bg-brand-600 hover:bg-brand-700 px-8 py-6 text-lg">
                Start Your Search
              </Button>
            </div>
          </div>
        </div>
        
        <TestimonialSection />
        
        {/* CTA Section */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to discover more?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Start your search today and uncover obituaries, death records, and family connections.
            </p>
            <Button className="bg-brand-600 hover:bg-brand-700 px-8 py-6 text-lg">
              Search Now
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
