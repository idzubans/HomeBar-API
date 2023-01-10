import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from 'src/prisma/PrismaModule';
import { CreatePartyCommandHandler } from './commands/CreateParty/CreatePartyCommandHandler';
import { PartyController } from './PartyController';

export const CommandHandlers = [CreatePartyCommandHandler];
export const QueryHandlers = [];

@Module({
  providers: [
    ...CommandHandlers,
    ...QueryHandlers
  ],
  controllers: [PartyController],
  imports: [CqrsModule, PrismaModule],
})
export class PartyModule { }
