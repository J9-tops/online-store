/*
  Warnings:

  - You are about to drop the column `badge` on the `Sale` table. All the data in the column will be lost.
  - Added the required column `discountBadge` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "badge",
ADD COLUMN     "discountBadge" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ALTER COLUMN "discountAmount" SET DATA TYPE TEXT;
