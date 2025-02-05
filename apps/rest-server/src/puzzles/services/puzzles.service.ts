import { Injectable } from '@nestjs/common';
import { PuzzlesRepository } from '../repositories/puzzles.repository';

@Injectable()
export class PuzzlesService {
  constructor(private readonly puzzlesRepository: PuzzlesRepository) {}

  async getPuzzleList() {
    return this.puzzlesRepository.findPuzzleList();
  }
}
