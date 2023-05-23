import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { IngredientDto } from "src/ingredients/IngredientDto";
import { PrismaService } from "src/prisma/PrismaService";
import { GetAllIngredientsQuery } from "./GetAllIngredientsQuery";

@QueryHandler(GetAllIngredientsQuery)
export class GetAllIngredientsQueryHandler implements IQueryHandler<GetAllIngredientsQuery, IngredientDto[]> {
  constructor(private prisma: PrismaService) { }

  async execute(query: GetAllIngredientsQuery): Promise<IngredientDto[]> {
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