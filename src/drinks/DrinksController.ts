import { Controller, UseGuards, Body, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../auth/guards/JwtAuthGuard';
import { CreateDrinkCommand } from './commands/CreateDrink/CreateDrinkCommand';
import { CreateDrinkPayloadDto } from './commands/CreateDrink/CreateDrinkPayloadDto';
import { DrinkDto } from './DrinkDto';

@Controller('drinks')
export class DrinksController {
  constructor(
    private queryBus: QueryBus,
    private commandBus: CommandBus) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async CreateDrink(@Body() body: CreateDrinkPayloadDto): Promise<DrinkDto> {
    return await this.commandBus.execute(
      new CreateDrinkCommand(body)
    );
  }
}
