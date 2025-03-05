import Paper from "paper";
import { Direction } from "@puzzlepop2/game-core";
import { BaseEngine } from "../base/Base";
import { FetchedData, OnMouseEventProps, PaperPiece } from "../base/types";
import { SinglegameEngineProps } from "./types";
import { fetchData } from "./fetchData";
import { findXChange, findXUp, findYChange, findYUp } from "./fittable-values";

export class SinglegameEngine extends BaseEngine {
  private currentMaxGroupId = 0;

  constructor(props: SinglegameEngineProps) {
    super(props);
  }

  async fetchData(): Promise<FetchedData> {
    try {
      const data = await fetchData({ src: this.src, level: this.gameLevel });

      data.pieces.forEach(piece => {
        this.currentMaxGroupId = Math.max(
          this.currentMaxGroupId,
          piece.groupId ? piece.groupId + 1 : 0,
        );
      });

      return data;
    } catch (error) {
      throw new Error(`게임 데이터를 받아오는 중 오류가 발생했습니다. ${error}`);
    }
  }

  onMouseEnter(props: OnMouseEventProps): void {
    const { event, paperPiece } = props;
  }

  onMouseLeave(props: OnMouseEventProps): void {
    const { event, paperPiece } = props;
  }

  onMouseDown(props: OnMouseEventProps): void {
    const { event, paperPiece } = props;

    if (paperPiece.groupId === null) {
      event.target.bringToFront();
      return;
    }

    this.paperPieceList
      .filter(anotherPaperPiece => anotherPaperPiece.groupId === paperPiece.groupId)
      .forEach(anotherPaperPiece => {
        anotherPaperPiece.piece.bringToFront();
      });
  }

  onMouseDrag(props: OnMouseEventProps): void {
    const { event, paperPiece } = props;

    const px = paperPiece.piece.position.x;
    const py = paperPiece.piece.position.y;

    const nx = Math.min(
      Math.max(paperPiece.piece.position.x + event.delta.x, Math.floor(this.pieceSize / 2)),
      Paper.view.viewSize.width - Math.floor(this.pieceSize / 2),
    );
    const ny = Math.min(
      Math.max(paperPiece.piece.position.y + event.delta.y, Math.floor(this.pieceSize / 2)),
      Paper.view.viewSize.height - Math.floor(this.pieceSize / 2),
    );

    if (paperPiece.groupId === null) {
      paperPiece.piece.position = new Paper.Point(nx, ny);
      return;
    }

    this.paperPieceList
      .filter(anotherPaperPiece => anotherPaperPiece.groupId === paperPiece.groupId)
      .forEach(anotherPaperPiece => {
        anotherPaperPiece.piece.position = new Paper.Point(
          anotherPaperPiece.piece.position.x + nx - px,
          anotherPaperPiece.piece.position.y + ny - py,
        );
      });
  }

  onMouseUp(props: OnMouseEventProps): void {
    const { paperPiece } = props;

    if (paperPiece.groupId !== null) {
      this.paperPieceList
        .filter(
          anotherPaperPiece =>
            anotherPaperPiece.groupId === paperPiece.groupId &&
            anotherPaperPiece.pieceId !== paperPiece.pieceId,
        )
        .forEach(anotherPaperPiece => {
          this.fitNeighborPieces(anotherPaperPiece);
        });
    }
    this.fitNeighborPieces(paperPiece);
  }

  private fitNeighborPieces(paperPiece: PaperPiece) {
    for (const [_direction, neighborPieceId] of Object.entries(
      this.getNeighborPieceIdMap(paperPiece.pieceId),
    )) {
      const direction = _direction as Direction;

      const 피스가_들어갈_자리가_없다면 =
        neighborPieceId === null ||
        this.isFittable({
          pieceId: paperPiece.pieceId,
          neighborPieceId,
          direction,
        });

      if (피스가_들어갈_자리가_없다면) {
        continue;
      }

      this.fit({
        pieceId: paperPiece.pieceId,
        neighborPieceId,
        direction,
        recursive: true,
      });
    }
  }

