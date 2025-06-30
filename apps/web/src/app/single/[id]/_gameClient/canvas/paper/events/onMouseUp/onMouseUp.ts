import Paper from "paper";
import { Direction } from "@puzzlepop2/game-core";

import { getGameStore, PaperPiece } from "../../../../store";
import { OnMouseEventType } from "../types";
import { getNeighborPieceIdMap } from "../../utils";
import { getFittableValues } from "./xyfit";

export const onMouseUp = (props: OnMouseEventType) => {
  const { event, paperPiece } = props;

  const { pieces } = getGameStore();

  if (paperPiece.groupId !== null) {
    for (const anotherPaperPiece of pieces) {
      if (
        anotherPaperPiece.groupId === paperPiece.groupId &&
        anotherPaperPiece.pieceId !== paperPiece.pieceId
      ) {
        fitNeighborPieces(anotherPaperPiece);
      }
    }
  }
  fitNeighborPieces(paperPiece);
};

const fitNeighborPieces = (paperPiece: PaperPiece) => {
  for (const [_direction, neighborPieceId] of Object.entries(
    getNeighborPieceIdMap(paperPiece.pieceId),
  )) {
    const direction = _direction as Direction;

    const 피스가_들어갈_자리가_없다면 =
      neighborPieceId === null ||
      isFullPiece({
        pieceId: paperPiece.pieceId,
        neighborPieceId,
        direction,
      });

    if (피스가_들어갈_자리가_없다면) {
      continue;
    }

    fit({
      pieceId: paperPiece.pieceId,
      neighborPieceId,
      direction,
      recursive: true,
    });
  }
};

const isFullPiece = (props: { pieceId: number; neighborPieceId: number; direction: Direction }) => {
  const { pieceId, neighborPieceId, direction } = props;

  const { perRow, perColumn, pieces } = getGameStore();

  if (
    !!pieces[pieceId] &&
    !!pieces[neighborPieceId] &&
    !!pieces[pieceId].groupId &&
    pieces[pieceId].groupId === pieces[neighborPieceId].groupId
  ) {
    return true;
  }
  if (pieceId % perRow === 0 && direction === "left") {
    return true;
  } else if (pieceId % perRow === perRow - 1 && direction === "right") {
    return true;
  } else if (pieceId < perRow && direction === "top") {
    return true;
  } else if (pieceId >= perRow * (perColumn - 1) && direction === "bottom") {
    return true;
  }
  return false;
};

const fit = (props: {
  pieceId: number;
  neighborPieceId: number;
  direction: Direction;
  recursive: boolean;
  isCombo?: boolean;
}) => {
  const { pieceId, neighborPieceId, direction, recursive, isCombo = false } = props;

  const { pieceSize, pieces, level, bundles } = getGameStore();

  const ERROR_RANGE = pieceSize * 0.2;

  const nowTile = pieces[pieceId]!.piece;
  const preTile = pieces[neighborPieceId]!.piece;

  const nowShape = bundles[pieceId]!.shape;
  const preShape = bundles[neighborPieceId]!.shape;

  const { xChange, yChange, xUp, yUp } = getFittableValues({
    nowShape,
    preShape,
    gameLevel: level,
  });

  const FitMap = {
    left: {
      validation:
        Math.abs(nowTile.position.x - pieceSize - preTile.position.x) < ERROR_RANGE &&
        Math.abs(nowTile.position.y - preTile.position.y) < ERROR_RANGE,
      nextPosition: [preTile.position.x + pieceSize + xChange, preTile.position.y + yChange],
    },
    right: {
      validation:
        Math.abs(preTile.position.x - pieceSize - nowTile.position.x) < ERROR_RANGE &&
        Math.abs(nowTile.position.y - preTile.position.y) < ERROR_RANGE,
      nextPosition: [preTile.position.x - (pieceSize + xChange), preTile.position.y + yChange],
    },
    top: {
      validation:
        Math.abs(preTile.position.y + pieceSize - nowTile.position.y) < ERROR_RANGE &&
        Math.abs(nowTile.position.x - preTile.position.x) < ERROR_RANGE,
      nextPosition: [preTile.position.x + xUp, preTile.position.y + pieceSize + yUp],
    },
    bottom: {
      validation:
        Math.abs(nowTile.position.y + pieceSize - preTile.position.y) < ERROR_RANGE &&
        Math.abs(nowTile.position.x - preTile.position.x) < ERROR_RANGE,
      nextPosition: [preTile.position.x + xUp, preTile.position.y - (pieceSize + yUp)],
    },
  } as Record<Direction, { validation: boolean; nextPosition: [number, number] }>;

  if (FitMap[direction].validation) {
    nowTile.position = new Paper.Point(...FitMap[direction].nextPosition);

    if (recursive) {
      mergeGroup({ pieceId, neighborPieceId, isSender: true });
    }
    //sendFitTilePosition(nowTile, nowIndex);
  }

  if (isCombo) {
    // console.log(`${nowTile.position.x}, ${nowTile.position.y}에 img 생성!`);
    // const canvasContainer = document.getElementById("canvasContainer");
    // if (canvasContainer) {
    //   const comboEffect = document.createElement("img");
    //   comboEffect.src = comboEffectPath;
    //   comboEffect.style.zIndex = 100;
    //   comboEffect.style.position = "absolute";
    //   comboEffect.style.left = `${nowTile.position.x}px`;
    //   comboEffect.style.top = `${nowTile.position.y}px`;
    //   comboEffect.style.transform = "translate(-50%, -50%)";
    //   canvasContainer && canvasContainer.appendChild(comboEffect);
    //   // console.log(comboEffect);
    //   setTimeout(() => {
    //     // console.log("effect 삭제");
    //     // console.log(comboEffect);
    //     // console.log(comboEffect.parentNode);
    //     // console.log(comboEffect.parentElement);
    //     comboEffect.parentNode.removeChild(comboEffect);
    //   }, 500);
    // }
  }
};

