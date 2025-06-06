export const getAiServerUrl = () => {
  return process.env.NODE_ENV === 'production'
    ? 'http://www.puzzlepop.site/ai-server'
    : 'http://localhost:8100';
};
