import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from 'src/prisma/PrismaModule';
import { CreateUserCommandHandler } from './commands/createUser/CreateUserCommandHandler';
import { GetUserByEmailQueryHandler } from './queries/getUserById/GetUserByEmailQueryHandler';

export const CommandHandlers = [CreateUserCommandHandler];
export const QueryHandlers = [GetUserByEmailQueryHandler];

@Module({
  providers: [
    ...CommandHandlers,
    ...QueryHandlers
  ],
  exports: [
    ...CommandHandlers,
    ...QueryHandlers
  ],
  imports: [CqrsModule, PrismaModule],
})
export class UsersModule { }
