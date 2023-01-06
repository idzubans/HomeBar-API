import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserByEmailQuery } from 'src/users/queries/getUserById/users.get-by-email.query';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private queryBus: QueryBus
  ) { }

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.queryBus.execute(
      new GetUserByEmailQuery(email)
    );
    if (!user) {
      return false;
    }
    return await bcrypt.compare(password, user.password);
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.userId };
    const {password, ...profile} = await this.queryBus.execute(
      new GetUserByEmailQuery(user.email)
    );
    return {
      access_token: this.jwtService.sign(payload),
      profile: profile
    };
  }
}