  private fit = (props: {
    pieceId: number;
    neighborPieceId: number;
    direction: Direction;
    recursive: boolean;
    isCombo?: boolean;
  }) => {
    const { pieceId, neighborPieceId, direction, recursive, isCombo = false } = props;

    const nowTile = this.paperPieceList[pieceId]!.piece;
    const preTile = this.paperPieceList[neighborPieceId]!.piece;

    const nowShape = this.bundles[pieceId]!.shape;
    const preShape = this.bundles[neighborPieceId]!.shape;

    const xChange = findXChange(nowShape, preShape);
    const yChange = findYChange(nowShape, preShape);
    const xUp = findXUp(nowShape, preShape);
    const yUp = findYUp(nowShape, preShape);

    const ERROR_RANGE = this.pieceSize * 0.2;
    let canMerge = false;

    switch (direction) {
      case "left":
        if (
          (Math.abs(nowTile.position.x - this.pieceSize - preTile.position.x) < ERROR_RANGE &&
            Math.abs(nowTile.position.y - preTile.position.y) < ERROR_RANGE) ||
          !recursive
        ) {
          nowTile.position = new Paper.Point(
            preTile.position.x + this.pieceSize + xChange,
            preTile.position.y + yChange,
          );
          canMerge = true;

          //sendFitTilePosition(nowTile, nowIndex);
        }
        break;
      case "right":
        if (
          (Math.abs(preTile.position.x - this.pieceSize - nowTile.position.x) < ERROR_RANGE &&
            Math.abs(nowTile.position.y - preTile.position.y) < ERROR_RANGE) ||
          !recursive
        ) {
          nowTile.position = new Paper.Point(
            preTile.position.x - (this.pieceSize + xChange),
            preTile.position.y + yChange,
          );
          canMerge = true;

          //sendFitTilePosition(nowTile, nowIndex);
        }
        break;
      case "top":
        if (
          (Math.abs(preTile.position.y + this.pieceSize - nowTile.position.y) < ERROR_RANGE &&
            Math.abs(nowTile.position.x - preTile.position.x) < ERROR_RANGE) ||
          !recursive
        ) {
          nowTile.position = new Paper.Point(
            preTile.position.x + xUp,
            preTile.position.y + this.pieceSize + yUp,
          );
          canMerge = true;

          //sendFitTilePosition(nowTile, nowIndex);
        }
        break;
      case "bottom":
        if (
          (Math.abs(nowTile.position.y + this.pieceSize - preTile.position.y) < ERROR_RANGE &&
            Math.abs(nowTile.position.x - preTile.position.x) < ERROR_RANGE) ||
          !recursive
        ) {
          nowTile.position = new Paper.Point(
            preTile.position.x + xUp,
            preTile.position.y - (this.pieceSize + yUp),
          );
          canMerge = true;

          //sendFitTilePosition(nowTile, nowIndex);
        }
        break;
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

    if (recursive && canMerge) {
      this.mergeGroup({ pieceId, neighborPieceId, isSender: true });
    }
  };

  private mergeGroup = (props: {
    pieceId: number;
    neighborPieceId: number;
    isSender?: boolean;
    isCombo?: boolean;
  }) => {
    const { pieceId, neighborPieceId, isSender = false, isCombo = false } = props;

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

    const pieceGroupId = this.paperPieceList[pieceId]!.groupId;
    const neighborPieceGroupId = this.paperPieceList[neighborPieceId]!.groupId;

    if (pieceGroupId !== null) {
      if (neighborPieceGroupId === null) {
        this.paperPieceList[neighborPieceId]!.groupId = pieceGroupId;
      } else {
        this.paperPieceList.forEach(paperPiece => {
          if (paperPiece.groupId === pieceGroupId) {
            paperPiece.groupId = neighborPieceGroupId;
          }
        });
      }
    } else {
      if (neighborPieceGroupId !== null) {
        this.paperPieceList[pieceId]!.groupId = neighborPieceGroupId;
      } else {
        this.paperPieceList[pieceId]!.groupId = this.currentMaxGroupId + 1;
        this.paperPieceList[neighborPieceId]!.groupId = this.currentMaxGroupId + 1;
        this.currentMaxGroupId += 1;
      }
    }

    if (isCombo) {
      //comboFit({ config, nowIndex, preIndex, direction });
    } else {
      this.fitGroup({ groupId: this.paperPieceList[pieceId]!.groupId, pieceId });
    }
  };

  private fitGroup = (props: { groupId: number | null; pieceId: number }) => {
    const { groupId, pieceId } = props;

    if (groupId === null) {
      return;
    }

    const sameGroupPaperPieceMap = this.paperPieceList
      .filter(paperPiece => paperPiece.groupId === groupId)
      .reduce(
        (acc, paperPiece) => {
          return { ...acc, [paperPiece.pieceId]: paperPiece };
        },
        {} as Record<number, PaperPiece>,
      );

    for (const paperPiece of Object.values(sameGroupPaperPieceMap)) {
      for (const [_direction, neighborPieceId] of Object.entries(
        this.getNeighborPieceIdMap(paperPiece.pieceId),
      )) {
        const direction = _direction as Direction;
        const isValid =
          !!neighborPieceId &&
          !!sameGroupPaperPieceMap[neighborPieceId] &&
          paperPiece.pieceId !== pieceId;

        if (!isValid) {
          continue;
        }

        this.fit({
          pieceId: paperPiece.pieceId,
          neighborPieceId,
          direction,
          recursive: false,
        });
      }
    }
  };
}
