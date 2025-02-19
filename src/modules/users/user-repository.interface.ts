import { User } from '@prisma/client';

export interface IUser {
  createOne(userId: string): Promise<User>;
  findOne(userId: string): Promise<User | null>;
}
