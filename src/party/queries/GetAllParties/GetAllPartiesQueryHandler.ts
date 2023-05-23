import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { IngredientDto } from "src/ingredients/IngredientDto";
import { PartyDto } from "src/party/PartyDto";
import { PrismaService } from "src/prisma/PrismaService";
import { GetAllPartiesQuery } from "./GetAllPartiesQuery";

@QueryHandler(GetAllPartiesQuery)
export class GetAllPartiesQueryHandler implements IQueryHandler<GetAllPartiesQuery, PartyDto[]> {
  constructor(private prisma: PrismaService) { }

  async execute(query: GetAllPartiesQuery): Promise<PartyDto[]> {
  const dbQuery = {
      where: {
        userId: query.userId
      },
    }
    return await this.prisma.party.findMany(dbQuery)
  }
}