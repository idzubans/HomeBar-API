import { Controller, UseGuards, Body, Post, Put, Param, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../auth/guards/JwtAuthGuard';
import { CreateDrinkCommand } from './commands/CreateDrink/CreateDrinkCommand';
import { DrinkPayloadDto } from './commands/DrinkPayloadDto';
import { UpdateDrinkCommand } from './commands/UpdateDrink/UpdateDrinkCommand';
import { DrinkDto } from './DrinkDto';
import { GetDrinkByIdQuery } from './queries/GetById/GetDrinkByIdQuery';

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

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async UpdateDrink(@Body() body: DrinkPayloadDto, @Param() params): Promise<DrinkDto> {
    return await this.commandBus.execute(
      new UpdateDrinkCommand(body, params.id)
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async GetDrinkById(@Param() params): Promise<DrinkDto> {
    return await this.queryBus.execute(
      new GetDrinkByIdQuery(params.id)
    );
  }
}
