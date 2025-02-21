import { Controller, Get, Param, Query } from '@nestjs/common';
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
  getPuzzle(@Param('id') id: string) {
    return this.puzzlesService.getPuzzle(id);
  }
}
