export const GAME_SERVER_END_POINT = () => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:8081/game-server"
    : "https://puzzlepop.site/game-server";
};
