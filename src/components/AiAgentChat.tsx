
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';
import { Bot, Send, User, Settings, Github } from 'lucide-react';
import { AgentMessage, generateId, searchJobsWithAI, checkRequiredApiKeys, getMissingApiKeys } from '@/services/aiAgent';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const AiAgentChat: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<AgentMessage[]>([
    {
      id: generateId(),
      content: 'Hi! I\'m your Future Job Finder assistant. I can help you discover emerging tech careers based on your skills and interests. What kind of tech career are you interested in exploring?',
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [apiKeysConfigured, setApiKeysConfigured] = useState<boolean>(checkRequiredApiKeys());

  // Scroll to the bottom of the chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Check if required API keys are configured
  useEffect(() => {
    const hasRequiredKeys = checkRequiredApiKeys();
    setApiKeysConfigured(hasRequiredKeys);
    
    if (!hasRequiredKeys) {
      const missingKeys = getMissingApiKeys();
      toast({
        title: "API Keys Required",
        description: `Please configure ${missingKeys.join(', ')} in settings to use the AI assistant.`,
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    if (!apiKeysConfigured) {
      toast({
        title: "API Keys Required",
        description: "Please configure required API keys in settings first.",
        variant: "destructive",
      });
      return;
    }
    
    // Add user message
    const userMessage: AgentMessage = {
      id: generateId(),
      content: input,
      role: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Get AI response
      const response = await searchJobsWithAI(input, messages);
      
      // Add AI response
      const aiMessage: AgentMessage = {
        id: generateId(),
        content: response,
        role: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast({
        title: "AI Response Error",
        description: error instanceof Error ? error.message : "Failed to get response from AI",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="px-4 py-3 border-b flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          Open Source AI Assistant
        </CardTitle>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Github className="h-4 w-4" />
                Open Source
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Open Source AI Agent</DialogTitle>
                <DialogDescription>
                  This AI assistant is completely open source and licensed under the MIT License.
                  You can modify, distribute, and use the code for your own projects.
                  The agent connects to various LLM APIs like Google's Gemini and is designed
                  to be easily extensible for adding new AI providers.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <h4 className="font-medium">Features:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Open source implementation</li>
                  <li>Multiple AI provider support</li>
                  <li>Conversation management</li>
                  <li>Customizable prompts</li>
                  <li>MIT licensed</li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  This project uses the Gemini API by default, but you can modify the code to use
                  other providers like OpenAI, Hugging Face, or Pinecone.
                </p>
              </div>
            </DialogContent>
          </Dialog>
          
          {!apiKeysConfigured && (
            <Button variant="outline" size="sm" asChild>
              <Link to="/settings" className="flex items-center gap-1">
                <Settings className="h-4 w-4" />
                Configure API Keys
              </Link>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-grow overflow-hidden">
        <ScrollArea className="h-full max-h-[400px] p-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex mb-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <Avatar className={`h-8 w-8 ${message.role === 'assistant' ? 'bg-primary' : 'bg-secondary'}`}>
                  {message.role === 'assistant' ? (
                    <Bot className="h-4 w-4 text-white" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </Avatar>
                <div 
                  className={`rounded-lg px-4 py-2 ${
                    message.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-3 border-t">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about future tech careers..."
            disabled={isLoading || !apiKeysConfigured}
            className="flex-grow"
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={isLoading || !apiKeysConfigured}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default AiAgentChat;
