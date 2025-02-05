import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: () => void) {
    res.on('finish', () => {
      this.logger.log(
        `[${req.originalUrl}] ${req.ip} ${req.method} ${res.statusCode}`,
      );
    });

    next();
  }
}
