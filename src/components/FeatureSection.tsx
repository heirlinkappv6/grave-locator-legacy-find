
import React from 'react';
import { Search, FileText, Users } from 'lucide-react';

const features = [
  {
    title: 'Death Records Search',
    description: 'Access millions of official death records from across the United States, dating back decades.',
    icon: Search
  },
  {
    title: 'Obituary Archives',
    description: 'Find published obituaries and memorial notices from thousands of newspapers and online sources.',
    icon: FileText
  },
  {
    title: 'Family Connections',
    description: 'Discover relatives and family members connected to the deceased for genealogy research.',
    icon: Users
  }
];

const FeatureSection = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="border rounded-lg p-6 text-center bg-white hover:shadow-md transition-shadow duration-200">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-600 mb-4">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
