
import React from 'react';
import Navbar from './Navbar';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavbarWrapperProps {
  showSettingsButton?: boolean;
}

const NavbarWrapper: React.FC<NavbarWrapperProps> = ({ showSettingsButton = true }) => {
  return (
    <div className="relative">
      <Navbar />
      {showSettingsButton && (
        <div className="absolute top-4 right-4 md:right-8">
          <Button variant="outline" size="icon" asChild>
            <Link to="/settings" title="Settings">
              <Settings className="h-[1.2rem] w-[1.2rem]" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default NavbarWrapper;
