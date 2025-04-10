
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative">
        <Input
          className="w-full pl-10 pr-14 py-6 rounded-full border-gray-200 dark:border-gray-700 focus:border-primary"
          placeholder="Search for future jobs, skills, technologies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search className="h-5 w-5" />
        </div>
        <Button 
          type="submit"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full px-4 py-1.5 text-sm"
        >
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
