import { HttpException, Injectable } from '@nestjs/common';
import { GameLevel } from '@puzzlepop2/game-core';
import { PuzzlesRepository } from '../repositories/puzzles.repository';

@Injectable()
export class PuzzlesService {
  constructor(private readonly puzzlesRepository: PuzzlesRepository) {}

  async getPuzzleList(props: { limit: number; cursor?: string }) {
    const { limit, cursor } = props;
    const result = await this.puzzlesRepository.findPuzzleList({
      limit,
      cursor,
    });
    return result;
  }

  async getPuzzle(id: string, level: GameLevel) {
    const puzzle = await this.puzzlesRepository.findPuzzleById(id);
    if (!puzzle) {
      throw new HttpException('Puzzle not found', 404);
    }

    const result = { ...puzzle.readOnlyData };
    const srcStringArray = result.imgUrl.split('/');
    srcStringArray.pop();
    const src = [...srcStringArray, `${level}.webp`].join('/');

    return {
      ...result,
      src,
    };
  }
}
