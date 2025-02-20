import { HttpException, Injectable } from '@nestjs/common';
import { PuzzlesRepository } from '../repositories/puzzles.repository';

@Injectable()
export class PuzzlesService {
  constructor(private readonly puzzlesRepository: PuzzlesRepository) {}

  async getPuzzleList() {
    const puzzleList = await this.puzzlesRepository.findPuzzleList();
    return puzzleList;
  }

  async getPuzzle(id: string) {
    const puzzle = await this.puzzlesRepository.findPuzzleById(id);
    if (!puzzle) {
      throw new HttpException('Puzzle not found', 404);
    }
    return puzzle;
  }

  uploadPuzzleImage(file: Express.Multer.File) {
    console.log(file);
  }
}
