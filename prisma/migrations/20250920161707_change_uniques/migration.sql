/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Sale` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Category_title_description_key";

-- DropIndex
DROP INDEX "public"."Category_title_idx";

-- DropIndex
DROP INDEX "public"."Product_title_description_key";

-- DropIndex
DROP INDEX "public"."Product_title_idx";

-- DropIndex
DROP INDEX "public"."Sale_title_description_key";

-- DropIndex
DROP INDEX "public"."Sale_title_idx";

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "public"."Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "public"."Product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Sale_title_key" ON "public"."Sale"("title");
