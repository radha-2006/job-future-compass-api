import { getApiKey } from './apiKeys';

export type AgentMessage = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
};

export type AgentState = {
  messages: AgentMessage[];
  isLoading: boolean;
  error: string | null;
};

// Function to generate a unique ID for messages
export const generateId = () => Math.random().toString(36).substring(2, 9);

// Function to check if required API keys are available
export const checkRequiredApiKeys = (): boolean => {
  const geminiKey = getApiKey('gemini');
  return !!geminiKey;
};

// Function to get missing API key names
export const getMissingApiKeys = (): string[] => {
  const missingKeys = [];
  
  if (!getApiKey('gemini')) {
    missingKeys.push('Google Gemini API');
  }
  
  return missingKeys;
};

// Function to send a message to the Gemini API
export const sendMessageToGemini = async (messages: AgentMessage[], query: string): Promise<string> => {
  const apiKey = getApiKey('gemini');
  
  if (!apiKey) {
    throw new Error('Gemini API key is not configured');
  }
  
  try {
    // Format conversation history for Gemini
    const formattedMessages = messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));
    
    // Add the new user message
    formattedMessages.push({
      role: 'user',
      parts: [{ text: query }]
    });
    
    // Send request to Gemini API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: formattedMessages,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to get response from Gemini API');
    }
    
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
};

// Sample agent for searching jobs based on skills
export const searchJobsWithAI = async (query: string, history: AgentMessage[] = []): Promise<string> => {
  try {
    const systemPrompt: AgentMessage = {
      id: generateId(),
      content: "You are an AI career assistant in the Future Job Finder app. Help users explore emerging tech careers based on their skills and interests. Provide specific job recommendations from our database and relevant skill development advice.",
      role: 'assistant',
      timestamp: new Date()
    };
    
    const allMessages = [systemPrompt, ...history];
    return await sendMessageToGemini(allMessages, query);
  } catch (error) {
    console.error('Error in AI job search:', error);
    throw error;
  }
};
