import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import PaywallOverlay from './PaywallOverlay';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { FileText, Users } from 'lucide-react';

// Remove mockResults and mockHeirs

type SearchResultsProps = {
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
};

type RecordType = {
  _id?: string;
  name: string;
  birthDate?: string;
  deathDate?: string;
  cemetery?: string;
  location?: string;
  relatives?: string[];
  source?: string;
};

const SearchResults: React.FC<SearchResultsProps> = ({ firstName, lastName, city, state }) => {
  const navigate = useNavigate();
  const [results, setResults] = useState<RecordType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Compose name and location for backend
  const name = [firstName, lastName].filter(Boolean).join(' ').trim();
  const location = [city, state].filter(Boolean).join(', ').trim();

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:3000/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, location }),
        });
        const data = await response.json();
        setResults(data.results || []);
      } catch (err) {
        setError('Failed to fetch results.');
      } finally {
        setLoading(false);
      }
    };
    if (name && location) fetchResults();
    else setLoading(false);
  }, [name, location]);

  const viewDetails = (id: string) => {
    navigate(`/record/${id}`);
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center text-lg">Loading search results...</div>;
  }
  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-600">{error}</div>;
  }
  if (!results.length) {
    return <div className="container mx-auto px-4 py-8 text-center">No results found for your search.</div>;
  }

  // For demonstration, treat the first result as the primary match, rest as others
  const [primary, ...others] = results;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2 text-brand-700">Search Results</h1>
      <p className="mb-6 text-gray-600">
        Showing results for {name} {location && `in ${location}`}
      </p>

      {/* Deceased Person Information Card */}
      {primary && (
        <Card className="mb-6 overflow-hidden border-none shadow-lg bg-gradient-to-r from-white to-gray-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b bg-white">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-brand-600 mr-2" />
              <CardTitle className="text-xl">Primary Match</CardTitle>
            </div>
            <div className="bg-green-100 text-green-800 font-medium px-3 py-1 rounded-full text-sm shadow-sm">
              {/* No matchScore in live data, so just show 'Live Data' */}
              Live Data
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h3 className="text-xl font-semibold mb-2 text-brand-700">{primary.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 font-medium">Born:</span>
                    <span className="bg-gray-50 px-2 py-1 rounded">{primary.birthDate || '-'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 font-medium">Died:</span>
                    <span className="bg-gray-50 px-2 py-1 rounded">{primary.deathDate || '-'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 font-medium">Cemetery:</span>
                    <span className="bg-gray-50 px-2 py-1 rounded">{primary.cemetery || '-'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 font-medium">Location:</span>
                    <span className="bg-gray-50 px-2 py-1 rounded">{primary.location || '-'}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600 font-medium">Relatives:</span>
                  <span className="bg-gray-50 px-2 py-1 rounded">{primary.relatives?.join(', ') || '-'}</span>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center lg:items-end">
                <Button 
                  onClick={() => viewDetails(primary._id || '')}
                  className="bg-brand-600 hover:bg-brand-700 w-full lg:w-auto mb-2 shadow-md shadow-brand-100 transition-all hover:translate-y-[-1px]"
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
      )}

      {/* Other Results */}
      {others.length > 0 && (
        <>
          <h2 className="text-xl font-bold mt-10 mb-4 text-brand-700">Other Possible Matches</h2>
          <div className="space-y-4">
            {others.map((result) => (
              <Card key={result._id} className="border-none shadow-md hover:shadow-lg transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-brand-700">{result.name}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 mb-3">
                        <div>
                          <span className="text-gray-600">Born:</span> {result.birthDate || '-'}
                        </div>
                        <div>
                          <span className="text-gray-600">Died:</span> {result.deathDate || '-'}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6 flex items-center">
                      <div className="bg-green-100 text-green-800 font-medium px-3 py-1 rounded-full text-sm mr-4 shadow-sm">
                        Live Data
                      </div>
                      <Button 
                        onClick={() => viewDetails(result._id || '')}
                        variant="outline"
                        className="border-brand-600 text-brand-600 hover:bg-brand-50 shadow-sm transition-all hover:shadow"
                      >
                        View Record
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      <div className="bg-gray-50 border rounded-lg p-6 my-8 shadow-md">
        <h3 className="text-lg font-semibold mb-3 text-brand-700">Not finding who you're looking for?</h3>
        <p className="mb-4">Try refining your search with more specific information or alternative spellings.</p>
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="border-brand-600 text-brand-600 hover:bg-brand-50 shadow-sm"
        >
          Start New Search
        </Button>
      </div>
    </div>
  );
};

export default SearchResults;