const mergeGroup = (props: {
  pieceId: number;
  neighborPieceId: number;
  isSender?: boolean;
  isCombo?: boolean;
}) => {
  const { pieceId, neighborPieceId, isSender = false, isCombo = false } = props;

  const { pieces, setCurrentMaxGroupId, currentMaxGroupId } = getGameStore();

  if (isSender) {
    // send(
    //   "/app/game/message",
    //   {},
    //   JSON.stringify({
    //     type: "GAME",
    //     roomId: getRoomId(),
    //     sender: getSender(),
    //     message: "ADD_PIECE",
    //     targets: nowIndex.toString() + "," + preIndex.toString(),
    //   }),
    // );
    // send(
    //   "/app/game/message",
    //   {},
    //   JSON.stringify({
    //     type: "GAME",
    //     roomId: getRoomId(),
    //     sender: getSender(),
    //     message: "GAME_INFO",
    //     targets: nowIndex.toString() + "," + preIndex.toString(),
    //   }),
    // );
  }

  const pieceGroupId = pieces[pieceId]!.groupId;
  const neighborPieceGroupId = pieces[neighborPieceId]!.groupId;

  if (pieceGroupId !== null) {
    if (neighborPieceGroupId === null) {
      pieces[neighborPieceId]!.groupId = pieceGroupId;
    } else {
      pieces.forEach(paperPiece => {
        if (paperPiece.groupId === pieceGroupId) {
          paperPiece.groupId = neighborPieceGroupId;
        }
      });
    }
  } else {
    if (neighborPieceGroupId !== null) {
      pieces[pieceId]!.groupId = neighborPieceGroupId;
    } else {
      pieces[pieceId]!.groupId = currentMaxGroupId + 1;
      pieces[neighborPieceId]!.groupId = currentMaxGroupId + 1;
      setCurrentMaxGroupId(currentMaxGroupId + 1);
    }
  }

  if (isCombo) {
    //comboFit({ config, nowIndex, preIndex, direction });
  } else {
    fitGroup({ groupId: pieces[pieceId]!.groupId, pieceId });
  }
};

const fitGroup = (props: { groupId: number | null; pieceId: number }) => {
  const { groupId, pieceId } = props;

  const { pieces } = getGameStore();

  if (groupId === null) {
    return;
  }

  const sameGroupPaperPieceMap = pieces
    .filter(paperPiece => paperPiece.groupId === groupId)
    .reduce(
      (acc, paperPiece) => {
        return { ...acc, [paperPiece.pieceId]: paperPiece };
      },
      {} as Record<number, PaperPiece>,
    );

  for (const paperPiece of Object.values(sameGroupPaperPieceMap)) {
    for (const [_direction, neighborPieceId] of Object.entries(
      getNeighborPieceIdMap(paperPiece.pieceId),
    )) {
      const direction = _direction as Direction;
      const isValid =
        !!neighborPieceId &&
        !!sameGroupPaperPieceMap[neighborPieceId] &&
        paperPiece.pieceId !== pieceId;

      if (!isValid) {
        continue;
      }

      fit({
        pieceId: paperPiece.pieceId,
        neighborPieceId,
        direction,
        recursive: false,
      });
    }
  }
};
