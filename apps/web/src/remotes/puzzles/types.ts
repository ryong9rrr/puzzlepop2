export type Puzzle = {
  _id: string;
  title: string;
  description: string;
  imgUrl: string;
  tags: string[];
  uploaderId: string;
};

export type SingleGamePuzzle = {
  src: string;
} & Puzzle;
