
import React, { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { apiServices, saveApiKey, getApiKey, removeApiKey, ApiServiceName } from "@/services/apiKeys";
import { ExternalLink, Key, Save, X, Info, Check, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [apiKeys, setApiKeys] = useState<Record<ApiServiceName, string>>({} as Record<ApiServiceName, string>);
  const [isLoading, setIsLoading] = useState<Record<ApiServiceName, boolean>>({} as Record<ApiServiceName, boolean>);
  const { toast } = useToast();

  // Load saved API keys on mount
  useEffect(() => {
    const savedKeys: Record<ApiServiceName, string> = {} as Record<ApiServiceName, string>;
    const loadingState: Record<ApiServiceName, boolean> = {} as Record<ApiServiceName, boolean>;
    
    apiServices.forEach(service => {
      const key = getApiKey(service.name) || '';
      savedKeys[service.name] = key;
      loadingState[service.name] = false;
    });
    
    setApiKeys(savedKeys);
    setIsLoading(loadingState);
  }, []);

  const handleSaveKey = (serviceName: ApiServiceName) => {
    try {
      setIsLoading(prev => ({ ...prev, [serviceName]: true }));
      saveApiKey(serviceName, apiKeys[serviceName]);
      
      toast({
        title: "API Key Saved",
        description: `Your ${serviceName} API key has been saved.`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error Saving API Key",
        description: `There was an error saving your ${serviceName} API key.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(prev => ({ ...prev, [serviceName]: false }));
    }
  };

  const handleRemoveKey = (serviceName: ApiServiceName) => {
    try {
      setIsLoading(prev => ({ ...prev, [serviceName]: true }));
      removeApiKey(serviceName);
      setApiKeys(prev => ({ ...prev, [serviceName]: '' }));
      
      toast({
        title: "API Key Removed",
        description: `Your ${serviceName} API key has been removed.`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error Removing API Key",
        description: `There was an error removing your ${serviceName} API key.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(prev => ({ ...prev, [serviceName]: false }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Configure your Future Job Finder Buddy with API keys for enhanced features
            </p>
          </div>

          <Alert className="mb-6 border-blue-400 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
            <Info className="h-4 w-4" />
            <AlertDescription className="ml-2">
              Your API keys are stored locally in your browser and never sent to our servers. 
              For better security, consider connecting to a secure backend service.
            </AlertDescription>
          </Alert>

          <div className="grid gap-6">
            {apiServices.map((service) => (
              <Card key={service.name} className="relative">
                {apiKeys[service.name] && (
                  <div className="absolute top-6 right-6">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800 flex items-center gap-1">
                      <Check className="h-3 w-3" /> Configured
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" /> {service.displayName}
                  </CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`api-key-${service.name}`}>API Key</Label>
                      <div className="flex gap-2">
                        <Input
                          id={`api-key-${service.name}`}
                          value={apiKeys[service.name] || ''}
                          onChange={(e) => setApiKeys(prev => ({ ...prev, [service.name]: e.target.value }))}
                          type="password"
                          placeholder={service.placeholderText}
                          className="flex-1"
                        />
                        <Button 
                          variant="outline"
                          size="icon"
                          onClick={() => window.open(service.docUrl, '_blank')}
                          title={`Visit ${service.displayName} documentation`}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => handleRemoveKey(service.name)}
                    disabled={!apiKeys[service.name] || isLoading[service.name]}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <X className="mr-2 h-4 w-4" /> Remove
                  </Button>
                  <Button
                    onClick={() => handleSaveKey(service.name)}
                    disabled={isLoading[service.name]}
                  >
                    <Save className="mr-2 h-4 w-4" /> Save
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
