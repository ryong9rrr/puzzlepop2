import { Module } from '@nestjs/common';
import { PuzzlesController } from './controllers/puzzles.controller';
import { PuzzlesService } from './services/puzzles.service';
import { PuzzlesRepository } from './repositories/puzzles.repository';

@Module({
  imports: [],
  controllers: [PuzzlesController],
  providers: [PuzzlesService, PuzzlesRepository],
  exports: [],
})
export class PuzzlesModule {}
