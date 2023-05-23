import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { PartyDto } from "src/party/PartyDto";
import { PrismaService } from "src/prisma/PrismaService";
import { GetPartyByIdQuery } from "./GetPartyByIdQuery";

@QueryHandler(GetPartyByIdQuery)
export class GetPartyByIdQueryHandler implements IQueryHandler<GetPartyByIdQuery, PartyDto> {
  constructor(private prisma: PrismaService) { }

  async execute(query: GetPartyByIdQuery): Promise<PartyDto> {
  const dbQuery = {
      where: {
        id: query.partyId
      },
    }
    return await this.prisma.party.findFirst(dbQuery)
  }
}