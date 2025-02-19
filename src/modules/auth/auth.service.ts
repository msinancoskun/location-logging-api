import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(token: string): Promise<void> {
    await this.userService.findOne(token);
  }
}
