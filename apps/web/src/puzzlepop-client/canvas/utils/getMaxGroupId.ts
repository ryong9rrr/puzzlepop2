import { TeamColor } from "../../types/base";
import { canvasStaticStore } from "../canvasStaticStore";

export const getMaxGroupId = (team: TeamColor) => {
  const { redPieces, bluePieces } = canvasStaticStore.getState();

  const pieces = team === "RED" ? redPieces : bluePieces;

  let maxGroupId = -1;
  for (const piece of pieces) {
    maxGroupId = Math.max(maxGroupId, piece.groupId ?? -1);
  }
  return maxGroupId;
};
