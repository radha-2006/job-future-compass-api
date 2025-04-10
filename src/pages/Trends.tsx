
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTrends, fetchJobs } from '@/services/api';
import Navbar from '@/components/Navbar';
import TrendChart from '@/components/TrendChart';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Trends = () => {
  const { data: trends, isLoading: isLoadingTrends } = useQuery({
    queryKey: ['trends'],
    queryFn: fetchTrends
  });
  
  const { data: jobs } = useQuery({
    queryKey: ['allJobs'],
    queryFn: fetchJobs
  });
  
  // Create forecast data (this would come from a real API in a production app)
  const forecastData = [
    { year: 2025, jobs: 100 },
    { year: 2026, jobs: 130 },
    { year: 2027, jobs: 170 },
    { year: 2028, jobs: 220 },
    { year: 2029, jobs: 280 },
    { year: 2030, jobs: 350 }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Industry Trends</h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-3xl">
            Stay ahead of the curve with our analysis of emerging job markets and industry growth trends.
            These insights can help guide your career planning and skill development.
          </p>
          
          {isLoadingTrends ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                <TrendChart 
                  data={trends || []} 
                  title="Job Growth by Category (%)"
                  type="bar"
                  dataKey="growthRate"
                />
                <TrendChart 
                  data={trends || []} 
                  title="Current Job Distribution"
                  type="pie"
                  dataKey="jobs"
                />
              </div>
              
              <Card className="future-card w-full mb-10">
                <CardHeader>
                  <CardTitle className="text-lg">Projected Growth (2025-2030)</CardTitle>
                </CardHeader>
                <CardContent className="p-4 h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={forecastData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis 
                        dataKey="year" 
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => `${value}k`}
                      />
                      <Tooltip 
                        formatter={(value) => [`${value}k jobs`, 'Projected']}
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                          borderRadius: '8px',
                          border: 'none',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="jobs" 
                        stroke="#6366f1" 
                        fill="url(#colorJobs)" 
                        strokeWidth={2}
                      />
                      <defs>
                        <linearGradient id="colorJobs" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {trends?.slice(0, 3).map((trend, index) => (
                  <Card key={index} className="future-card">
                    <CardHeader>
                      <CardTitle className="text-md">{trend.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Growth Rate</p>
                          <p className="text-2xl font-bold text-green-600">{trend.growthRate}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Current Jobs (thousands)</p>
                          <p className="text-2xl font-bold">{trend.jobs}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Key Factors</p>
                          <p className="text-sm">Technological advancement, market demand, industry transformation</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trends;
