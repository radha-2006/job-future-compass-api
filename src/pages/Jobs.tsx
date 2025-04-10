
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { searchJobs, fetchJobs, Job } from '@/services/api';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import JobCard from '@/components/JobCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import CategoryFilters from '@/components/CategoryFilters';

const Jobs = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('query') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const { data: allJobs, isLoading: isLoadingAllJobs } = useQuery({
    queryKey: ['allJobs'],
    queryFn: fetchJobs
  });
  
  const { data: searchResults, isLoading: isLoadingSearch, refetch } = useQuery({
    queryKey: ['searchJobs', searchQuery],
    queryFn: () => searchJobs(searchQuery),
    enabled: searchQuery !== ''
  });
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  useEffect(() => {
    if (searchQuery) {
      refetch();
    }
  }, [searchQuery, refetch]);
  
  const jobs = searchQuery ? searchResults : allJobs;
  const isLoading = searchQuery ? isLoadingSearch : isLoadingAllJobs;
  
  // Get unique categories from jobs
  const categories = jobs ? [...new Set(jobs.map(job => job.category))] : [];
  
  // Filter jobs by selected category
  const filteredJobs = jobs 
    ? (selectedCategory 
        ? jobs.filter(job => job.category === selectedCategory) 
        : jobs)
    : [];
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Explore Future Jobs</h1>
          
          <div className="mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          {!isLoading && categories.length > 0 && (
            <div className="mb-8">
              <CategoryFilters 
                categories={categories} 
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>
          )}
          
          {isLoading ? (
            <LoadingSpinner />
          ) : filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job: Job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search query or filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
