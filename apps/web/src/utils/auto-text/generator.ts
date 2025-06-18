import { nicknamePrefix, nicknameWord } from "./data/nickname";
import { roomTitle } from "./data/room-title";

export const generateRandomNickname = () => {
  const prefix = nicknamePrefix[Math.floor(Math.random() * nicknamePrefix.length)];
  const word = nicknameWord[Math.floor(Math.random() * nicknameWord.length)];
  return `${prefix} ${word}`;
};

export const generateRandomRoomTitle = () => {
  return roomTitle[Math.floor(Math.random() * roomTitle.length)];
};
