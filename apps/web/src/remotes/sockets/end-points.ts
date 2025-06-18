const GAME_DESTINATION = "/topic/game/room";
const CHAT_DESTINATION = "/topic/chat/room";

export const getGameDestination = (roomId: string) => {
  return `${GAME_DESTINATION}/${roomId}`;
};

export const getChatDestination = (roomId: string) => {
  return `${CHAT_DESTINATION}/${roomId}`;
};

export const SEND_PUBLISH = "/app/game/message";
