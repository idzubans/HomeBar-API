import { Controller, Request, UseGuards, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { User } from 'src/UserParamDecorator';
import { JwtAuthGuard } from '../auth/guards/JwtAuthGuard';
import { GetAllIngredientsDto } from './queries/GetAllIngredients/GetAllIngredientsDto';
import { GetAllIngredientsQuery } from './queries/GetAllIngredients/GetAllIngredientsQuery';

@Controller('ingredients')
export class IngredientsController {
  constructor(
    private queryBus: QueryBus) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getProfile(@User() user): Promise<GetAllIngredientsDto[]> {
    return await this.queryBus.execute(
      new GetAllIngredientsQuery(user.userId)
    );
  }
}
