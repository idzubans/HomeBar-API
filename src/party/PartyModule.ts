import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from 'src/prisma/PrismaModule';
import { CreatePartyCommandHandler } from './commands/CreateParty/CreatePartyCommandHandler';
import { PartyController } from './PartyController';
import { GetAllPartiesQueryHandler } from './queries/GetAllParties/GetAllPartiesQueryHandler';
import { GetPartyByIdQueryHandler } from './queries/GetPartyById/GetPartyByIdQueryHandler';

export const CommandHandlers = [CreatePartyCommandHandler];
export const QueryHandlers = [GetPartyByIdQueryHandler, GetAllPartiesQueryHandler];

@Module({
  providers: [
    ...CommandHandlers,
    ...QueryHandlers
  ],
  controllers: [PartyController],
  imports: [CqrsModule, PrismaModule],
})
export class PartyModule { }
