/*
  Warnings:

  - You are about to drop the column `price` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `cart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cart" DROP COLUMN "price",
DROP COLUMN "quantity";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "assessmentId" INTEGER;

-- CreateTable
CREATE TABLE "assessment" (
    "id" SERIAL NOT NULL,
    "note" DOUBLE PRECISION NOT NULL,
    "comment" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "assessment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "assessment" ADD CONSTRAINT "assessment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
