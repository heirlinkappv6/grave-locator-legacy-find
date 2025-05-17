
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-10">
          <Link to="/" className="text-2xl font-bold text-brand-700">
            <span className="text-brand-700">Memorial</span>
            <span className="text-brand-500">Records</span>
          </Link>
          
          <nav className="hidden md:flex">
            <ul className="flex space-x-6">
              <li><Link to="/" className="text-gray-600 hover:text-brand-600">Home</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-brand-600">About</Link></li>
              <li><Link to="/services" className="text-gray-600 hover:text-brand-600">Our Services</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-brand-600">Contact</Link></li>
            </ul>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="hidden md:inline-flex">Log in</Button>
          <Button className="bg-brand-600 hover:bg-brand-700">Sign Up</Button>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
