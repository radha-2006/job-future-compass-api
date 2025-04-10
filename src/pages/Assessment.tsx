
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchSkillAssessment, fetchJobs } from '@/services/api';
import Navbar from '@/components/Navbar';
import SkillsRadar from '@/components/SkillsRadar';
import JobCard from '@/components/JobCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/components/ui/use-toast';
import { Job } from '@/services/api';

const SkillLevelLabels = [
  "Beginner",
  "Basic",
  "Intermediate",
  "Competent",
  "Proficient",
  "Advanced",
  "Expert",
  "Master",
  "Specialist",
  "Thought Leader"
];

const Assessment = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [skills, setSkills] = useState({
    'Programming': 1,
    'Data Analysis': 1,
    'UX Design': 1,
    'Machine Learning': 1,
    'Ethics': 1
  });

  const skillsList = Object.entries(skills);
  
  // For demo purposes, we'll use the API data eventually
  const { data: skillsAssessment, isLoading: isLoadingSkills } = useQuery({
    queryKey: ['skillsAssessment'],
    queryFn: fetchSkillAssessment
  });
  
  const { data: allJobs, isLoading: isLoadingJobs } = useQuery({
    queryKey: ['allJobs'],
    queryFn: fetchJobs
  });

  const handleSkillChange = (skill: string, value: number[]) => {
    setSkills(prev => ({
      ...prev,
      [skill]: value[0]
    }));
  };

  const handleSubmit = () => {
    setCurrentStep(1);
    toast({
      title: "Assessment Completed",
      description: "Your skills have been analyzed to find matching career paths.",
    });
  };

  // Find jobs that match user's skills (this would be more sophisticated in a real app)
  const getMatchingJobs = (): Job[] => {
    if (!allJobs) return [];
    
    const topSkills = Object.entries(skills)
      .sort(([, valueA], [, valueB]) => valueB - valueA)
      .slice(0, 2)
      .map(([skill]) => skill.toLowerCase());
    
    return allJobs.filter(job => 
      job.requiredSkills.some(skill => 
        topSkills.some(userSkill => 
          skill.toLowerCase().includes(userSkill.toLowerCase())
        )
      )
    ).slice(0, 3);
  };

  const matchingJobs = getMatchingJobs();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Skills Assessment</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-3xl">
            Rate your proficiency in various skills to discover future career paths that align with your strengths.
          </p>
          
          {currentStep === 0 ? (
            <Card className="future-card mb-8">
              <CardHeader>
                <CardTitle>Rate Your Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {skillsList.map(([skill, value]) => (
                    <div key={skill} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium">{skill}</label>
                        <Badge variant="outline">{SkillLevelLabels[value - 1]}</Badge>
                      </div>
                      <Slider
                        defaultValue={[value]}
                        max={10}
                        min={1}
                        step={1}
                        onValueChange={(value) => handleSkillChange(skill, value)}
                      />
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 flex justify-end">
                  <Button onClick={handleSubmit}>
                    Complete Assessment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : isLoadingJobs || isLoadingSkills ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <SkillsRadar skills={skillsAssessment || []} />
                
                <Card className="future-card mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Your Top Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(skills)
                        .sort(([, a], [, b]) => b - a)
                        .slice(0, 3)
                        .map(([skill, level], index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="font-medium">{skill}</span>
                            <Badge>{SkillLevelLabels[level - 1]}</Badge>
                          </div>
                        ))
                      }
                    </div>
                  </CardContent>
                </Card>
                
                <div className="mt-6">
                  <Button onClick={() => setCurrentStep(0)} variant="outline" className="w-full">
                    Retake Assessment
                  </Button>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <h2 className="text-xl font-bold mb-4">Recommended Career Paths</h2>
                <div className="space-y-6">
                  {matchingJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessment;
