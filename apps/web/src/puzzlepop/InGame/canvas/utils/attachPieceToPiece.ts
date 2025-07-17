import { TeamColor } from "../../../types/base";
import { socketStaticStore } from "../../../socketStaticStore";
import { canvasStaticStore } from "../canvasStaticStore";
import { getNeighborPieceIndexMap } from "./getNeighborPieceIndexMap";

const { send: _send } = socketStaticStore.getState();

type Params = {
  pieceIndex: number;
  toPieceIndex: number;
  team: TeamColor;
  isSend: boolean;
};

// piece를 toPiece에 붙이는 함수 (그룹화는 안함)
export const attachPieceToPiece = (params: Params) => {
  const { pieceIndex, toPieceIndex, team, isSend } = params;

  const {
    initData: { shapes, pieceSize },
    redPieces,
    bluePieces,
  } = canvasStaticStore.getState();

  const pieces = team === "RED" ? redPieces : bluePieces;

  const piece = pieces[pieceIndex];
  const shape = shapes[piece.index];

  const toPiece = pieces[toPieceIndex];
  const toShape = shapes[toPiece.index];

  if (!piece || !shape) {
    throw new Error(`${pieceIndex} 에 해당하는 piece가 없습니다.`);
  }
  if (!toPiece || !toShape) {
    throw new Error(`${toPieceIndex} 에 해당하는 piece가 없습니다.`);
  }

  const {
    top: topPieceIndex,
    left: leftPieceIndex,
    right: rightPieceIndex,
    bottom: bottomPieceIndex,
  } = getNeighborPieceIndexMap(toPieceIndex);

  const toX = toPiece.paperGroup.position.x;
  const toY = toPiece.paperGroup.position.y;

  // FIXME: 일단 무보정상태인데 나중에 피스모양에 따라 보정값 적용해야함

  // [piece][toPiece] 형태로 붙이는 경우 (왼쪽에 붙이는 경우)
  if (leftPieceIndex === pieceIndex) {
    piece.paperGroup.position.x = toX - pieceSize;
    piece.paperGroup.position.y = toY;

    if (isSend) {
      send(piece.index, toPiece.index);
    }

    return;
  }

  // [toPiece][piece] 형태로 붙이는 경우 (오른쪽에 붙이는 경우)
  if (rightPieceIndex === pieceIndex) {
    piece.paperGroup.position.x = toX + pieceSize;
    piece.paperGroup.position.y = toY;

    if (isSend) {
      send(piece.index, toPiece.index);
    }
    return;
  }

  /*
  [piece]
  [toPiece] 형태로 붙이는 경우 (위에 붙이는 경우)
  */
  if (topPieceIndex === pieceIndex) {
    piece.paperGroup.position.x = toX;
    piece.paperGroup.position.y = toY - pieceSize;

    if (isSend) {
      send(piece.index, toPiece.index);
    }
    return;
  }

  /*
  [toPiece]
  [piece] 형태로 붙이는 경우 (아래에 붙이는 경우)
  */
  if (bottomPieceIndex === pieceIndex) {
    piece.paperGroup.position.x = toX;
    piece.paperGroup.position.y = toY + pieceSize;

    if (isSend) {
      send(piece.index, toPiece.index);
    }
    return;
  }

  // 0번(top 0, left 0, right 1, bottom -1)을 1번(top 0, left -1, right 1, bottom 1)에 붙이는 경우 (from이 -1 작으므로 왼쪽에 붙임)
  // fromPiece.paperGroup.position.x = toX - pieceSize + 2;
  // fromPiece.paperGroup.position.y = toY - 2;

  // 2를 1 (오른쪽에 붙이니까 + pieceSize)
  // fromPiece.paperGroup.position.x = toX + pieceSize + 2;
  // fromPiece.paperGroup.position.y = toY - 2;

  // 3을 2, 4를 3, 5를 4
  // fromPiece.paperGroup.position.x = toX + pieceSize - 2;
  // fromPiece.paperGroup.position.y = toY;

  // 6을 5
  // fromPiece.paperGroup.position.x = toX + pieceSize - 2;
  // fromPiece.paperGroup.position.y = toY + 1;

  // 7을 6, 8을 7
  // fromPiece.paperGroup.position.x = toX + pieceSize;
  // fromPiece.paperGroup.position.y = toY;

  // 9를 8
  // fromPiece.paperGroup.position.x = toX + pieceSize - 1;
  // fromPiece.paperGroup.position.y = toY;

  /*
  ㅜㅜ 어떤 경우에 따라서 보정값이 0, 1, 2 ... 이런식으로 바뀐다....... 분명 규칙이 있을 것 같은데...
  */

  // 0을 1 (왼쪽에 붙이니까 -pieceSize)
  // fromPiece.paperGroup.position.x = toX - pieceSize + 2;
  // fromPiece.paperGroup.position.y = toY - 2;

  // **************** 두번째 행 시작 ****************
  // 11을 10 (위 아래 모양이 서로 다른 경우에는 4로 보정)
  // fromPiece.paperGroup.position.x = toX + pieceSize - 2;
  // fromPiece.paperGroup.position.y = toY + 4;

  // 12를 11
  // fromPiece.paperGroup.position.x = toX + pieceSize;
  // fromPiece.paperGroup.position.y = toY - 2;

  // 13을 12, 14를 13, 15를 14
  // fromPiece.paperGroup.position.x = toX + pieceSize;
  // fromPiece.paperGroup.position.y = toY;

  // 16를 15
  // fromPiece.paperGroup.position.x = toX + pieceSize;
  // fromPiece.paperGroup.position.y = toY - 2;

  // 17를 16
  // fromPiece.paperGroup.position.x = toX + pieceSize - 2;
  // fromPiece.paperGroup.position.y = toY + 2;

  // 18를 17
  // fromPiece.paperGroup.position.x = toX + pieceSize - 2;
  // fromPiece.paperGroup.position.y = toY - 2;

  // 19를 18
  // fromPiece.paperGroup.position.x = toX + pieceSize - 1;
  // fromPiece.paperGroup.position.y = toY;

  // **************** 3번째 행 시작 ****************
  // 21->20
  // fromPiece.paperGroup.position.x = toX + pieceSize - 2;
  // fromPiece.paperGroup.position.y = toY;

  // 22->21, 24->23, 25->24
  // fromPiece.paperGroup.position.x = toX + pieceSize;
  // fromPiece.paperGroup.position.y = toY;

  // 23->22, 29->28
  // fromPiece.paperGroup.position.x = toX + pieceSize - 2;
  // fromPiece.paperGroup.position.y = toY + 2;

  // 26->25
  // fromPiece.paperGroup.position.x = toX + pieceSize;
  // fromPiece.paperGroup.position.y = toY - 2;

  // 27->26
  // fromPiece.paperGroup.position.x = toX + pieceSize;
  // fromPiece.paperGroup.position.y = toY + 2;

  // 28->27
  // fromPiece.paperGroup.position.x = toX + pieceSize;
  // fromPiece.paperGroup.position.y = toY - 4;

  // **************** 4번째 행 시작 ****************
  // 31->30
  // fromPiece.paperGroup.position.x = toX + pieceSize - 2;
  // fromPiece.paperGroup.position.y = toY - 2;

  // 32->31
  // fromPiece.paperGroup.position.x = toX + pieceSize + 2;
  // fromPiece.paperGroup.position.y = toY + 2;

  // 33->32, 37->36
  // fromPiece.paperGroup.position.x = toX + pieceSize - 2;
  // fromPiece.paperGroup.position.y = toY;

  // 34->33
  // fromPiece.paperGroup.position.x = toX + pieceSize;
  // fromPiece.paperGroup.position.y = toY + 2;

  // 35->34
  // fromPiece.paperGroup.position.x = toX + pieceSize + 2;
  // fromPiece.paperGroup.position.y = toY;

  // 36->35
  // fromPiece.paperGroup.position.x = toX + pieceSize;
  // fromPiece.paperGroup.position.y = toY - 2;

  // 39->38
  // fromPiece.paperGroup.position.x = toX + pieceSize - 4;
  // fromPiece.paperGroup.position.y = toY + 2;

  // **************** 5번째 행 시작 ****************
  // 41->40
  // fromPiece.paperGroup.position.x = toX + pieceSize - 2;
  // fromPiece.paperGroup.position.y = toY;

  // 42->41
  // fromPiece.paperGroup.position.x = toX + pieceSize;
  // fromPiece.paperGroup.position.y = toY + 2;

  // 43->42
  // fromPiece.paperGroup.position.x = toX + pieceSize - 2;
  // fromPiece.paperGroup.position.y = toY - 2;

  // 44->43
  // fromPiece.paperGroup.position.x = toX + pieceSize;
  // fromPiece.paperGroup.position.y = toY + 2;

  // 45->44
  // fromPiece.paperGroup.position.x = toX + pieceSize;
  // fromPiece.paperGroup.position.y = toY;

  // 46->45
  // fromPiece.paperGroup.position.x = toX + pieceSize + 2;
  // fromPiece.paperGroup.position.y = toY;

  // 47->46
  // fromPiece.paperGroup.position.x = toX + pieceSize;
  // fromPiece.paperGroup.position.y = toY - 2;

  // 48->47
  // fromPiece.paperGroup.position.x = toX + pieceSize - 2;
  // fromPiece.paperGroup.position.y = toY + 2;

  // 49->48
  // fromPiece.paperGroup.position.x = toX + pieceSize - 2;
  // fromPiece.paperGroup.position.y = toY;
};

const send = (pieceIndex: number, toPieceIndex: number) => {
  const {
    initData: { roomId, me },
  } = canvasStaticStore.getState();

  _send({
    type: "GAME",
    message: "ADD_PIECE",
    roomId,
    sender: me.id,
    targets: `${pieceIndex},${toPieceIndex}`,
  });
};
