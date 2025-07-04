import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에서 정의하지 않은 프로퍼티는 자동으로 제거
      transform: true, // 요청 데이터를 DTO 클래스 타입으로 자동 변환
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('rest-server');

  // production에서는 Nginx가 해줄거임
  if (process.env.NODE_ENV !== 'production') {
    // http://localhost:8080/cdn/puzzles/... 로 접근 가능
    app.useStaticAssets(`${__dirname}/uploads`, {
      prefix: '/cdn',
    });

    app.enableCors({
      origin: ['http://localhost:3000'],
      credentials: true,
    });
  }

  await app.listen(8080, '0.0.0.0');
}

bootstrap();
