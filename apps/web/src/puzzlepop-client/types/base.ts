export type Direction = "top" | "right" | "bottom" | "left";
export type Shape = {
  [key in Direction]: number;
};

export type TeamColor = "RED" | "BLUE";
export type GameType = "COOPERATION" | "BATTLE";
export type ItemName = "FRAME" | "MAGNET" | "HINT";

export type Me = {
  id: string;
  team: TeamColor;
};

export type Item = {
  id: number;
  name: ItemName;
};

// TODO
export type Combo = [number, number, number][]; // [aPieceIndex, bPieceIndex, direction] : aPieceIndex를 bPieceIndex에 direction 방향(0123 -> 상우하좌)으로 붙인다는 의미
export type ComboTimer = unknown;
export type RandomItem = unknown;

export type Picture = {
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

export type Player = {
  id: string; // 닉네임
  member: boolean;
  sessionId: string;
};

export type Piece = {
  type: [number, number, number, number]; // top right bottom left 순이며 -1, 0, 1 세 값 중 하나를 갖는다.
  correctBottomIndex: number;
  correctLeftIndex: number;
  correctRightIndex: number;
  correctTopIndex: number;
  index: number;
  item: Item | null;
  locked: boolean;
  position_x: number;
  position_y: number;
};

export type Puzzle = {
  board: Piece[][];
  bundles: Piece[][];
  canvas_LENGTH: 750;
  canvas_WIDTH: 1000;
  comboTimer: ComboTimer;
  completed: boolean;
  correctedCount: number;
  idxToCoordinate: {
    [key: string | number]: [number, number];
  };
  isCorrected: boolean[][];
  itemCount: number;
  itemList: (Item | null)[];
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

export type GameInfoData = {
  gameId: string;
  gameName: string;
  gameType: GameType;
  roomSize: number;
  admin: Player;
  picture: Picture;
  startTime: string;
  sessionToUser: {
    [key: string]: Player;
  };
  time: number;
  started: boolean; // 대기방일 경우 false, 게임 시작시(인게임) true
  saved: boolean;
  finished: boolean; // 게임을 시작한 이후(대기방이 아닌 인게임) 끝났는지 여부

  players: Player[] | null;
  redTeam: {
    players: Player[];
  };
  blueTeam: {
    players: Player[];
  };

  redPuzzle: Puzzle; // 대기실에서는 null, 인게임에서는 퍼즐 정보가 들어온다. 어차피 인게임에서만 쓸거니까 null 생각은 안해도됨.
  bluePuzzle: Puzzle;

  dropRandomItem: Record<string, unknown>;
  empty: boolean;
  finishTime: unknown;
};

export type BasePuzzleEventData = {
  senderId: string; // send한 사람의 닉네임
  targets: string; // nowIndex.toString() + "," + preIndex.toString() << 이 형태라서 parse해서 써야하는듯
  team: TeamColor; // send한 사람의 팀..
  finished: boolean;

  redBundles: Piece[][];
  redItemList: (Item | null)[];
  redProgressPercent: number;

  blueBundles: Piece[][];
  blueItemList: (Item | null)[];
  blueProgressPercent: number;

  combo: Combo | null;
  comboCnt: number;

  randomItem: RandomItem | null;

  // TODO: 얘네들은 필요한가?
  deleted: null;
  game: null;
  item: null;
  targetList: null;
};
