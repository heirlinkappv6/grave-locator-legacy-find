
import React from 'react';

const steps = [
  {
    number: 1,
    title: "Enter Search Information",
    description: "Provide the deceased person's name and any other details you know, like city or state."
  },
  {
    number: 2,
    title: "Review Search Results",
    description: "We'll scan millions of records and present the most relevant matches for your review."
  },
  {
    number: 3,
    title: "Access Detailed Records",
    description: "View obituaries, death records, and information about possible relatives and connections."
  }
];

const HowItWorks = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Progress Line */}
            <div className="hidden md:block absolute left-[25px] top-0 w-1 h-full bg-gray-200 z-0"></div>
            
            {/* Steps */}
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-6 relative z-10">
                  <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-brand-600 text-white font-bold text-xl shadow-md">
                    {step.number}
                  </div>
                  <div className="pt-2">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
