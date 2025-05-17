
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import PaywallOverlay from './PaywallOverlay';

// Mock data for search results
const mockResults = [
  {
    id: 1,
    name: "James Robert Smith",
    age: 78,
    dob: "March 15, 1945",
    dod: "January 7, 2023",
    lastResidence: "Portland, Oregon",
    relatives: ["Mary Smith", "Robert Smith", "Sarah Johnson"],
    matchScore: 98
  },
  {
    id: 2,
    name: "James R. Smith",
    age: 67,
    dob: "September 3, 1955",
    dod: "October 12, 2022",
    lastResidence: "Seattle, Washington",
    relatives: ["Patricia Smith", "Thomas Smith", "Jennifer Brown"],
    matchScore: 92
  },
  {
    id: 3,
    name: "James Smith Jr.",
    age: 85,
    dob: "June 22, 1937",
    dod: "May 30, 2022",
    lastResidence: "San Francisco, California",
    relatives: ["Elizabeth Smith", "James Smith III", "Michael Smith"],
    matchScore: 87
  },
  {
    id: 4,
    name: "J.R. Smith",
    age: 72,
    dob: "April 11, 1950",
    dod: "December 19, 2022",
    lastResidence: "Chicago, Illinois",
    relatives: ["Susan Smith", "David Smith", "Karen Miller"],
    matchScore: 82
  }
];

type SearchResultsProps = {
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
};

const SearchResults: React.FC<SearchResultsProps> = ({ firstName, lastName, city, state }) => {
  const navigate = useNavigate();
  const [showFull, setShowFull] = useState(false);
  
  const viewDetails = (id: number) => {
    if (showFull) {
      navigate(`/record/${id}`);
    } else {
      // If not subscribed, scroll to paywall
      const paywallElement = document.getElementById('paywall');
      if (paywallElement) {
        paywallElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Search Results</h1>
      <p className="mb-6 text-gray-600">
        Showing results for {firstName || ''} {lastName || ''} 
        {city && ` in ${city}`}{state && `, ${state}`}
      </p>
      
      <div className="mb-8">
        {mockResults.map((result, index) => (
          <div key={result.id} className="result-card">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">{result.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 mb-4">
                  <div>
                    <span className="text-gray-600">Age:</span> {result.age}
                  </div>
                  {showFull || index === 0 ? (
                    <>
                      <div>
                        <span className="text-gray-600">Born:</span> {result.dob}
                      </div>
                      <div>
                        <span className="text-gray-600">Died:</span> {result.dod}
                      </div>
                      <div>
                        <span className="text-gray-600">Last Residence:</span> {result.lastResidence}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-gray-400">
                        <span className="text-gray-600">Born:</span> ••••••••••••••
                      </div>
                      <div className="text-gray-400">
                        <span className="text-gray-600">Died:</span> ••••••••••••••
                      </div>
                      <div className="text-gray-400">
                        <span className="text-gray-600">Last Residence:</span> ••••••••••••••
                      </div>
                    </>
                  )}
                </div>
                
                <div className="mb-4">
                  <span className="text-gray-600">Possible Relatives:</span>{" "}
                  {showFull || index === 0 ? (
                    result.relatives.join(", ")
                  ) : (
                    <span className="text-gray-400">•••••••••••••••••••••••</span>
                  )}
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 md:ml-6 md:text-right flex flex-col justify-between">
                <div className="bg-green-50 text-green-800 font-medium px-3 py-1 rounded-full inline-block mb-4 md:ml-auto">
                  {result.matchScore}% Match
                </div>
                
                <Button 
                  onClick={() => viewDetails(result.id)}
                  className="bg-brand-600 hover:bg-brand-700"
                >
                  View Details
                </Button>
              </div>
            </div>
            {!showFull && index === 0 && (
              <div className="mt-4 pt-4 border-t border-dashed border-gray-300 text-center text-sm text-gray-500">
                This is a preview. Subscribe to see all details for this record and unlock all other records.
              </div>
            )}
          </div>
        ))}
      </div>
      
      {!showFull && (
        <div id="paywall">
          <PaywallOverlay />
        </div>
      )}
      
      <div className="bg-gray-50 border rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-3">Not finding who you're looking for?</h3>
        <p className="mb-4">Try refining your search with more specific information or alternative spellings.</p>
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="border-brand-600 text-brand-600 hover:bg-brand-50"
        >
          Start New Search
        </Button>
      </div>
    </div>
  );
};

export default SearchResults;
