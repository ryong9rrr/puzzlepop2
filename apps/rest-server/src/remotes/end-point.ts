export const getAiServerUrl = () => {
  return process.env.NODE_ENV === 'production'
    ? '/ai-server'
    : 'http://localhost:8100';
};
