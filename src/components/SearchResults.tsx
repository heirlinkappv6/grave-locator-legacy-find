import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import PaywallOverlay from './PaywallOverlay';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { FileText, Users } from 'lucide-react';

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

// Mock data for potential heirs
const mockHeirs = [
  { id: 101, name: "Mary Smith", relationship: "Spouse", age: 76, location: "Portland, Oregon", status: "Living" },
  { id: 102, name: "Robert Smith", relationship: "Son", age: 48, location: "Seattle, Washington", status: "Living" },
  { id: 103, name: "Sarah Johnson", relationship: "Daughter", age: 46, location: "Portland, Oregon", status: "Living" },
  { id: 104, name: "Elizabeth Smith", relationship: "Sister", age: 75, location: "San Diego, California", status: "Deceased" },
  { id: 105, name: "Thomas Smith", relationship: "Brother", age: 80, location: "Phoenix, Arizona", status: "Living" }
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
  const [selectedResult, setSelectedResult] = useState(mockResults[0]);
  
  const viewDetails = (id: number) => {
    navigate(`/record/${id}`);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Search Results</h1>
      <p className="mb-6 text-gray-600">
        Showing results for {firstName || ''} {lastName || ''} 
        {city && ` in ${city}`}{state && `, ${state}`}
      </p>
      
      {/* Deceased Person Information Card */}
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-brand-600 mr-2" />
            <CardTitle className="text-xl">Primary Match</CardTitle>
          </div>
          <div className="bg-green-50 text-green-800 font-medium px-3 py-1 rounded-full text-sm">
            {selectedResult.matchScore}% Match
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold mb-2">{selectedResult.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 mb-4">
                <div>
                  <span className="text-gray-600">Age:</span> {selectedResult.age}
                </div>
                <div>
                  <span className="text-gray-600">Born:</span> {selectedResult.dob}
                </div>
                <div>
                  <span className="text-gray-600">Died:</span> {selectedResult.dod}
                </div>
                <div>
                  <span className="text-gray-600">Last Residence:</span> {selectedResult.lastResidence}
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center lg:items-end">
              <Button 
                onClick={() => viewDetails(selectedResult.id)}
                className="bg-brand-600 hover:bg-brand-700 w-full lg:w-auto mb-2"
              >
                View Full Record
              </Button>
              <p className="text-xs text-gray-500 text-center">
                Pay $7.00 for this record only
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Potential Heirs Section */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Users className="h-5 w-5 text-brand-600 mr-2" />
          <h2 className="text-xl font-bold">Potential Heirs</h2>
        </div>
        
        <Card>
          <CardContent className="p-0 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Relationship</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockHeirs.slice(0, 1).map((heir) => (
                  <TableRow key={heir.id}>
                    <TableCell className="font-medium">{heir.name}</TableCell>
                    <TableCell>{heir.relationship}</TableCell>
                    <TableCell>{heir.age}</TableCell>
                    <TableCell>{heir.location}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${heir.status === 'Living' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {heir.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
                {!showFull && mockHeirs.slice(1).map((heir, index) => (
                  <TableRow key={heir.id} className="bg-gray-50/50">
                    <TableCell colSpan={5} className="text-center py-2">
                      <span className="text-gray-400">••••••••••••••••••••••••••••••••••</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <div className="mt-2 text-center text-sm text-gray-500">
          Subscribe to see complete list of {mockHeirs.length} potential heirs
        </div>
      </div>
      
      {/* Paywall */}
      {!showFull && (
        <div id="paywall">
          <PaywallOverlay />
        </div>
      )}
      
      {/* Other Results */}
      <h2 className="text-xl font-bold mt-10 mb-4">Other Possible Matches</h2>
      <div className="space-y-6">
        {mockResults.slice(1).map((result) => (
          <Card key={result.id} className="result-card">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{result.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 mb-3">
                    <div>
                      <span className="text-gray-600">Age:</span> {result.age}
                    </div>
                    <div className="text-gray-400">
                      <span className="text-gray-600">Died:</span> ••••••••••••••
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 md:ml-6 flex items-center">
                  <div className="bg-green-50 text-green-800 font-medium px-3 py-1 rounded-full text-sm mr-4">
                    {result.matchScore}% Match
                  </div>
                  <Button 
                    onClick={() => viewDetails(result.id)}
                    variant="outline"
                    className="border-brand-600 text-brand-600 hover:bg-brand-50"
                  >
                    View Record
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="bg-gray-50 border rounded-lg p-6 my-8">
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
