export const getAiServerUrl = () => {
  return process.env.NODE_ENV === 'production'
    ? 'http://140.245.39.129/ai-server'
    : 'http://localhost:8100';
};
