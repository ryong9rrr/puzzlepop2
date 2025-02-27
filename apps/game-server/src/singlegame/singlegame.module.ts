import { Module } from '@nestjs/common';
import { SinglegameController } from './controllers/singlegame.controller';
import { SinglegameService } from './services/singlegame.service';
import { SinglegameRepository } from './repositories/singlegame.repository';
import { MongooseModule } from './singlegame.schema';

@Module({
  imports: [MongooseModule],
  controllers: [SinglegameController],
  providers: [SinglegameService, SinglegameRepository],
  exports: [],
})
export class SinglegameModule {}
