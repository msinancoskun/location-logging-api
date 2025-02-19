import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as morgan from 'morgan';

@Injectable()
export class LoggingleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    morgan('short')(req, res, next);
  }
}
