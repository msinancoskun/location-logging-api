import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
// import * as casual from 'casual';

@Injectable()
export class DatabaseSeed implements OnModuleDestroy {
  // onModuleInit() {
  // }

  async onModuleDestroy() {
    await PrismaService.getInstance().user.deleteMany();
  }
}
