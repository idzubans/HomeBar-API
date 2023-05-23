import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DrinkDto } from "src/drinks/DrinkDto";
import { PrismaService } from "src/prisma/PrismaService";
import { SearchDrinksQuery } from "./SearchDrinksQuery";

@QueryHandler(SearchDrinksQuery)
export class SearchDrinksQueryHandler implements IQueryHandler<SearchDrinksQuery, DrinkDto[]> {
  constructor(private prisma: PrismaService) { }

  async execute(query: SearchDrinksQuery): Promise<DrinkDto[]> {
    const dbQuery = {
      where: {
        AND: [
          {
            ingredients: {
              every: {
                ingredient: {
                  bartenders: {
                    some: {
                      id: query.searchParams.bartenderId
                    }
                  }
                }
              }
            },
          }, {
            ...(query.searchParams.categories && {
              categories: {
                some: {
                  name: {
                    in: query.searchParams.categories
                  }
                }
              }
            })
          },
          {
            ...(query.searchParams.ingredients && {
              ingredients: {
                some: {
                  ingredient: {
                    name: {
                      in: query.searchParams.ingredients
                    }
                  }
                }
              }
            })
          },
          {
            ...(query.searchParams.searchString && {
              name: {
                contains: query.searchParams.searchString
              }
            })
          },
        ]

      },
      skip: query.searchParams.skip ? query.searchParams.skip : 0,
      take: query.searchParams.take ? query.searchParams.take : 10,
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
    const dbResponse = await this.prisma.drink.findMany(dbQuery);
    return dbResponse.map(drink => {
      return {
        id: drink.id,
        name: drink.name,
        imageUrl: drink.imageUrl,
        tutorialUrl: drink.tutorialUrl,
        color: drink.color,
        glass: drink.glass,
        categories: drink.categories,
        ingredients: drink.ingredients.map(x => {
          return {
            name: x.ingredient.name,
            id: x.ingredient.id,
            amount: x.amount,
            unit: x.unit
          }
        })
      }
    });
  }
}