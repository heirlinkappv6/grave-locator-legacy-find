import React from 'react';
import { motion } from 'framer-motion';
import { Search, ListChecks, BookOpen } from 'lucide-react';

const steps = [
  {
    number: 1,
    title: "Enter Search Information",
    description: "Provide the deceased person's name and any other details you know, like city or state.",
    icon: <Search size={36} className="text-brand-600" />,
  },
  {
    number: 2,
    title: "Review Search Results",
    description: "We'll scan millions of records and present the most relevant matches for your review.",
    icon: <ListChecks size={36} className="text-brand-600" />,
  },
  {
    number: 3,
    title: "Access Detailed Records",
    description: "View obituaries, death records, and information about possible relatives and connections.",
    icon: <BookOpen size={36} className="text-brand-600" />,
  }
];

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      type: 'spring',
    },
  }),
};

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-16 text-brand-700 tracking-tight">
          How It Works
        </h2>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 md:gap-0">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex-1 bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center text-center relative z-10 hover:shadow-2xl transition-shadow duration-300 group"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={containerVariants}
            >
              <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-brand-100 group-hover:bg-brand-200 transition-colors duration-300 shadow-md">
                {step.icon}
              </div>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center bg-brand-600 text-white text-2xl font-bold rounded-full border-4 border-white shadow-lg">
                {step.number}
              </div>
              <h3 className="text-2xl font-semibold mb-3 mt-8 text-brand-700">{step.title}</h3>
              <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
