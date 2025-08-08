export const ORIGINAL_SERVER_END_POINT_HTTP = () => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:9090"
    : "https://puzzlepop.site/main-server";
};

export const ORIGINAL_SERVER_END_POINT_WS = () => {
  return process.env.NODE_ENV === "development"
    ? "ws://localhost:9090"
    : "wss://puzzlepop.site/main-server";
};

export const GAME_SUBSCRIBE_DESTINATION = (roomId: string) => `/topic/game/room/${roomId}`;
export const CHAT_SUBSCRIBE_DESTINATION = (roomId: string) => `/topic/chat/room/${roomId}`;
export const SEND_PUBLISH_DESTINATION = `/app/game/message`;
