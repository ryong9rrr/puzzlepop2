export const getAiServerUrl = () => {
  return process.env.NODE_ENV === 'production'
    ? 'https://puzzlepop.site/ai-server'
    : 'http://localhost:8100';
};
