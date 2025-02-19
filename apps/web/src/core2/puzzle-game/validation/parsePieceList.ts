import { PuzzlePiece } from "../../types";

export const save = (props: { pieceList: PuzzlePiece[] }) => {
  const { pieceList } = props;
  window.sessionStorage.setItem("pieceList", JSON.stringify(pieceList));
};

export const load = () => {
  const prevPieceList = window.sessionStorage.getItem("pieceList");
  if (!prevPieceList) {
    return null;
  }

  const parsedPieceList = JSON.parse(prevPieceList);

  try {
    if (!Array.isArray(parsedPieceList)) {
      throw new Error("Type is not array");
    }

    for (const piece of parsedPieceList) {
      for (const [key, value] of Object.entries(piece)) {
        if (!["index", "shape", "groupId", "position"].includes(key)) {
          throw new Error("Invalid key");
        }

        if (key === "index") {
          if (typeof value !== "number") {
            throw new Error("Type is not number");
          }
        }

        if (key === "shape") {
          if (typeof value !== "object") {
            throw new Error("Type is not object");
          }

          // @ts-ignore
          for (const [shapeKey, shapeValue] of Object.entries(value)) {
            if (
              !["top", "right", "bottom", "left"].includes(shapeKey) ||
              typeof shapeValue !== "number"
            ) {
              throw new Error("Invalid shape key");
            }
          }
        }

        if (key === "groupId") {
          if (value !== null && typeof value !== "number") {
            throw new Error("Type is not number");
          }
        }

        if (key === "position") {
          if (typeof value !== "object") {
            throw new Error("Type is not object");
          }

          // @ts-ignore
          for (const [positionKey, positionValue] of Object.entries(value)) {
            if (!["x", "y"].includes(positionKey) || typeof positionValue !== "number") {
              throw new Error("Invalid position key");
            }
          }
        }
      }
    }
  } catch (error) {
    console.error(error);
    return null;
  }

  return parsedPieceList as PuzzlePiece[];
};
