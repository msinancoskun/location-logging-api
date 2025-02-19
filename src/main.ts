import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { setupMiddleware } from './config/middleware.config';
import { setupSwagger } from './config/swagger.config';
import { setupValidation } from './config/validation.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: false,
    logger: ['error', 'warn', 'log'],
  });

  setupValidation(app);
  setupMiddleware(app);
  setupSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
