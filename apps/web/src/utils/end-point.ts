export const getRestServerUrl = () => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "http://localhost:8080/api";
};

export const getWebUrl = () => {
  return "http://localhost:3000";
};
