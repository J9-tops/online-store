"use server";

import prisma from "@/lib/prisma";
import { SaleType } from "@/types/schema";

export async function createSale(data: SaleType) {
  try {
    const {
      couponCode,
      description,
      discountAmount,
      discountBadge,
      imageUrl,
      isActive,
      title,
      validFrom,
      validUntil,
    } = data;

    await prisma.sale.create({
      data: {
        couponCode,
        description,
        discountAmount,
        discountBadge,
        imageUrl,
        isActive,
        title,
        validFrom: new Date(validFrom),
        validUntil: new Date(validUntil),
      },
    });

    return {
      success: true,
      message: "Sale has been created",
    };
  } catch (error) {
    console.log(error);

    return { error: "Sale not created" };
  }
}

export async function getAllSales() {
  try {
    const sales = await prisma.sale.findMany();

    return {
      success: true,
      sales,
    };
  } catch (error) {
    console.log(error);

    return { error: "Sale not found" };
  }
}
