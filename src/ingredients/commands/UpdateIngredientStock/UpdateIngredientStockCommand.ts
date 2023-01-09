import { UpdateIngredientStockPayloadDto } from "./UpdateIngredientStockPayloadDto";

export class UpdateIngredientStockCommand {
  payload: UpdateIngredientStockPayloadDto;
  userId: string;

  constructor(request: UpdateIngredientStockPayloadDto, userId: string) {
    this.payload = request;
    this.userId = userId;
  }
}