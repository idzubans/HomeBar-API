/*
  Warnings:

  - The values [Red,Green,Yellow,Blue,Orange,Brown,White,Pink,Purple,Black] on the enum `Color` will be removed. If these variants are still used in the database, this will fail.
  - The values [HighBall,LowBall,Martini,Margarita,Coup] on the enum `GlassType` will be removed. If these variants are still used in the database, this will fail.
  - The values [Oz,Ml,Dash,Slice,Peel,Whole,Spoon] on the enum `MeasurementUnit` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Color_new" AS ENUM ('RED', 'GREEN', 'YELLOW', 'BLUE', 'ORANGE', 'BROWN', 'WHITE', 'PINK', 'PURPLE', 'BLACK');
ALTER TABLE "Drink" ALTER COLUMN "color" TYPE "Color_new" USING ("color"::text::"Color_new");
ALTER TYPE "Color" RENAME TO "Color_old";
ALTER TYPE "Color_new" RENAME TO "Color";
DROP TYPE "Color_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "GlassType_new" AS ENUM ('HIGH_BALL', 'LOW_BALL', 'MARTINI', 'MARGARITA', 'COUP');
ALTER TABLE "Drink" ALTER COLUMN "glass" TYPE "GlassType_new" USING ("glass"::text::"GlassType_new");
ALTER TYPE "GlassType" RENAME TO "GlassType_old";
ALTER TYPE "GlassType_new" RENAME TO "GlassType";
DROP TYPE "GlassType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "MeasurementUnit_new" AS ENUM ('OZ', 'ML', 'DASH', 'SLICE', 'PEEL', 'WHOLE', 'SPOON');
ALTER TABLE "RecipePart" ALTER COLUMN "unit" TYPE "MeasurementUnit_new" USING ("unit"::text::"MeasurementUnit_new");
ALTER TYPE "MeasurementUnit" RENAME TO "MeasurementUnit_old";
ALTER TYPE "MeasurementUnit_new" RENAME TO "MeasurementUnit";
DROP TYPE "MeasurementUnit_old";
COMMIT;
