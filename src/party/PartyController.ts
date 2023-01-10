import { Controller, UseGuards, Body, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { User } from 'src/UserParamDecorator';
import { JwtAuthGuard } from '../auth/guards/JwtAuthGuard';
import { CreatePartyCommand } from './commands/CreateParty/CreatePartyCommand';
import { CreatePartyPayloadDto } from './commands/CreateParty/CreatePartyPayloadDto';
import { PartyDto } from './PartyDto';

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
}
