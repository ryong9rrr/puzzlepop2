export type GameMode = "single" | "multi";
export type GameLevel = "easy" | "normal" | "hard";
export type Direction = "top" | "right" | "bottom" | "left";

export type Piece = {
  index: number;
  shape: Shape;
  groupId: number | null;
  position: { x: number; y: number };
};

export type Shape = Record<Direction, number>;

/* ******************** 여기서부터는 멀티게임 ******************** */
// 채팅이 발생했을 경우 response
export type ChatData = {
  chatMessage: string;
  teamColor: "RED" | "BLUE" | null;
  time: string;
  userid: string;
};

export type Picture = {
  id: null;
  name: null;
  width: number;
  length: number;
  imgWidth: number;
  imgHeight: number;
  pieceSize: number;
  widthPieceCnt: number;
  lengthPieceCnt: number;
  levelSize:
    | {
        1: 400;
        2: 500;
        3: 600;
      }
    | {
        "1": 400;
        "2": 500;
        "3": 600;
      };
  encodedString: string;
};

export type Player = {
  id: string; // 닉네임
  member: boolean;
  sessionId: string;
};

export type CooperationWaitingGameData = {
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
  players: unknown;
  redPuzzle: unknown;
  bluePuzzle: unknown;
  startTime: string;
  finishTime: unknown;
  sessionToUser: {
    [key: string]: Player;
  };
  dropRandomItem: Record<string, unknown>;
  empty: boolean;
  time: number;
  started: boolean; // 대기방일 경우 false, 게임 시작시(인게임) true
  saved: boolean;
  finished: boolean; // 게임을 시작한 이후(대기방이 아닌 인게임) 끝났는지 여부
};

export type MultiGameItem = {
  id: number;
  name: "FRAME" | "MAGNET" | "HINT";
};

export type MultiGamePuzzlePiece = {
  correctBottomIndex: number;
  correctLeftIndex: number;
  correctRightIndex: number;
  correctTopIndex: number;
  index: number;
  item: MultiGameItem | null;
  locked: boolean;
  position_x: number;
  position_y: number;
  type: [number, number, number, number]; // top right bottom left 순이며 -1, 0, 1 세 값 중 하나를 갖는다.
};

export type Bundle = {};

export type MultiGamePuzzle = {
  board: MultiGamePuzzlePiece[][];
  bundles: Bundle[];
  canvas_LENGTH: 750;
  canvas_WIDTH: 1000;
  comboTimer: unknown[]; // TODO
  completed: boolean;
  correctedCount: number;
  idxToCoordinate: {
    [key: string | number]: [number, number];
  };
  isCorrected: boolean[][];
  itemCount: number;
  itemList: (MultiGameItem | null)[];
  bottom: number;
  left: number;
  right: number;
  top: number;
  lengthCnt: number;
  picture: Picture;
  pieceSize: number;
  visited: unknown | null; // TODO
  widthCnt: number;
};

export type MultiGameData = {
  admin: Player;
  bluePuzzle: MultiGamePuzzle;
  blueTeam: {
    players: Player[];
  };
  dropRandomItem: Record<string, unknown>;
  empty: boolean;
  finishTime: unknown;
  finished: boolean;
  gameId: string;
  gameName: string;
  gameType: "COOPERATION" | "BATTLE";
  picture: Picture;
  players: Player[];
  redPuzzle: MultiGamePuzzle;
  redTeam: {
    players: Player[];
  };
  roomSize: number;
  saved: boolean;
  sessionToUser: {
    [key: string]: Player;
  };
  startTime: string;
  started: boolean;
  time: number;
};
