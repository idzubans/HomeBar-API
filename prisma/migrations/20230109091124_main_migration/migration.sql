/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `surname` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Color" AS ENUM ('Red', 'Green', 'Yellow', 'Blue', 'Orange', 'Brown', 'White', 'Pink', 'Purple', 'Black');

-- CreateEnum
CREATE TYPE "GlassType" AS ENUM ('HighBall', 'LowBall', 'Martini', 'Margarita', 'Coup');

-- CreateEnum
CREATE TYPE "MeasurementUnit" AS ENUM ('Oz', 'Ml', 'Dash', 'Slice', 'Peel', 'Whole', 'Spoon');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Pending', 'Received', 'Canceled', 'Done');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
DROP COLUMN "surname",
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT;

-- CreateTable
CREATE TABLE "Drink" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "tutorialUrl" TEXT,
    "color" "Color" NOT NULL,
    "glass" "GlassType" NOT NULL,

    CONSTRAINT "Drink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL DEFAULT E'https://res.cloudinary.com/dljchk64j/image/upload/c_thumb,w_200,g_face/v1667150402/cocktails/categories/classic_qv9cgx.png',

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipePart" (
    "drinkId" TEXT NOT NULL,
    "ingredientId" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "unit" "MeasurementUnit" NOT NULL,

    CONSTRAINT "RecipePart_pkey" PRIMARY KEY ("drinkId","ingredientId")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "guestName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "drinkId" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT E'Pending',
    "partyId" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL DEFAULT E'https://res.cloudinary.com/dljchk64j/image/upload/c_thumb,w_200,g_face/v1667150908/cocktails/ingredients/gin_iciv3k.png',

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Party" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Party_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_IngredientToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToDrink" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Drink_name_key" ON "Drink"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_name_key" ON "Ingredient"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Order_guestName_key" ON "Order"("guestName");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_IngredientToUser_AB_unique" ON "_IngredientToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_IngredientToUser_B_index" ON "_IngredientToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToDrink_AB_unique" ON "_CategoryToDrink"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToDrink_B_index" ON "_CategoryToDrink"("B");

-- AddForeignKey
ALTER TABLE "RecipePart" ADD CONSTRAINT "RecipePart_drinkId_fkey" FOREIGN KEY ("drinkId") REFERENCES "Drink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipePart" ADD CONSTRAINT "RecipePart_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_drinkId_fkey" FOREIGN KEY ("drinkId") REFERENCES "Drink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Party" ADD CONSTRAINT "Party_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToUser" ADD FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToDrink" ADD FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToDrink" ADD FOREIGN KEY ("B") REFERENCES "Drink"("id") ON DELETE CASCADE ON UPDATE CASCADE;
