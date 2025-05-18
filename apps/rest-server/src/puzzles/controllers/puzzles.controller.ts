import {
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PuzzlesService } from '../services/puzzles.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { createUnique } from 'src/static/createUnique';

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

  // 이미지를 업로드하는 메서드
  @Post('upload-image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'uploads',
        filename: (req, file, cb) => {
          cb(null, `${createUnique()}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.puzzlesService.uploadImage(file);
  }
}
