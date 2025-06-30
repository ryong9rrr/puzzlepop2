// 채팅이 발생했을 경우 response
export type ChatData = {
  chatMessage: string;
  teamColor: "RED" | "BLUE" | null;
  time: string;
  userid: string;
};

export type Picture = {
  id: any;
  name: any;
  width: number;
  length: number;
  imgWidth: number;
  imgHeight: number;
  pieceSize: number;
  widthPieceCnt: number;
  lengthPieceCnt: number;
  levelSize: {
    [key: string]: number;
  };
  encodedString: string;
};

export type Player = {
  id: string; // 닉네임
  member: boolean;
  sessionId: string;
};

export type GameData = {
  gameId: string; // 게임방 ID
  gameName: string; // 게임방 이름
  roomSize: number; // 게임방 정원
  gameType: "COOPERATION" | "BATTLE"; // 게임 타입
  admin: Player; // 방장 정보
  picture: Picture;
  redTeam: {
    players: Player[]; // 협동게임일 경우 모두 레드팀으로 배정
  };
  blueTeam: {
    players: Player[];
  };
  players: any;
  redPuzzle: any;
  bluePuzzle: any;
  startTime: string;
  finishTime: any;
  sessionToUser: {
    [key: string]: Player;
  };
  dropRandomItem: any;
  empty: boolean;
  time: number;
  started: boolean; // 대기방일 경우 false, 게임 시작시(인게임) true
  saved: boolean;
  finished: boolean; // 게임을 시작한 이후(대기방이 아닌 인게임) 끝났는지 여부
};
