/*
  Warnings:

  - Changed the type of `discountAmount` on the `Sale` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "discountAmount",
ADD COLUMN     "discountAmount" DOUBLE PRECISION NOT NULL;
