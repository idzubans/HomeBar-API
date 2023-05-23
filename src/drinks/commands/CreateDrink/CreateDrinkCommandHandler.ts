import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DrinkDto } from "src/drinks/DrinkDto";
import { PrismaService } from "src/prisma/PrismaService";
import { CreateDrinkCommand } from "./CreateDrinkCommand";

@CommandHandler(CreateDrinkCommand)
export class CreateDrinkCommandhandler implements ICommandHandler<CreateDrinkCommand, DrinkDto> {
  constructor(private prisma: PrismaService) { }

  async execute(command: CreateDrinkCommand) {
    const created = await this.prisma.drink.create({
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
      id: created.id,
      name: created.name,
      imageUrl: created.imageUrl,
      tutorialUrl: created.tutorialUrl,
      color: created.color,
      glass: created.glass,
      categories: created.categories,
      ingredients: created.ingredients.map(x => { 
        return { 
          name: x.ingredient.name, 
          id: x.ingredient.id, 
          amount: x.amount, 
          unit: x.unit } 
        })
    }
  }
}