export const getHttpEndPoint = () => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:9090"
    : "https://puzzlepop.site/main-server";
};

export const getWebSocketEndPoint = () => {
  return process.env.NODE_ENV === "development"
    ? "ws://localhost:9090"
    : "wss://puzzlepop.site/main-server";
};

export const getGameSubscribeDestination = (roomId: string) => `/topic/game/room/${roomId}`;
export const getChatSubscribeDestination = (roomId: string) => `/topic/chat/room/${roomId}`;
export const getSendPublishDestination = `/app/game/message`;
