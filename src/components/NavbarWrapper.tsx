
import React from 'react';
import Navbar from './Navbar';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface NavbarWrapperProps {
  showSettingsButton?: boolean;
}

const NavbarWrapper: React.FC<NavbarWrapperProps> = ({ showSettingsButton = true }) => {
  return (
    <div className="relative">
      <Navbar />
      {showSettingsButton && (
        <div className="absolute top-4 right-4 md:right-8">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" asChild>
                  <Link to="/settings">
                    <Settings className="h-[1.2rem] w-[1.2rem]" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Configure API Keys</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
};

export default NavbarWrapper;
