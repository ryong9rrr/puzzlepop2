export const getRestServerUrl = () => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:8080/rest-server"
    : "/rest-server";
};

export const getGameServerUrl = () => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:8081/game-server"
    : "/game-server";
};
