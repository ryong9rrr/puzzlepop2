import { TeamColor } from "./base";

export type ChatData = {
  chatMessage: string;
  teamColor: TeamColor | null;
  time: string;
  userid: string;
};
