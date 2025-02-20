import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PuzzlesModule } from './puzzles/puzzles.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb://10.0.0.18:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.9',
    ),
    //MongooseModule.forRoot('mongodb://root:1234@localhost:27017/'),
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
