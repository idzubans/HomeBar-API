import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.usersService.getByEmail(email);
    if (!user) {
      return false;
    }
    return await bcrypt.compare(password, user.password);
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.userId };
    const profile = await this.usersService.getByEmail(user.email);
    return {
      access_token: this.jwtService.sign(payload),
      profile: profile
    };
  }
}
