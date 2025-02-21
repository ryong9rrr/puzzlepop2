import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Puzzle } from '../puzzles.schema';

export class PuzzlesRepository {
  constructor(
    @InjectModel(Puzzle.name) private readonly puzzleModel: Model<Puzzle>,
  ) {}

  async findPuzzleList(props: { limit: number; cursor?: string }) {
    const { limit, cursor } = props;
    const query: {
      createdAt?: { $gt: Date };
    } = {};
    if (cursor) {
      const lastPuzzle = await this.findPuzzleById(cursor);
      if (lastPuzzle) {
        query.createdAt = { $gt: lastPuzzle.createdAt };
      }
    }

    const puzzleList = await this.puzzleModel
      .find(query)
      .sort({ createdAt: 1 })
      .limit(limit)
      .exec();

    const getNextCursor = () => {
      if (puzzleList.length < limit) {
        return null;
      }
      const lastPuzzle = puzzleList[puzzleList.length - 1];
      return lastPuzzle._id === cursor ? null : lastPuzzle._id;
    };

    return {
      puzzleList,
      nextCursor: getNextCursor(),
    };
  }

  async findPuzzleById(id: string) {
    try {
      const puzzle = await this.puzzleModel.findById(id);
      return puzzle ?? null;
      // eslint-disable-next-line
    } catch (error) {
      return null;
    }
  }

  async createPuzzle(props: {
    title: string;
    description: string;
    tags: string[] | null;
    filename: string;
    uploader: {
      id: string;
      name: string;
    };
  }) {
    const { title, description, tags, filename, uploader } = props;
    const puzzle = await this.puzzleModel.create({
      title,
      description,
      tags,
      filename,
      uploader,
    });
    return puzzle;
  }
}
