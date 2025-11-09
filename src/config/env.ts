// Environment configuration
export const ENV = {
  API_BASE_URL: 'https://mumbly-perceptual-barrie.ngrok-free.dev',
  API_VERSION: 'v1',
};

export const getApiUrl = (endpoint: string): string => {
  return `${ENV.API_BASE_URL}/api/${ENV.API_VERSION}${endpoint}`;
};
