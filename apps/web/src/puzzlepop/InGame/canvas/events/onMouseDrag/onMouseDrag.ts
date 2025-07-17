import Paper from "paper";

import { socketStaticStore } from "../../../../socketStaticStore";
import { CanvasPiece, canvasStaticStore } from "../../canvasStaticStore";
import { getGroupedPiece } from "../getGroupedPiece";

const { send } = socketStaticStore.getState();

export const onMouseDrag = (event: paper.MouseEvent, piece: CanvasPiece) => {
  const {
    initData: { pieceSize, myNickname, roomId, me },
    redPieces,
    bluePieces,
  } = canvasStaticStore.getState();

  const pieces = me.team === "RED" ? redPieces : bluePieces;

  // 현재 조각의 위치
  const px = piece.paperGroup.position.x;
  const py = piece.paperGroup.position.y;

  // 새로운 위치 계산
  const nx = Math.min(
    Math.max(piece.paperGroup.position.x + event.delta.x, Math.floor(pieceSize / 2)),
    Paper.view.viewSize.width - Math.floor(pieceSize / 2),
  );
  const ny = Math.min(
    Math.max(piece.paperGroup.position.y + event.delta.y, Math.floor(pieceSize / 2)),
    Paper.view.viewSize.height - Math.floor(pieceSize / 2),
  );

  // 그룹이 없는 조각은 그 자체로 위치를 업데이트
  // 그룹이 있는 조각은 같은 그룹에 속한 조각들의 위치를 업데이트
  if (piece.groupId === null) {
    piece.paperGroup.position = new Paper.Point(nx, ny);
  } else {
    for (const anotherPiece of pieces) {
      if (anotherPiece.groupId === piece.groupId) {
        anotherPiece.paperGroup.position = new Paper.Point(
          anotherPiece.paperGroup.position.x + nx - px,
          anotherPiece.paperGroup.position.y + ny - py,
        );
      }
    }
  }

  const grouped = getGroupedPiece(piece);

  // 인터벌 걸어야하나?
  send({
    type: "GAME",
    message: "MOUSE_DRAG",
    roomId,
    sender: myNickname,
    targets: JSON.stringify(grouped),
    position_x: nx,
    position_y: ny,
  });
};
