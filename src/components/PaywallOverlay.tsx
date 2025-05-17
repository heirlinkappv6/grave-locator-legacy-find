
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const PaywallOverlay = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 my-8 border-2 border-brand-600">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Full Access Required</h2>
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <p className="font-medium text-lg mb-2">What you get with full access:</p>
          <ul className="text-left space-y-2 mb-4">
            <li className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Complete death records and dates
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Full obituary information
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Comprehensive list of relatives
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Last known addresses
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Unlimited searches
            </li>
          </ul>
        </div>
        
        {/* Single Record Option */}
        <div className="border rounded-lg p-4 hover:shadow-md transition mb-6">
          <h3 className="text-xl font-semibold text-brand-600">Single Record Access</h3>
          <p className="text-3xl font-bold my-3">$7.00</p>
          <p className="text-gray-500 text-sm mb-4">Access just this one record</p>
          <Button className="w-full bg-brand-600 hover:bg-brand-700">
            Pay Per Record
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="border rounded-lg p-4 hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-brand-600">1 Month Access</h3>
            <p className="text-3xl font-bold my-3">$24.99</p>
            <p className="text-gray-500 text-sm mb-4">Single payment, cancel anytime</p>
            <Button className="w-full bg-brand-600 hover:bg-brand-700">
              Subscribe Monthly
            </Button>
          </div>
          
          <div className="border-2 border-brand-600 rounded-lg p-4 relative hover:shadow-md transition">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-600 text-white text-xs font-bold py-1 px-3 rounded-full">
              BEST VALUE
            </div>
            <h3 className="text-xl font-semibold text-brand-600">3 Month Access</h3>
            <p className="text-3xl font-bold my-3">$49.99</p>
            <p className="text-gray-500 text-sm mb-4">Save 33% ($16.66/month)</p>
            <Button className="w-full bg-brand-600 hover:bg-brand-700">
              Subscribe Quarterly
            </Button>
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-500">
          <p>By subscribing, you agree to our <Link to="/terms" className="text-brand-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-brand-600 hover:underline">Privacy Policy</Link>.</p>
          <p className="mt-2">Questions? <Link to="/contact" className="text-brand-600 hover:underline">Contact Support</Link></p>
        </div>
      </div>
    </div>
  );
};

export default PaywallOverlay;
