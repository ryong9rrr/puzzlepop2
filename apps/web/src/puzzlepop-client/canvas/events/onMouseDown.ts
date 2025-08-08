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

  // TODO: <LOCK 기능 구현하기 1 : MOUSE_DOWN 이벤트>
  // 이렇게 처음 MouseDown 이벤트를 발생시키면 "LOCKED" 메세지가 오는데,
  // 한번 더 그 피스를 클릭하면 "BLOCKED" 메세지가 온다.
  // 이 때, MouseUp 이벤트에 달려있는 send(MOUSE_UP) 메세지를 보내면 다시 "UNLOCKED"가 된다.
  // 따라서, A유저가 클릭한 피스가 LOCKED가 되고, 아직 A유저가 그 피스를 MouseUp 하지 않은 상태라면..
  // 그 피스는 BLOCKED 상태이기 때문에 다른유저(A유저가 아닌)가 BLOCKED 상태의 피스는 잡을 수 없게 해야한다.
  // 그리고 send(MOUSE_UP) 이 일어났을 때는 LOCK을 푸는 기능을 구현해야한다.;
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
