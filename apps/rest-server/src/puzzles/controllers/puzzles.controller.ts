import { Controller, Get, Param } from '@nestjs/common';
import { PuzzlesService } from '../services/puzzles.service';

// TODO: prefix 미들웨어 처리
@Controller('rest-server/puzzles')
export class PuzzlesController {
  constructor(private readonly puzzlesService: PuzzlesService) {}

  @Get()
  getPuzzleList() {
    return this.puzzlesService.getPuzzleList();
  }

  @Get(':id')
  getPuzzle(@Param('id') id: string) {
    return this.puzzlesService.getPuzzle(id);
  }
}
