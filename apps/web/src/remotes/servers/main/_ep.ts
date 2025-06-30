// TODO: 배포 서버 Nginx 설정 후 URL 설정 필요
export const ORIGINAL_SERVER_END_POINT_HTTP = () => {
  return process.env.NODE_ENV === "development" ? "http://localhost:9090" : "";
};

// TODO: 배포 서버 Nginx 설정 후 URL 설정 필요
export const ORIGINAL_SERVER_END_POINT_WS = () => {
  return process.env.NODE_ENV === "development" ? "ws://localhost:9090" : "";
};

export const GAME_SUBSCRIBE_DESTINATION = (roomId: string) => `/topic/game/room/${roomId}`;
export const CHAT_SUBSCRIBE_DESTINATION = (roomId: string) => `/topic/chat/room/${roomId}`;
export const SEND_PUBLISH_DESTINATION = `/app/game/message`;
