
import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-future-gradient flex items-center justify-center">
            <span className="text-white font-bold text-xl">JF</span>
          </div>
          <span className="text-xl font-bold future-gradient-text">Future Jobs</span>
        </Link>
        
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/jobs" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
            Jobs
          </Link>
          <Link to="/trends" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
            Trends
          </Link>
          <Link to="/assessment" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
            Skills Assessment
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" className="rounded-full">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
