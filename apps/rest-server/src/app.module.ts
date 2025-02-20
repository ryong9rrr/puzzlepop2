import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PuzzlesModule } from './puzzles/puzzles.module';
import { MongooseModule } from '@nestjs/mongoose';

const MONGO_URI =
  process.env.NODE_ENV === 'production'
    ? 'mongodb://puzzlepop2-mongodb:27017/'
    : 'mongodb://root:1234@localhost:27017/';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(MONGO_URI),
    PuzzlesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
