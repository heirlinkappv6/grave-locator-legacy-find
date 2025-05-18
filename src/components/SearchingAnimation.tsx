
import React, { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Loader2, FileText, Search, User, Users } from 'lucide-react';

type SearchingAnimationProps = {
  firstName?: string;
  lastName?: string;
};

const SearchingAnimation: React.FC<SearchingAnimationProps> = ({ firstName, lastName }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  // Each step with its own color and icon
  const searchSteps = [
    { 
      text: "Scanning death certificates", 
      color: "bg-blue-500", 
      textColor: "text-blue-600",
      duration: 1000,
      icon: FileText
    },
    { 
      text: "Checking obituary databases", 
      color: "bg-purple-500", 
      textColor: "text-purple-600",
      duration: 1400,
      icon: Search
    },
    { 
      text: "Searching funeral records", 
      color: "bg-pink-500", 
      textColor: "text-pink-600",
      duration: 1200,
      icon: FileText
    },
    { 
      text: "Finding family connections", 
      color: "bg-amber-500", 
      textColor: "text-amber-600",
      duration: 1600,
      icon: Users
    },
    { 
      text: "Analyzing memorial notices", 
      color: "bg-emerald-500", 
      textColor: "text-emerald-600",
      duration: 1300,
      icon: Search
    },
    { 
      text: "Gathering public records", 
      color: "bg-teal-500", 
      textColor: "text-teal-600",
      duration: 900,
      icon: User
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
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.1)] p-8 transition-all duration-300 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Searching for {firstName || ''} {lastName || ''}
        </h2>
        <div className="relative h-12 w-12 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-100 rounded-full animate-pulse"></div>
          <Loader2 className="h-8 w-8 text-brand-600 animate-spin relative" />
        </div>
      </div>
      
      <div className="overflow-x-auto pb-4">
        <div className="flex space-x-4 min-w-max">
          {searchSteps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <div 
                key={index} 
                className={`transition-all duration-500 flex flex-col items-center min-w-[120px] ${
                  index <= currentStep ? 'opacity-100' : 'opacity-30'
                }`}
              >
                <div className="relative mb-2">
                  <div className={`flex items-center justify-center h-12 w-12 rounded-full ${
                    completedSteps.includes(index)
                      ? step.color
                      : index === currentStep
                        ? 'bg-gray-200 animate-pulse'
                        : 'bg-gray-100'
                  }`}>
                    {completedSteps.includes(index) ? (
                      <CheckCircle className="h-6 w-6 text-white animate-scale-in" />
                    ) : (
                      <StepIcon className={`h-6 w-6 ${
                        index === currentStep ? 'text-gray-500' : 'text-gray-400'
                      }`} />
                    )}
                  </div>
                  
                  {index < searchSteps.length - 1 && (
                    <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-4 h-0.5 bg-gray-200"></div>
                  )}
                </div>
                
                <div className={`text-center ${
                  completedSteps.includes(index) ? step.textColor : 'text-gray-500'
                } text-sm font-medium`}>
                  {step.text}
                </div>
                
                <Progress 
                  value={completedSteps.includes(index) ? 100 : index === currentStep ? Math.random() * 60 + 30 : 0}
                  className={`h-2 mt-2 w-full max-w-[120px] ${
                    completedSteps.includes(index) 
                      ? `${step.color} transition-all duration-1000` 
                      : index === currentStep 
                        ? `${step.color} animate-pulse transition-all duration-700` 
                        : 'bg-gray-100'
                  }`}
                />
              </div>
            );
          })}
        </div>
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
