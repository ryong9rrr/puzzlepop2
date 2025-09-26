import { socketStaticStore } from "../../socketStaticStore";
import { CanvasPiece, canvasStaticStore } from "../canvasStaticStore";
import { getTargets } from "../utils/getTargets";

const { send } = socketStaticStore.getState();

export const onMouseDown = (event: paper.MouseEvent, piece: CanvasPiece) => {
  const {
    initData: { me, roomId },
    redPieces,
    bluePieces,
  } = canvasStaticStore.getState();

  const pieces = me.team === "RED" ? redPieces : bluePieces;

  if (piece.groupId === null) {
    event.target.bringToFront();
  } else {
    for (const anotherPiece of pieces) {
      if (anotherPiece.groupId === piece.groupId) {
        anotherPiece.paperGroup.bringToFront();
      }
    }
  }

  send({
    type: "GAME",
    message: "MOUSE_DOWN",
    roomId,
    sender: me.id,
    targets: JSON.stringify(getTargets(piece.index, me.team)),
    position_x: piece.paperGroup.position.x,
    position_y: piece.paperGroup.position.y,
  });
};
