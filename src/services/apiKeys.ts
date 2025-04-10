
// This service manages API keys locally
// In a production application, these would be managed on a server

// Define types for supported API services
export type ApiServiceName = 'gemini' | 'pinecone' | 'openai' | 'huggingface';

export interface ApiKeyInfo {
  name: ApiServiceName;
  displayName: string;
  description: string;
  placeholderText: string;
  docUrl: string;
}

// Information about supported API services
export const apiServices: ApiKeyInfo[] = [
  {
    name: 'gemini',
    displayName: 'Google Gemini API',
    description: 'Access Google\'s Gemini large language models for AI features.',
    placeholderText: 'AIza...',
    docUrl: 'https://ai.google.dev/docs/gemini-api/overview'
  },
  {
    name: 'pinecone',
    displayName: 'Pinecone API',
    description: 'Vector database for semantic search and AI applications.',
    placeholderText: 'Your Pinecone API key...',
    docUrl: 'https://docs.pinecone.io/docs/quickstart'
  },
  {
    name: 'openai',
    displayName: 'OpenAI API',
    description: 'Access GPT models and other AI services from OpenAI.',
    placeholderText: 'sk-...',
    docUrl: 'https://platform.openai.com/docs/api-reference'
  },
  {
    name: 'huggingface',
    displayName: 'Hugging Face API',
    description: 'Access to various open-source AI models and services.',
    placeholderText: 'hf_...',
    docUrl: 'https://huggingface.co/docs/api-inference/en/index'
  }
];

const STORAGE_KEY_PREFIX = 'future_job_finder_api_keys_';

// Save API key to localStorage
export const saveApiKey = (serviceName: ApiServiceName, apiKey: string): void => {
  if (!apiKey) {
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}${serviceName}`);
    return;
  }
  
  try {
    // In a real app, consider encrypting this with a user password
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${serviceName}`, apiKey);
    console.log(`Saved API key for ${serviceName}`);
  } catch (error) {
    console.error(`Error saving API key for ${serviceName}:`, error);
    throw new Error(`Failed to save API key for ${serviceName}`);
  }
};

// Get API key from localStorage
export const getApiKey = (serviceName: ApiServiceName): string | null => {
  try {
    return localStorage.getItem(`${STORAGE_KEY_PREFIX}${serviceName}`);
  } catch (error) {
    console.error(`Error retrieving API key for ${serviceName}:`, error);
    return null;
  }
};

// Check if an API key exists and is not empty
export const hasApiKey = (serviceName: ApiServiceName): boolean => {
  const key = getApiKey(serviceName);
  return key !== null && key !== '';
};

// Remove API key from localStorage
export const removeApiKey = (serviceName: ApiServiceName): void => {
  try {
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}${serviceName}`);
    console.log(`Removed API key for ${serviceName}`);
  } catch (error) {
    console.error(`Error removing API key for ${serviceName}:`, error);
  }
};

// Get a list of all services with API keys configured
export const getConfiguredServices = (): ApiServiceName[] => {
  return apiServices
    .map(service => service.name)
    .filter(name => hasApiKey(name));
};
