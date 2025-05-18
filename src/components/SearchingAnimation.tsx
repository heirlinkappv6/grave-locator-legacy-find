
import React, { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Database, 
  FileText, 
  Users, 
  BookOpen, 
  FileCheck, 
  CheckCircle 
} from 'lucide-react';

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
      glowColor: "shadow-blue-500/50",
      textColor: "text-blue-500",
      icon: FileText,
      duration: 1000
    },
    { 
      text: "Checking obituary databases", 
      color: "bg-purple-500", 
      glowColor: "shadow-purple-500/50",
      textColor: "text-purple-500",
      icon: Database,
      duration: 1400
    },
    { 
      text: "Searching funeral records", 
      color: "bg-pink-500", 
      glowColor: "shadow-pink-500/50",
      textColor: "text-pink-500",
      icon: Search,
      duration: 1200
    },
    { 
      text: "Finding family connections", 
      color: "bg-amber-500", 
      glowColor: "shadow-amber-500/50",
      textColor: "text-amber-500",
      icon: Users,
      duration: 1600
    },
    { 
      text: "Analyzing memorial notices", 
      color: "bg-emerald-500", 
      glowColor: "shadow-emerald-500/50",
      textColor: "text-emerald-500",
      icon: BookOpen,
      duration: 1300
    },
    { 
      text: "Gathering public records", 
      color: "bg-teal-500", 
      glowColor: "shadow-teal-500/50",
      textColor: "text-teal-500",
      icon: FileCheck,
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
    <div className="max-w-4xl mx-auto bg-gray-900 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.2)] p-8 transition-all duration-300 animate-fade-in border border-gray-800">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Searching for {firstName || ''} {lastName || ''}
        </h2>
        <div className="relative h-12 w-12 flex items-center justify-center">
          <div className="absolute inset-0 bg-brand-600/20 rounded-full animate-pulse"></div>
          <div className="h-10 w-10 rounded-full border-2 border-brand-600/30 border-t-brand-500 animate-spin"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-6 gap-4">
        {searchSteps.map((step, index) => {
          const StepIcon = step.icon;
          const isActive = index === currentStep;
          const isCompleted = completedSteps.includes(index);
          
          return (
            <div key={index} className="flex flex-col items-center justify-start">
              <div className={`
                relative flex h-14 w-14 items-center justify-center rounded-full mb-3
                transition-all duration-500
                ${isCompleted ? 'bg-opacity-20 bg-gray-800' : isActive ? 'bg-opacity-10 bg-gray-800' : 'bg-gray-800/5'}
                ${isCompleted || isActive ? 'shadow-lg ' + step.glowColor : ''}
              `}>
                {isCompleted ? (
                  <CheckCircle className={`h-8 w-8 ${step.textColor} animate-scale-in`} />
                ) : (
                  <>
                    <div className={`
                      absolute inset-0 rounded-full 
                      ${isActive ? 'animate-ping opacity-30 ' + step.color : 'opacity-0'}
                    `}></div>
                    <StepIcon className={`h-7 w-7 ${isActive ? step.textColor + ' animate-pulse' : 'text-gray-500'}`} />
                  </>
                )}
              </div>
              
              <div className={`h-1.5 w-full relative ${isActive || isCompleted ? step.color : 'bg-gray-800'} rounded-full overflow-hidden`}>
                {isActive && (
                  <span className={`
                    absolute inset-0 ${step.color}
                    animate-pulse opacity-70
                  `}></span>
                )}
              </div>
              
              <span className={`
                text-xs font-medium mt-2 text-center
                ${isCompleted ? 'text-white' : isActive ? step.textColor : 'text-gray-500'}
              `}>
                {step.text}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="mt-10 pt-6 border-t border-gray-800">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">
            <span className="text-brand-400">AI-powered</span> search across 100+ million records
          </p>
          <div className="bg-gray-800 text-brand-300 text-sm font-medium rounded-full px-4 py-1.5 flex items-center">
            <div className="mr-2 h-2 w-2 rounded-full bg-brand-400 animate-pulse"></div>
            {Math.min(completedSteps.length, searchSteps.length)} of {searchSteps.length} searches complete
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchingAnimation;
