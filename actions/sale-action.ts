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

export async function searchSale(
  searchTerm: string,
  options?: {
    limit?: number;
    offset?: number;
  }
) {
  try {
    if (!searchTerm || searchTerm.trim() === "") {
      return {
        success: true,
        sale: [],
        message: "Please provide a search term",
      };
    }

    const sales = await prisma.sale.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        ],
      },
      take: options?.limit,
      skip: options?.offset,
      orderBy: {
        title: "asc",
      },
    });

    return {
      success: true,
      sales,
      count: sales.length,
    };
  } catch (err) {
    console.log(err);
    return { error: "Internal Server Error" };
  }
}
