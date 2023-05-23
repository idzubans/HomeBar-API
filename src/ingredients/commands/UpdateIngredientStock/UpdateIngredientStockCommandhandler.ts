import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { IngredientDto } from "src/ingredients/IngredientDto";
import { PrismaService } from "src/prisma/PrismaService";
import { UpdateIngredientStockCommand } from "./UpdateIngredientStockCommand";

@CommandHandler(UpdateIngredientStockCommand)
export class UpdateIngredientStockCommandhandler implements ICommandHandler<UpdateIngredientStockCommand, IngredientDto[]> {
  constructor(private prisma: PrismaService) { }

  async execute(command: UpdateIngredientStockCommand) {
    const promises = command.payload.ingredients.map(async ingredient => {
      return await this.prisma.ingredient.update({
        where: { id: ingredient.id },
        data: {
          bartenders:
            this.getRelationQuery(ingredient.isAvailable, command.userId)
        },
        include: { bartenders: { select: { id: true } } }
      })
    })

    const response = await Promise.all(promises);
    return response.map(ingredient => {
      return {
        id: ingredient.id,
        name: ingredient.name,
        imageUrl: ingredient.imageUrl,
        isAvailable: ingredient.bartenders.some(user => user.id === command.userId)
      }
    })
  }

  getRelationQuery(isAvailable: boolean, userId: string) {
    return isAvailable ? { connect: { id: userId } } : { disconnect: { id: userId } }
  }
}