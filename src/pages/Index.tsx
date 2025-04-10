
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchJobs, fetchTrends } from '@/services/api';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import JobCard from '@/components/JobCard';
import TrendChart from '@/components/TrendChart';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, LineChart, Brain } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: jobs, isLoading: isLoadingJobs } = useQuery({
    queryKey: ['featuredJobs'],
    queryFn: fetchJobs
  });
  
  const { data: trends, isLoading: isLoadingTrends } = useQuery({
    queryKey: ['trends'],
    queryFn: fetchTrends
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    navigate(`/jobs?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative">
        <div className="absolute inset-0 bg-future-gradient opacity-5 z-0"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover Your <span className="future-gradient-text">Future Career</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore emerging jobs and skills in technology that will shape the next decade of work
          </p>
          
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button className="future-button" onClick={() => navigate('/jobs')}>
              <Sparkles className="mr-2 h-4 w-4" />
              Explore Future Jobs
            </Button>
            <Button variant="outline" onClick={() => navigate('/assessment')}>
              <Brain className="mr-2 h-4 w-4" />
              Assess Your Skills
            </Button>
          </div>
        </div>
      </section>
      
      {/* Featured Jobs Section */}
      <section className="py-12 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Future Jobs</h2>
            <Button variant="ghost" onClick={() => navigate('/jobs')} className="text-primary">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          {isLoadingJobs ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs?.slice(0, 3).map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Trends Section */}
      <section className="py-12 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Industry Trends</h2>
            <Button variant="ghost" onClick={() => navigate('/trends')} className="text-primary">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          {isLoadingTrends ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TrendChart 
                data={trends || []} 
                title="Job Growth by Category (%)"
                type="bar"
                dataKey="growthRate"
              />
              <TrendChart 
                data={trends || []} 
                title="Job Distribution by Category"
                type="pie"
                dataKey="jobs"
              />
            </div>
          )}
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Why Use Future Jobs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="future-card p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Future-Focused</h3>
              <p className="text-gray-600 dark:text-gray-400">Discover emerging career paths that will be in high demand over the next decade.</p>
            </div>
            
            <div className="future-card p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Skills Assessment</h3>
              <p className="text-gray-600 dark:text-gray-400">Evaluate your current skills and get personalized future job recommendations.</p>
            </div>
            
            <div className="future-card p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Industry Trends</h3>
              <p className="text-gray-600 dark:text-gray-400">Stay informed about the fastest growing sectors and technology trends.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-future-gradient text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Future Career?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Start exploring the jobs of tomorrow and discover where your skills and interests align with emerging opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-white text-primary hover:bg-white/90" onClick={() => navigate('/jobs')}>
              Explore Jobs
            </Button>
            <Button variant="outline" className="text-white border-white hover:bg-white/10" onClick={() => navigate('/assessment')}>
              Take Skills Assessment
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-future-gradient flex items-center justify-center">
                  <span className="text-white font-bold text-sm">JF</span>
                </div>
                <span className="text-white font-bold ml-2">Future Jobs</span>
              </div>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            <p>&copy; 2025 Future Jobs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
