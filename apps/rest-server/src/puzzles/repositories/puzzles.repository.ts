import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Puzzle } from '../puzzles.schema';
import { HttpException } from '@nestjs/common';

export class PuzzlesRepository {
  constructor(
    @InjectModel(Puzzle.name) private readonly puzzleModel: Model<Puzzle>,
  ) {}

  // TODO: pagination
  async findPuzzleList() {
    const puzzles = await this.puzzleModel.find();
    return puzzles;
  }

  async findPuzzleById(id: string) {
    try {
      const puzzle = await this.puzzleModel.findById(id);
      return puzzle ?? null;
      // eslint-disable-next-line
    } catch (error) {
      throw new HttpException('Puzzle not found', 404);
    }
  }
}
