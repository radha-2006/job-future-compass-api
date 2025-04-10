
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Job } from '@/services/api';
import { ArrowUpRight, Briefcase } from 'lucide-react';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <Card className="future-card h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{job.title}</CardTitle>
            <CardDescription className="text-sm mt-1">{job.category}</CardDescription>
          </div>
          <div className="bg-primary/10 p-2 rounded-full">
            <Briefcase className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{job.description}</p>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-secondary/50 p-2 rounded-md">
            <p className="text-xs text-gray-500 dark:text-gray-400">Median Salary</p>
            <p className="text-sm font-semibold">{job.medianSalary}</p>
          </div>
          <div className="bg-secondary/50 p-2 rounded-md">
            <p className="text-xs text-gray-500 dark:text-gray-400">Growth Rate</p>
            <p className="text-sm font-semibold text-green-600">{job.growthRate}</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs mb-2 text-gray-500 dark:text-gray-400">Required Skills:</p>
          <div className="flex flex-wrap gap-1">
            {job.requiredSkills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
            {job.requiredSkills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{job.requiredSkills.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t border-gray-100 dark:border-gray-800">
        <button 
          className="w-full flex items-center justify-center space-x-2 py-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
        >
          <span>View Details</span>
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
