
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero */}
        <div className="search-container py-16 px-4">
          <div className="container mx-auto text-center text-white">
            <h1 className="text-4xl font-bold mb-4">About MemorialRecords</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Connecting families with information about their loved ones.
            </p>
          </div>
        </div>
        
        {/* Mission */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At MemorialRecords, our mission is to help people connect with their family history by providing access to comprehensive death records, obituaries, and family connections. We believe that everyone deserves to know their family story and understand the lives of those who came before them.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We strive to make the process of finding information about deceased loved ones as simple and respectful as possible. Our extensive database combines information from multiple sources, allowing users to discover details that might otherwise be difficult to locate.
              </p>
              <p className="text-lg text-gray-600">
                Whether you're researching genealogy, looking for information about a relative, or trying to connect with extended family, MemorialRecords provides the tools and resources you need.
              </p>
            </div>
          </div>
        </div>
        
        {/* What We Offer */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What We Offer</h2>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-3">Comprehensive Death Records</h3>
                  <p className="text-gray-600">
                    Access millions of death records from across the United States, with information dating back decades. Our records include death certificates, Social Security Death Index information, and more.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-3">Obituary Archives</h3>
                  <p className="text-gray-600">
                    Browse through our extensive collection of obituaries and memorial notices from newspapers and online sources across the country, providing valuable insights into the lives of your ancestors.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-3">Family Connections</h3>
                  <p className="text-gray-600">
                    Discover relatives and family connections to help build your family tree. Our system identifies potential relatives of the deceased, making it easier to expand your genealogical research.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-3">User-Friendly Search Tools</h3>
                  <p className="text-gray-600">
                    Our intuitive search interface makes it easy to find the information you're looking for, even with minimal details. Search by name, location, and date to narrow down results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Our Data Sources */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Our Data Sources</h2>
              <p className="text-lg text-gray-600 mb-6">
                We aggregate information from a variety of public sources to provide the most comprehensive view possible:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-600">
                <li>Public death records from state and county offices</li>
                <li>Social Security Death Index</li>
                <li>Published obituaries from newspapers nationwide</li>
                <li>Online memorial sites</li>
                <li>Cemetery and burial records</li>
                <li>Historical records and archives</li>
                <li>Funeral home notifications</li>
              </ul>
              
              <p className="text-gray-600">
                All of our information is collected from public records and publicly available sources. We do not maintain private information that isn't already available through public channels.
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to discover your family history?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Start your search today and connect with your family's past.
            </p>
            <Button className="bg-brand-600 hover:bg-brand-700 px-8 py-6 text-lg">
              Begin Your Search
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
