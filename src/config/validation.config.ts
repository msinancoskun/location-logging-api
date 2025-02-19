import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

export function setupValidation(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
}
