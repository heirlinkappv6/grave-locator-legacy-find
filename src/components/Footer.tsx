
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">MemorialRecords</h3>
            <p className="text-gray-600 mb-4">
              Helping families find information about their loved ones since 2025.
            </p>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} MemorialRecords. All rights reserved.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-gray-600 hover:text-brand-600">Obituary Search</Link></li>
              <li><Link to="/services" className="text-gray-600 hover:text-brand-600">Death Records</Link></li>
              <li><Link to="/services" className="text-gray-600 hover:text-brand-600">Family Tree Research</Link></li>
              <li><Link to="/services" className="text-gray-600 hover:text-brand-600">Ancestry Research</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-brand-600">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-brand-600">Contact Us</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-brand-600">Careers</Link></li>
              <li><Link to="/press" className="text-gray-600 hover:text-brand-600">Press</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-600 hover:text-brand-600">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-brand-600">Terms of Service</Link></li>
              <li><Link to="/cookies" className="text-gray-600 hover:text-brand-600">Cookie Policy</Link></li>
              <li><Link to="/disclaimer" className="text-gray-600 hover:text-brand-600">Legal Disclaimer</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-gray-500 text-sm">
            This site is not a consumer reporting agency as defined by the Fair Credit Reporting Act (FCRA).
            The information available on our website cannot be used for employment, credit, tenant screening,
            or any purpose covered by the FCRA.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
