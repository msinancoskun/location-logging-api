import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AreaModule } from './modules/areas/area.module';
import { LoggingleMiddleware } from './common/middlewares/logging.middleware';
import { LocationModule } from './modules/locations/location.module';
import { LogModule } from './modules/logs/log.module';
import { DatabaseSeed } from './common/seed-database.provider';
import { RedisModule } from './database/redis/redis.module';
import { UserModule } from './modules/users/user.module';
import { AuthMiddleware } from './common/middlewares/auth.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [
    AreaModule,
    LocationModule,
    LogModule,
    RedisModule,
    UserModule,
    AuthModule,
  ],
  providers: [PrismaService, DatabaseSeed],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingleMiddleware, AuthMiddleware).forRoutes('*');
  }
}
