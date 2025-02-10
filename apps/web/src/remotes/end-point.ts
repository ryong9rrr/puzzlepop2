export const getRestServerUrl = () => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:8080/rest-server"
    : "http://140.245.39.129/rest-server";
};
