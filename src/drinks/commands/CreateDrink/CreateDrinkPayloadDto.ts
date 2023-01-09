import { DrinkColor } from "src/drinks/DrinkColorEnum";
import { GlassType } from "src/drinks/GlassTypeEnum";
import { MeasurementUnit } from "src/drinks/MeasurementUnitEnum";

export class CreateDrinkPayloadDto {
  ingredients: RecipePartPayloadDto[];
  name: string;
  imageUrl: string;
  tutorialUrl: string;
  color: DrinkColor;
  glass: GlassType;
  categories: string[];
}

class RecipePartPayloadDto {
  ingredientId: string;
  amount: number;
  unit: MeasurementUnit;
}