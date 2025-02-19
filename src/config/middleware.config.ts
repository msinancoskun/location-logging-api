import { INestApplication } from '@nestjs/common';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

export function setupMiddleware(app: INestApplication): void {
  app.use(helmet());
  app.use(cookieParser(process.env.SECRET_KEY));
  app.use(
    session({
      secret: process.env.SECRET_KEY || 'your_secret_key', // TODO: This will be changed to a strong secret.
      resave: false,
      saveUninitialized: false,
      cookie: { httpOnly: true, secure: false }, // secure: true in production
    }),
  );
}
