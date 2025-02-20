import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PuzzlesService } from '../services/puzzles.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/static/multer';

@Controller('puzzles')
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

  @Post('upload')
  // TODO: Jwt가 필요하도록 변경
  @UseInterceptors(FileInterceptor('puzzle-image', multerOptions('puzzles')))
  uploadPuzzleImage(@UploadedFile() file: Express.Multer.File) {
    return this.puzzlesService.uploadPuzzleImage(file);
  }
}
