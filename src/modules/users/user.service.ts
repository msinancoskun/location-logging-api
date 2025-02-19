import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createOne(userId: string): Promise<User> {
    return this.userRepository.createOne(userId);
  }

  async findOne(userId: string): Promise<User | null> {
    let user = await this.userRepository.findOne(userId);

    if (!user) {
      user = await this.createOne(userId);
    }

    return user;
  }
}
