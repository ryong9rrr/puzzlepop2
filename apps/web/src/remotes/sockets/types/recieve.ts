// 채팅이 발생했을 경우 response
export type ChatData = {
  chatMessage: string;
  teamColor: "RED" | "BLUE" | null;
  time: string;
  userid: string;
};
