import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PrismaService } from "src/prisma/PrismaService";
import { hash } from 'bcrypt';
import { CreatePartyCommand } from "./CreatePartyCommand";
import { PartyDto } from "src/party/PartyDto";
import { connect } from "http2";

@CommandHandler(CreatePartyCommand)
export class CreatePartyCommandHandler implements ICommandHandler<CreatePartyCommand> {
  constructor(private prisma: PrismaService) { }

  async execute(command: CreatePartyCommand): Promise<PartyDto> {
    const result = await this.prisma.party.create({
      data: {
        userId: command.bartenderId,
        name: command.Payload.name,
        endDate: command.Payload.endDate
      },
    })

    return {
      id: result.id,
      name: result.name,
      endDate: result.endDate,
    };
  }
}