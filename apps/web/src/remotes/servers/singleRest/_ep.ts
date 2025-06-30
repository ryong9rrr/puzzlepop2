export const REST_SERVER_END_POINT = () => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:8080/rest-server"
    : "https://puzzlepop.site/rest-server";
};
