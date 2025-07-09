type BaseChat = {
  message: string;
};

export type SystemChat = BaseChat & {
  type: "system";
};

export type UserChat = BaseChat & {
  type: "chat";
  nickname: string;
};
