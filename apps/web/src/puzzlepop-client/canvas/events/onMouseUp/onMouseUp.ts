import { CanvasPiece, canvasStaticStore } from "../../canvasStaticStore";
import { socketStaticStore } from "../../../socketStaticStore";
import { getTargets } from "../../utils/getTargets";

import { moveOnePiece } from "./moveOnePiece";
import { moveGroupPiece } from "./moveGroupPiece";

const { send } = socketStaticStore.getState();

export const onMouseUp = (event: paper.MouseEvent, piece: CanvasPiece) => {
  const {
    initData: { me, roomId },
  } = canvasStaticStore.getState();

  // 1) 피스 1개만 옮긴 경우
  if (piece.groupId === null) {
    moveOnePiece(piece);
  } else {
    // 2) 그룹피스를 옮긴 경우
    moveGroupPiece(piece);
  }

  // 3) 드래그이벤트 종료
  send({
    type: "GAME",
    message: "MOUSE_UP",
    roomId,
    sender: me.id,
    targets: JSON.stringify(getTargets(piece.index, me.team)),
    position_x: piece.paperGroup.position.x,
    position_y: piece.paperGroup.position.y,
  });
};
