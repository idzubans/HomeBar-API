import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from 'src/prisma/PrismaModule';
import { IngredientsController } from './IngredientsController';
import { GetAllIngredientsQueryHandler } from './queries/GetAllIngredients/GetAllIngredientsQueryHandler';

export const CommandHandlers = [];
export const QueryHandlers = [GetAllIngredientsQueryHandler];

@Module({
  providers: [
    ...CommandHandlers,
    ...QueryHandlers
  ],
  controllers: [IngredientsController],
  imports: [CqrsModule, PrismaModule]
})
export class IngredientsModule {}
