export const getRestServerUrl = () => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:8080/rest-server"
    : "https://www.puzzlepop.site/rest-server";
};

export const getGameServerUrl = () => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:8081/game-server"
    : "https://www.puzzlepop.site/game-server";
};
