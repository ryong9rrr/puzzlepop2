import { Controller, Get, HttpException, Param, Query } from '@nestjs/common';
import { PuzzlesService } from '../services/puzzles.service';

@Controller('puzzles')
export class PuzzlesController {
  constructor(private readonly puzzlesService: PuzzlesService) {}

  @Get()
  getPuzzleList(
    @Query('limit') limit = '10',
    @Query('cursor') cursor?: string,
  ) {
    return this.puzzlesService.getPuzzleList({
      limit: parseInt(limit, 10),
      cursor,
    });
  }

  @Get(':id')
  async getPuzzle(@Param('id') id: string, @Query('level') level?: string) {
    if (level !== 'easy' && level !== 'normal' && level !== 'hard') {
      throw new HttpException('Invalid level', 400);
    }
    const result = await this.puzzlesService.getPuzzle(id, level);
    return result;
  }
}
