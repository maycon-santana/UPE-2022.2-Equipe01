/*
  Warnings:

  - Added the required column `productId` to the `assessment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_assessmentId_fkey";

-- AlterTable
ALTER TABLE "assessment" ADD COLUMN     "productId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "assessmentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "assessment" ADD CONSTRAINT "assessment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
