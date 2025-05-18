
import React, { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Loader2 } from 'lucide-react';

type SearchingAnimationProps = {
  firstName?: string;
  lastName?: string;
};

const SearchingAnimation: React.FC<SearchingAnimationProps> = ({ firstName, lastName }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  // Each step with its own color
  const searchSteps = [
    { 
      text: "Scanning death certificates", 
      color: "bg-blue-500", 
      textColor: "text-blue-600",
      duration: 1000
    },
    { 
      text: "Checking obituary databases", 
      color: "bg-purple-500", 
      textColor: "text-purple-600",
      duration: 1400
    },
    { 
      text: "Searching funeral records", 
      color: "bg-pink-500", 
      textColor: "text-pink-600",
      duration: 1200
    },
    { 
      text: "Finding family connections", 
      color: "bg-amber-500", 
      textColor: "text-amber-600",
      duration: 1600
    },
    { 
      text: "Analyzing memorial notices", 
      color: "bg-emerald-500", 
      textColor: "text-emerald-600",
      duration: 1300
    },
    { 
      text: "Gathering public records", 
      color: "bg-teal-500", 
      textColor: "text-teal-600",
      duration: 900
    }
  ];

  useEffect(() => {
    // Animation sequence
    const animateSteps = async () => {
      for (let i = 0; i < searchSteps.length; i++) {
        setCurrentStep(i);
        
        // Wait for the step's duration before marking it complete
        await new Promise(resolve => setTimeout(resolve, searchSteps[i].duration));
        
        setCompletedSteps(prev => [...prev, i]);
      }
    };
    
    animateSteps();
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.1)] p-8 transition-all duration-300 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Searching for {firstName || ''} {lastName || ''}
        </h2>
        <div className="relative h-12 w-12 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-100 rounded-full animate-pulse"></div>
          <Loader2 className="h-8 w-8 text-brand-600 animate-spin relative" />
        </div>
      </div>
      
      <div className="space-y-6">
        {searchSteps.map((step, index) => (
          <div key={index} className={`transition-all duration-500 ${index <= currentStep ? 'opacity-100' : 'opacity-30'}`}>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span className={`relative flex h-6 w-6 shrink-0 mr-3 ${completedSteps.includes(index) ? step.textColor : 'text-gray-400'}`}>
                  {completedSteps.includes(index) ? (
                    <CheckCircle className="h-6 w-6 animate-scale-in" />
                  ) : (
                    <span className={`animate-pulse h-5 w-5 rounded-full ${index === currentStep ? step.textColor : 'bg-gray-200'}`}></span>
                  )}
                </span>
                <span className={`font-medium ${completedSteps.includes(index) ? step.textColor : 'text-gray-500'}`}>
                  {step.text}
                </span>
              </div>
              <span className={`text-sm font-medium ${
                completedSteps.includes(index) 
                  ? 'text-green-600' 
                  : index === currentStep 
                    ? step.textColor
                    : 'text-gray-400'
              }`}>
                {completedSteps.includes(index) ? 'Complete' : index === currentStep ? 'Searching...' : 'Pending'}
              </span>
            </div>
            
            <Progress 
              value={completedSteps.includes(index) ? 100 : index === currentStep ? Math.random() * 60 + 30 : 0}
              className={`h-2 ${
                completedSteps.includes(index) 
                  ? `${step.color} transition-all duration-1000` 
                  : index === currentStep 
                    ? `${step.color} animate-pulse transition-all duration-700` 
                    : 'bg-gray-100'
              }`}
            />
          </div>
        ))}
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Searching our database of over 100 million records...
          </p>
          <div className="bg-brand-50 text-brand-800 text-sm font-medium rounded-full px-3 py-1">
            {Math.min(completedSteps.length, searchSteps.length)} of {searchSteps.length} steps complete
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchingAnimation;
