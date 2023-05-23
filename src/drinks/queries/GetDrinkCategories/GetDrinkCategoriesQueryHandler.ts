import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { PrismaService } from "src/prisma/PrismaService";
import { DrinkCategoryDto } from "./DrinkCategoryDto";
import { GetDrinkCategoriesQuery } from "./GetDrinkCategoriesQuery";

@QueryHandler(GetDrinkCategoriesQuery)
export class GetDrinkCategoriesQueryHandler implements IQueryHandler<GetDrinkCategoriesQuery, DrinkCategoryDto[]> {
  constructor(private prisma: PrismaService) { }

  async execute(query: GetDrinkCategoriesQuery): Promise<DrinkCategoryDto[]> {
    const dbQuery = {
      where: {
        drinks: {
          every: {
            ingredients: {
              every: {
                ingredient: {
                  bartenders: {
                    some: {
                      id: query.userId
                    }
                  }
                }
              }
            },
          }
        }
      }
    }
    return await this.prisma.category.findMany(dbQuery)
  }
}