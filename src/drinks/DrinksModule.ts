import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from 'src/prisma/PrismaModule';
import { CreateDrinkCommandhandler } from './commands/CreateDrink/CreateDrinkCommandHandler';
import { DrinksController } from './DrinksController';

export const CommandHandlers = [CreateDrinkCommandhandler];
export const QueryHandlers = [];

@Module({
  providers: [
    ...CommandHandlers,
    ...QueryHandlers
  ],
  controllers: [DrinksController],
  imports: [CqrsModule, PrismaModule]
})
export class DrinksModule {}
