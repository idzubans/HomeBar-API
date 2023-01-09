import { Decimal } from "@prisma/client/runtime";
import { DrinkColor } from "./DrinkColorEnum";
import { GlassType } from "./GlassTypeEnum";
import { MeasurementUnit } from "./MeasurementUnitEnum";

export class DrinkDto {
  id: string;
  name: string;
  imageUrl: string;
  tutorialUrl: string;
  color: DrinkColor;
  glass: GlassType;
  categories: CategoryDto[];
  ingredients: RecipePartDto[];
}

class RecipePartDto {
  id: string;
  name: string;
  amount: Decimal;
  unit: MeasurementUnit;
}

class CategoryDto {
  id: string;
  name: string;
}