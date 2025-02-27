import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { SinglegameService } from '../services/singlegame.service';
import { InitializePiecesDto } from '../singlegame.dto';

@Controller('singlegame')
export class SinglegameController {
  constructor(private readonly singlegameService: SinglegameService) {}

  @Post()
  async initializePieces(@Body() initializePiecesDto: InitializePiecesDto) {
    {
      const { src, level } = initializePiecesDto;

      if (level !== 'easy' && level !== 'normal' && level !== 'hard') {
        throw new HttpException('Invalid level', 400);
      }

      return this.singlegameService.initializePieces({ src, level });
    }
  }
}
