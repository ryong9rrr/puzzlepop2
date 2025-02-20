import { Module } from '@nestjs/common';
import { PuzzlesController } from './controllers/puzzles.controller';
import { PuzzlesService } from './services/puzzles.service';
import { PuzzlesRepository } from './repositories/puzzles.repository';
import { MulterModule } from 'src/static/multer';
import { MongooseModule } from './puzzles.schema';

@Module({
  imports: [MulterModule, MongooseModule],
  controllers: [PuzzlesController],
  providers: [PuzzlesService, PuzzlesRepository],
  exports: [],
})
export class PuzzlesModule {}
