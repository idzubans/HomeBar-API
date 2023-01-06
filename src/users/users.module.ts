import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CreateUserCommandHandler } from './commands/createUser/users.create.handler';
import { GetUserByEmailQueryHandler } from './queries/getUserById/users.get-by-email.handler';

export const CommandHandlers = [CreateUserCommandHandler];
export const QueryHandlers =  [GetUserByEmailQueryHandler];

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
export class UsersModule {}
