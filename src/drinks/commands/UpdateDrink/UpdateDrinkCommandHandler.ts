import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DrinkDto } from "src/drinks/DrinkDto";
import { PrismaService } from "src/prisma/PrismaService";
import { UpdateDrinkCommand } from "./UpdateDrinkCommand";

@CommandHandler(UpdateDrinkCommand)
export class UpdateDrinkCommandhandler implements ICommandHandler<UpdateDrinkCommand, DrinkDto> {
  constructor(private prisma: PrismaService) { }

  async execute(command: UpdateDrinkCommand) {
    try {
      const updated = await this.prisma.drink.update({
        where: { id: command.drinkId },
        data: {
          name: command.payload.name,
          imageUrl: command.payload.imageUrl,
          tutorialUrl: command.payload.tutorialUrl,
          color: command.payload.color,
          glass: command.payload.glass,
          categories: {
            connectOrCreate:
              command.payload.categories.map(categoryName => {
                return {
                  where:
                  {
                    name: categoryName
                  },
                  create: {
                    name: categoryName
                  }
                }
              }),
          },
          ingredients: {
            deleteMany: {},
            create:
              command.payload.ingredients.map(i => {
                return { ingredient: { connect: { id: i.ingredientId } }, amount: i.amount, unit: i.unit }
              }),
          },
        },
        include: {
          ingredients: {
            select: {
              ingredient: {
                select: {
                  id: true,
                  name: true
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
      });

      return {
        id: updated.id,
        name: updated.name,
        imageUrl: updated.imageUrl,
        tutorialUrl: updated.tutorialUrl,
        color: updated.color,
        glass: updated.glass,
        categories: updated.categories,
        ingredients: updated.ingredients.map(x => { 
          return { 
            name: x.ingredient.name, 
            id: x.ingredient.id, 
            amount: x.amount, 
            unit: x.unit } 
          })
      }
    } catch (error) {
      throw new Error(`Drink with ID ${command.drinkId} does not exist in the database`);
    }
  }
}