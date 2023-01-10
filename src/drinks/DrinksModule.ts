import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from 'src/prisma/PrismaModule';
import { CreateDrinkCommandhandler } from './commands/CreateDrink/CreateDrinkCommandHandler';
import { UpdateDrinkCommandhandler } from './commands/UpdateDrink/UpdateDrinkCommandHandler';
import { DrinksController } from './DrinksController';
import { GetDrinkByIdQueryHandler } from './queries/GetById/GetDrinkByIdQueryHandler';

export const CommandHandlers = [CreateDrinkCommandhandler, UpdateDrinkCommandhandler];
export const QueryHandlers = [GetDrinkByIdQueryHandler];

@Module({
  providers: [
    ...CommandHandlers,
    ...QueryHandlers
  ],
  controllers: [DrinksController],
  imports: [CqrsModule, PrismaModule]
})
export class DrinksModule {}
