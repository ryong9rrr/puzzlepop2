import Paper from "paper";
import { onMoveMouseDragProps, OnMoveMouseEventProps } from "./types";

export const onMoveMouseDown = (props: OnMoveMouseEventProps) => {
  const { event, paperPieceList, paperPiece } = props;

  const groupId = paperPiece.groupId;
  const isGrouped = groupId !== null;

  if (isGrouped) {
    paperPieceList.forEach(anotherPaperPiece => {
      if (anotherPaperPiece.groupId === groupId) {
        anotherPaperPiece.piece.bringToFront();
      }
    });
  } else {
    event.target.bringToFront();
  }
};

export const onMoveMouseDrag = (props: onMoveMouseDragProps) => {
  const { event, paperPieceList, paperPiece, pieceSize } = props;

  // 캔버스 사이즈를 벗어나지 않는 범위내로 이동
  const px = paperPiece.piece.position.x;
  const py = paperPiece.piece.position.y;

  const nx = Math.min(
    Math.max(paperPiece.piece.position.x + event.delta.x, Math.floor(pieceSize / 2)),
    Paper.view.viewSize.width - Math.floor(pieceSize / 2),
  );
  const ny = Math.min(
    Math.max(paperPiece.piece.position.y + event.delta.y, Math.floor(pieceSize / 2)),
    Paper.view.viewSize.height - Math.floor(pieceSize / 2),
  );

  const isGrouped = paperPiece.groupId !== null;
  if (isGrouped) {
    paperPieceList.forEach(anotherPaperPiece => {
      if (paperPiece.groupId === anotherPaperPiece.groupId) {
        anotherPaperPiece.piece.position = new Paper.Point(
          anotherPaperPiece.piece.position.x + nx - px,
          anotherPaperPiece.piece.position.y + ny - py,
        );
      }
    });
  } else {
    paperPiece.piece.position = new Paper.Point(nx, ny);
  }
};
