export type MultiGameTeamType = "RED" | "BLUE";
export type MultiGameType = "COOPERATION" | "BATTLE";
export type MultiGameItemNameType = "FRAME" | "MAGNET" | "HINT";

export type MeFromStorage = {
  id: string;
  team: MultiGameTeamType;
};

export type MultiGameItemType = {
  id: number;
  name: MultiGameItemNameType;
};

// TODO
export type MultiGameBundleType = {};
export type MultiGameComboType = {};
export type MultiGameComboTimerType = {};
export type MultiGameRandomItemType = {};

export type MultiGamePictureType = {
  id: null; // TODO
  name: null; // TODO
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

export type MultiGamePlayerType = {
  id: string; // 닉네임
  member: boolean;
  sessionId: string;
};

export type MultiGamePieceType = {
  correctBottomIndex: number;
  correctLeftIndex: number;
  correctRightIndex: number;
  correctTopIndex: number;
  index: number;
  item: MultiGameItemType | null;
  locked: boolean;
  position_x: number;
  position_y: number;
  type: [number, number, number, number]; // top right bottom left 순이며 -1, 0, 1 세 값 중 하나를 갖는다.
};

export type MultiGamePuzzleType = {
  board: MultiGamePieceType[][];
  bundles: MultiGameBundleType[];
  canvas_LENGTH: 750;
  canvas_WIDTH: 1000;
  comboTimer: MultiGameComboTimerType;
  completed: boolean;
  correctedCount: number;
  idxToCoordinate: {
    [key: string | number]: [number, number];
  };
  isCorrected: boolean[][];
  itemCount: number;
  itemList: (MultiGameItemType | null)[];
  bottom: number;
  left: number;
  right: number;
  top: number;
  lengthCnt: number;
  picture: MultiGamePictureType;
  pieceSize: number;
  visited: unknown | null; // TODO
  widthCnt: number;
};

export type ChatMessage = {
  chatMessage: string;
  teamColor: MultiGameTeamType | null;
  time: string;
  userid: string;
};

export type MultiGameInfoMessage = {
  gameId: string;
  gameName: string;
  gameType: MultiGameType;
  roomSize: number;
  admin: MultiGamePlayerType;
  picture: MultiGamePictureType;
  startTime: string;
  sessionToUser: {
    [key: string]: MultiGamePlayerType;
  };
  time: number;
  started: boolean; // 대기방일 경우 false, 게임 시작시(인게임) true
  saved: boolean;
  finished: boolean; // 게임을 시작한 이후(대기방이 아닌 인게임) 끝났는지 여부

  players: MultiGamePlayerType[] | null;
  redTeam: {
    players: MultiGamePlayerType[];
  };
  blueTeam: {
    players: MultiGamePlayerType[];
  };

  redPuzzle: MultiGamePuzzleType; // 대기실에서는 null, 인게임에서는 퍼즐 정보가 들어온다. 어차피 인게임에서만 쓸거니까 null 생각은 안해도됨.
  bluePuzzle: MultiGamePuzzleType;

  dropRandomItem: Record<string, unknown>;
  empty: boolean;
  finishTime: unknown;
};

export type MultiGameMouseDragMessage = {
  message: "MOVE";
  senderId: string; // send한 사람의 닉네임
  targets: string; // nowIndex.toString() + "," + preIndex.toString() << 이 형태라서 parse해서 써야하는듯
  team: MultiGameTeamType; // send한 사람의 팀..
  finished: boolean;

  redBundles: MultiGameBundleType[];
  redItemList: (MultiGameItemType | null)[];
  redProgressPercent: number;

  blueBundles: MultiGameBundleType[];
  blueItemList: (MultiGameItemType | null)[];
  blueProgressPercent: number;

  combo: MultiGameComboType | null;
  comboCnt: number;

  randomItem: MultiGameRandomItemType | null;

  // TODO: 얘네들은 필요한가?
  deleted: null;
  game: null;
  item: null;
  targetList: null;
};
