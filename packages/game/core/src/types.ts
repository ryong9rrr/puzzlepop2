export type GameMode = "single" | "multi";
export type GameLevel = "easy" | "normal" | "hard";

export type PuzzleMap = {
  id: string;
  src: string;
  title: string;
  description: string;
  uploader: string;
  tags: string[];
  naturalWidth: number;
  naturalHeight: number;
  possiblePieceWidth: {
    [key in GameLevel]: number;
  };
};

export type SingleGamePuzzleMap = {
  mode: GameMode;
  imageWidth: number;
  imageHeight: number;
  pieceWidth: number;
} & Omit<PuzzleMap, "naturalWidth" | "naturalHeight" | "possiblePieceWidth">;

export type SingleGamePuzzle = {
  id: string;
  src: string;
  title: string;
  description: string;
  uploader: string;
  tags: string[];
};
