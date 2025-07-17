import { TeamColor } from "./base";

type BaseSendBody = {
  roomId: string;
  sender: string;
};

type InGameSendBody = {
  type: "GAME";
} & BaseSendBody;

type EnterGame = {
  type: "ENTER";
  team: TeamColor;
} & BaseSendBody;

type SendChat = {
  type: "CHAT";
  message: string;
} & BaseSendBody;

/* ****************** InGame SendBody ****************** */

export type SendBody =
  | EnterGame
  | SendChat
  | GetGameInfo
  | StartGame
  | MouseDrag
  | MouseDown
  | MouseUp
  | AddPiece;

type GetGameInfo = {
  message: "GAME_INFO";
} & InGameSendBody;

type StartGame = {
  message: "GAME_START";
} & InGameSendBody;

type MouseDrag = {
  message: "MOUSE_DRAG";
  targets: string; // nowIndex.toString() + "," + preIndex.toString() 형식
  position_x: number;
  position_y: number;
} & InGameSendBody;

type MouseDown = {
  message: "MOUSE_DOWN";
  targets: string; // nowIndex.toString() + "," + preIndex.toString()
  position_x: number;
  position_y: number;
} & InGameSendBody;

type MouseUp = {
  message: "MOUSE_UP";
  targets: string; // nowIndex.toString() + "," + preIndex.toString()
  position_x: number;
  position_y: number;
} & InGameSendBody;

type AddPiece = {
  message: "ADD_PIECE";
  targets: string; // nowIndex.toString() + "," + preIndex.toString()
} & InGameSendBody;
