import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { PrismaService } from "src/prisma/PrismaService";
import { GetAllIngredientsDto } from "./GetAllIngredientsDto";
import { GetAllIngredientsQuery } from "./GetAllIngredientsQuery";

@QueryHandler(GetAllIngredientsQuery)
export class GetAllIngredientsQueryHandler implements IQueryHandler<GetAllIngredientsQuery> {
  constructor(private prisma: PrismaService) { }

  async execute(query: GetAllIngredientsQuery): Promise<GetAllIngredientsDto[]> {
    const response = await this.prisma.ingredient.findMany({ include: { bartenders: { select: { id: true } } } });
    return response.map(ingredient => {
      return {
        id: ingredient.id,
        name: ingredient.name,
        imageUrl: ingredient.imageUrl,
        isAvailable: ingredient.bartenders.some(user => user.id === query.userId)
      }
    })
  }
}