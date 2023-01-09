import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from 'src/prisma/PrismaModule';
import { UpdateIngredientStockCommandhandler } from './commands/UpdateIngredientStock/UpdateIngredientStockCommandhandler';
import { IngredientsController } from './IngredientsController';
import { GetAllIngredientsQueryHandler } from './queries/GetAllIngredients/GetAllIngredientsQueryHandler';

export const CommandHandlers = [UpdateIngredientStockCommandhandler];
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
