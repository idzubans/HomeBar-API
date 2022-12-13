import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserRequest } from './users.model';
import {hash} from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getByEmail(email: string): Promise<User | undefined> {
    return this.prisma.user.findFirst({ where: { email: email }});
  }

  async createUser(user: CreateUserRequest): Promise<User | undefined> {
    return this.prisma.user.create({
      data: {
        ...user,
        password: await hash(user.password, 10)
      }
    });
  }
}
