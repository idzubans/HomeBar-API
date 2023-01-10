import { Controller, UseGuards, Body, Post, Put, Param, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { User } from 'src/UserParamDecorator';
import { JwtAuthGuard } from '../auth/guards/JwtAuthGuard';
import { CreateDrinkCommand } from './commands/CreateDrink/CreateDrinkCommand';
import { DrinkPayloadDto } from './commands/DrinkPayloadDto';
import { UpdateDrinkCommand } from './commands/UpdateDrink/UpdateDrinkCommand';
import { DrinkDto } from './DrinkDto';
import { GetDrinkByIdQuery } from './queries/GetById/GetDrinkByIdQuery';
import { DrinkCategoryDto } from './queries/GetDrinkCategories/DrinkCategoryDto';
import { GetDrinkCategoriesQuery } from './queries/GetDrinkCategories/GetDrinkCategoriesQuery';
import { SearchDrinksQuery } from './queries/Search/SearchDrinksQuery';
import { SearchParamsDto } from './queries/Search/SearchParamsDto';

@Controller('drinks')
export class DrinksController {
  constructor(
    private queryBus: QueryBus,
    private commandBus: CommandBus) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async CreateDrink(@Body() body: DrinkPayloadDto): Promise<DrinkDto> {
    return await this.commandBus.execute(
      new CreateDrinkCommand(body)
    );
  }

  @Get('/categories')
  @UseGuards(JwtAuthGuard)
  async GetCategories(@User() user): Promise<DrinkCategoryDto[]> {
    return await this.queryBus.execute(
      new GetDrinkCategoriesQuery(user.id)
    );
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async UpdateDrink(@Body() body: DrinkPayloadDto, @Param('id') id: string): Promise<DrinkDto> {
    return await this.commandBus.execute(
      new UpdateDrinkCommand(body, id)
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async GetDrinkById(@Param('id') id: string): Promise<DrinkDto> {
    return await this.queryBus.execute(
      new GetDrinkByIdQuery(id)
    );
  }

  @Post('search')
  @UseGuards(JwtAuthGuard)
  async SearchDrinks(@Body() body: SearchParamsDto): Promise<DrinkDto[]> {
    return await this.queryBus.execute(
      new SearchDrinksQuery(body)
    );
  }
}
