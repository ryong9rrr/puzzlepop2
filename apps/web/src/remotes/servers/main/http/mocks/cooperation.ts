import { CooperationWaitingGameData, Player } from "@shared-types/multi";

const user1: Player = {
  id: "user1",
  member: true,
  sessionId: "session-admin-123",
};

const user2: Player = {
  id: "user2",
  member: true,
  sessionId: "session-admin-123",
};

const user3: Player = {
  id: "user3",
  member: true,
  sessionId: "session-admin-123",
};

const room: CooperationWaitingGameData = {
  gameId: "aaa111",
  gameName: "퍼즐 한판!!",
  roomSize: 4,
  gameType: "COOPERATION",
  admin: {
    ...user1,
  },
  picture: {
    id: null,
    name: null,
    width: 1000,
    length: 551,
    imgWidth: 400,
    imgHeight: 200,
    pieceSize: 40,
    widthPieceCnt: 10,
    lengthPieceCnt: 5,
    levelSize: {
      "1": 400,
      "2": 500,
      "3": 600,
    },
    encodedString:
      "https://puzzlepop.site/cdn/64731e94-96db-4f58-927c-407e86beeb8c1747680592661/md.webp",
  },
  redTeam: {
    players: [{ ...user1 }, { ...user2 }] as Player[],
  },
  blueTeam: {
    players: [] as Player[],
  },
  players: null,
  redPuzzle: null,
  bluePuzzle: null,
  startTime: "2023-10-01T12:00:00Z",
  finishTime: null,
  sessionToUser: {},
  dropRandomItem: {},
  empty: true,
  time: 43,
  started: false,
  saved: false,
  finished: false,
};

const gameRoomSample1: CooperationWaitingGameData = {
  ...room,
  gameId: "gameRoomSample1",
  gameName: "짱구 퍼즐 맞히실분~~",
  roomSize: 4,
  time: 123,
  started: true,
  admin: {
    id: "퍼즐킹",
    member: true,
    sessionId: "session-admin-123",
  },
};

const gameRoomSample2: CooperationWaitingGameData = {
  ...room,
  gameId: "gameRoomSample2",
  gameName: "퍼즐 한판 어때요",
  roomSize: 4,
  time: 123,
  started: true,
  admin: {
    id: "Faker",
    member: true,
    sessionId: "session-admin-123",
  },
};

const gameRoomSample3: CooperationWaitingGameData = {
  ...room,
  gameId: "gameRoomSample3",
  gameName: "퍼즐 한판!!!",
  roomSize: 4,
  time: 123,
  started: true,
  admin: {
    id: "이세돌",
    member: true,
    sessionId: "session-admin-123",
  },
};

export const cooperationGameRoomList: CooperationWaitingGameData[] = [
  room,
  {
    ...room,
    gameId: "aaa112",
    gameName: "재미있는 퍼즐",
    roomSize: 6,
    time: 123,
    started: true,
  },
  {
    ...room,
    gameId: "aaa113",
    gameName: "신나는 퍼즐",
    roomSize: 2,
    time: 432,
  },
  {
    ...room,
    gameId: "aaa114",
    gameName: "신나는 퍼즐",
    roomSize: 2,
    time: 432,
  },
  {
    ...room,
    gameId: "aaa115",
    gameName: "신나는 퍼즐",
    roomSize: 2,
    time: 432,
  },
  {
    ...room,
    gameId: "aaa116",
    gameName: "신나는 퍼즐",
    roomSize: 3,
    redTeam: {
      players: [{ ...user1 }, { ...user2 }, { ...user3 }] as Player[],
    },
    time: 432,
  },
  {
    ...room,
    gameId: "aaa117",
    gameName:
      "신나는 퍼즐 신나는 퍼즐 신나는 퍼즐 신나는 퍼즐 신나는 퍼즐 신나는 퍼즐 신나는 퍼즐 신나는 퍼즐 신나는 퍼즐 신나는 퍼즐",
    roomSize: 4,
    redTeam: {
      players: [{ ...user1 }, { ...user2 }, { ...user3 }] as Player[],
    },
    time: 432,
  },
  gameRoomSample1,
  gameRoomSample2,
  gameRoomSample3,
];

export const cooperationGameSamples = [gameRoomSample1, gameRoomSample2, gameRoomSample3];
