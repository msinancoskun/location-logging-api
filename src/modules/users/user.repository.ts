import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { IUser } from './user-repository.interface';
import * as casual from 'casual';

@Injectable()
export class UserRepository implements IUser {
  private readonly prisma: PrismaService = PrismaService.getInstance();

  constructor() {}

  async createOne(userId: string): Promise<User> {
    return await this.prisma.user.create({
      data: {
        id: userId,
        name: casual.name,
      },
    });
  }

  async findOne(userId: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }
}
