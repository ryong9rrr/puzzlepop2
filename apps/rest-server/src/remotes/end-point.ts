export const getAiServerUrl = () => {
  return process.env.NODE_ENV === 'production'
    ? 'https://www.puzzlepop.site/ai-server'
    : 'http://localhost:8100';
};
