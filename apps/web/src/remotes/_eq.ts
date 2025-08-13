export const WEB_END_POINT = () => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://puzzlepop.site";
};
