import { Injectable, NestMiddleware, Req, Res } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../../modules/auth/auth.service';
import * as casual from 'casual';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    if (!req?.cookies?.token) {
      const randomCookie = casual.uuid;
      res.cookie('token', randomCookie);
    }

    try {
      await this.authService.validateUser(req?.cookies?.token as string);
      next();
    } catch (error: unknown) {
      console.error(error);
      return res.status(401).send('Unauthorized');
    }
  }
}
