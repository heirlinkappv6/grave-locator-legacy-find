
import React from 'react';

const testimonials = [
  {
    name: "Sarah Johnson",
    text: "I had been searching for information about my grandfather for years. MemorialRecords helped me find his obituary and connect with relatives I didn't know existed.",
    location: "Denver, Colorado"
  },
  {
    name: "Michael Rodriguez",
    text: "When researching my family tree, I hit a roadblock with my great-aunt's death records. This service provided accurate information that helped complete our genealogy.",
    location: "Austin, Texas"
  },
  {
    name: "Emily Chen",
    text: "The search tools were intuitive and the information comprehensive. I was able to find my great-grandparents' obituaries and learn so much about my family history.",
    location: "Seattle, Washington"
  }
];

const TestimonialSection = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">What Our Users Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center mb-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic mb-4">"{testimonial.text}"</p>
              <div className="mt-auto">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
