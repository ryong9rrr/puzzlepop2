import { HttpException, Injectable } from '@nestjs/common';
import { GameLevel } from '@puzzlepop2/game-core';
import { PuzzlesRepository } from '../repositories/puzzles.repository';
import {
  createCDNImage,
  createNewFile,
  removeTempFile,
  validateNSFW,
} from './upload-image';

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
    let nsfwResult = {};

    // NSFW 체크
    try {
      nsfwResult = await validateNSFW(file);
    } catch (error) {
      removeTempFile(file.path);
      console.error(error);
      throw error;
    }

    try {
      // 이미지 변환
      const { newFilePath } = await createNewFile(file);
      await createCDNImage(file);
      // removeTempFile(newFilePath);
      return {
        newFilePath,
        nsfw: nsfwResult,
      };
    } catch (error) {
      // removeTempFile(newFilePath);
      console.error(error);
      throw new HttpException(error, 500);
    }
  }
}
