
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import NavbarWrapper from "@/components/NavbarWrapper";
import AiAgentChat from '@/components/AiAgentChat';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarWrapper />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 flex flex-col">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 future-gradient-text">
            Discover Your Future in Tech
          </h1>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Explore emerging careers, analyze industry trends, and assess your skills to prepare for the next wave of technological innovation.
          </p>
        </div>

        <Tabs defaultValue="assistant" className="w-full max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="explore">Explore Options</TabsTrigger>
            <TabsTrigger value="assistant">Open Source AI Assistant</TabsTrigger>
          </TabsList>
          
          <TabsContent value="explore" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-10">
              <Link to="/jobs" className="block">
                <div className="future-card p-6 h-full flex flex-col items-center">
                  <h2 className="text-2xl font-bold mb-4">Explore Jobs</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Discover emerging careers in technology with detailed insights on requirements and growth potential.
                  </p>
                  <Button className="mt-auto">Browse Jobs</Button>
                </div>
              </Link>
              
              <Link to="/trends" className="block">
                <div className="future-card p-6 h-full flex flex-col items-center">
                  <h2 className="text-2xl font-bold mb-4">Industry Trends</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Stay ahead with real-time analysis of emerging tech fields and their projected growth.
                  </p>
                  <Button className="mt-auto">View Trends</Button>
                </div>
              </Link>
              
              <Link to="/assessment" className="block">
                <div className="future-card p-6 h-full flex flex-col items-center">
                  <h2 className="text-2xl font-bold mb-4">Skill Assessment</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Evaluate your current skills and discover which future careers align with your expertise.
                  </p>
                  <Button className="mt-auto">Start Assessment</Button>
                </div>
              </Link>
            </div>
            
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-lg text-gray-600 dark:text-gray-300">
                The future of work is evolving rapidly. Stay ahead of the curve with our AI-powered insights and personalized recommendations.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="assistant" className="mt-0">
            <div className="max-w-3xl mx-auto">
              <div className="mb-4 text-center">
                <h2 className="text-2xl font-bold">Open Source AI Career Assistant</h2>
                <p className="text-muted-foreground">
                  Our AI assistant is built on open source technology. You can modify, extend, and contribute to its development.
                </p>
              </div>
              <AiAgentChat />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
