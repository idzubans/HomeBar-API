import { Decimal } from "@prisma/client/runtime";
import { DrinkColor } from "./DrinkColorEnum";
import { GlassType } from "./GlassTypeEnum";
import { MeasurementUnit } from "./MeasurementUnitEnum";
import { DrinkCategoryDto } from "./queries/GetDrinkCategories/DrinkCategoryDto";

export class DrinkDto {
  id: string;
  name: string;
  imageUrl: string;
  tutorialUrl: string;
  color: DrinkColor;
  glass: GlassType;
  categories: DrinkCategoryDto[];
  ingredients: RecipePartDto[];
}

class RecipePartDto {
  id: string;
  name: string;
  amount: Decimal;
  unit: MeasurementUnit;
}