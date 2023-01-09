class UpdateIngredientStockDto {
  id: string;
  isAvailable: boolean
}

export class UpdateIngredientStockPayloadDto {
  ingredients: UpdateIngredientStockDto[];
}
