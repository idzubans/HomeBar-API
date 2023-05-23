import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DrinkDto } from "src/drinks/DrinkDto";
import { PrismaService } from "src/prisma/PrismaService";
import { GetDrinkByIdQuery } from "./GetDrinkByIdQuery";

@QueryHandler(GetDrinkByIdQuery)
export class GetDrinkByIdQueryHandler implements IQueryHandler<GetDrinkByIdQuery, DrinkDto> {
  constructor(private prisma: PrismaService) { }

  async execute(query: GetDrinkByIdQuery): Promise<DrinkDto> {
    const dbQuery = {
      where: {
        id: query.drinkId
      },
      include: {
        ingredients: {
          select: {
            ingredient: {
              select: {
                name: true,
                id: true
              }
            },
            amount: true,
            unit: true
          }
        },
        categories: {
          select: {
            id: true,
            name: true
          }
        }
      }
    }
    const dbResponse = await this.prisma.drink.findFirst(dbQuery);
    return {
      id: dbResponse.id,
      name: dbResponse.name,
      imageUrl: dbResponse.imageUrl,
      tutorialUrl: dbResponse.tutorialUrl,
      color: dbResponse.color,
      glass: dbResponse.glass,
      categories: dbResponse.categories,
      ingredients: dbResponse.ingredients.map(x => {
        return {
          name: x.ingredient.name,
          id: x.ingredient.id,
          amount: x.amount,
          unit: x.unit
        }
      })
    }
  }
}