
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lastName) return;
    
    setSearching(true);
    
    // Simulate search process
    setTimeout(() => {
      setSearching(false);
      navigate('/results', { 
        state: { 
          firstName, 
          lastName, 
          city, 
          state 
        } 
      });
    }, 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-search">
      <h2 className="text-2xl font-bold mb-6 text-center">Search Death Records & Obituaries</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
            <Input
              id="lastName"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City (Optional)</Label>
            <Input
              id="city"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="state">State (Optional)</Label>
            <Input
              id="state"
              placeholder="Enter state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-brand-600 hover:bg-brand-700 py-6 text-lg font-medium" 
          disabled={!lastName || searching}
        >
          {searching ? 'Searching...' : 'Search Records'}
        </Button>
        
        <p className="text-center text-sm text-gray-500">
          By clicking "Search Records", you agree to our Terms of Service and Privacy Policy.
        </p>
      </form>
    </div>
  );
};

export default SearchForm;
