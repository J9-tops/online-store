/*
  Warnings:

  - You are about to drop the column `validTo` on the `Sale` table. All the data in the column will be lost.
  - Added the required column `validUntil` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "validTo",
ADD COLUMN     "validUntil" TIMESTAMP(3) NOT NULL;
