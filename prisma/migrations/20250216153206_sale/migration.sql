-- CreateTable
CREATE TABLE "Sale" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "badge" TEXT NOT NULL,
    "discountAmount" DOUBLE PRECISION NOT NULL,
    "couponCode" TEXT NOT NULL,
    "validFrom" TIMESTAMP(3) NOT NULL,
    "validTo" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Sale_title_idx" ON "Sale"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Sale_title_description_key" ON "Sale"("title", "description");
