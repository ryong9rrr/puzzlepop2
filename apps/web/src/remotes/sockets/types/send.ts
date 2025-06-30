type BaseSendBody = {
  roomId: string;
  sender: string;
};

// 게임 입장 send
type SendEnterGameRoomBody = {
  type: "ENTER";
  team: "RED" | "BLUE";
} & BaseSendBody;

// 채팅방 입장 send
type SendEnterChatRoomBody = {
  message: string;
  type: "CHAT";
} & BaseSendBody;

export type SendBody = SendEnterGameRoomBody | SendEnterChatRoomBody;
