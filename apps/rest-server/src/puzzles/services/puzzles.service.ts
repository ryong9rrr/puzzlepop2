import { HttpException, Injectable } from '@nestjs/common';
import { GameLevel } from '@puzzlepop2/game-core';
import { PuzzlesRepository } from '../repositories/puzzles.repository';
import { validateNSFW, createNewFile, createCDNImage } from './upload-image';

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

    const src = [
      ...puzzle.readOnlyData.imgUrl.split('/').slice(0, -1),
      `${level}.webp`,
    ].join('/');

    return {
      ...puzzle.readOnlyData,
      level,
      src,
    };
  }

  async uploadImage(file: Express.Multer.File) {
    // NSFW 체크
    const { nsfw, ...nsfwResult } = await validateNSFW(file);
    if (nsfw) {
      throw new HttpException('부적절한 이미지입니다.', 400);
    }

    // // 이미지 변환
    await createNewFile(file);
    await createCDNImage(file);

    return {
      file,
      nsfw: nsfwResult,
    };
  }
}
