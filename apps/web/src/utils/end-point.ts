export const getRestServerUrl = () => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "http://rest-server:8080";
};

export const getWebUrl = () => {
  return "http://localhost:3000";
};
