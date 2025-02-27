export const getGameServerUrl = () => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:8081/game-server"
    : "http://140.245.39.129/game-server";
};
