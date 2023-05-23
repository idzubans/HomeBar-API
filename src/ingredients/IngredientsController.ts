import { Controller, Request, UseGuards, Get, Put, Body } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { User } from 'src/UserParamDecorator';
import { JwtAuthGuard } from '../auth/guards/JwtAuthGuard';
import { UpdateIngredientStockCommand } from './commands/UpdateIngredientStock/UpdateIngredientStockCommand';
import { UpdateIngredientStockPayloadDto } from './commands/UpdateIngredientStock/UpdateIngredientStockPayloadDto';
import { IngredientDto } from './IngredientDto';
import { GetAllIngredientsQuery } from './queries/GetAllIngredients/GetAllIngredientsQuery';

@Controller('ingredients')
export class IngredientsController {
  constructor(
    private queryBus: QueryBus,
    private commandBus: CommandBus) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  async GetIngredients(@User() user): Promise<IngredientDto[]> {
    return await this.queryBus.execute(
      new GetAllIngredientsQuery(user.userId)
    );
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async UpdateIngredientStock(@User() user, @Body() body: UpdateIngredientStockPayloadDto): Promise<IngredientDto[]> {
    return await this.commandBus.execute(
      new UpdateIngredientStockCommand(body, user.userId)
    );
  }
}
