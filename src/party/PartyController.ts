import { Controller, UseGuards, Body, Post, Get, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { User } from 'src/UserParamDecorator';
import { JwtAuthGuard } from '../auth/guards/JwtAuthGuard';
import { CreatePartyCommand } from './commands/CreateParty/CreatePartyCommand';
import { CreatePartyPayloadDto } from './commands/CreateParty/CreatePartyPayloadDto';
import { PartyDto } from './PartyDto';
import { GetAllPartiesQuery } from './queries/GetAllParties/GetAllPartiesQuery';
import { GetPartyByIdQuery } from './queries/GetPartyById/GetPartyByIdQuery';

@Controller('parties')
export class PartyController {
  constructor(
    private queryBus: QueryBus,
    private commandBus: CommandBus) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async CreateParty(@User() user, @Body() body: CreatePartyPayloadDto): Promise<PartyDto> {
    return await this.commandBus.execute(
      new CreatePartyCommand(body, user.userId)
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async GetById(@Param('id') id: string): Promise<PartyDto> {
    return await this.queryBus.execute(
      new GetPartyByIdQuery(id)
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async GetAllParties(@User() user): Promise<PartyDto[]> {
    return await this.queryBus.execute(
      new GetAllPartiesQuery(user.userId)
    );
  }
}
