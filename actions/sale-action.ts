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

    const generatedSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-");

    await prisma.sale.create({
      data: {
        couponCode,
        description,
        discountAmount,
        discountBadge,
        slug: generatedSlug,
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

export async function updateSale(data: SaleType) {
  try {
    const sale = await prisma.sale.findUnique({
      where: { id: data.id },
    });

    if (!sale) {
      return { error: "Sale not found" };
    }

    const generatedSlug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-");

    const updatedSale = await prisma.sale.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        discountBadge: data.discountBadge,
        discountAmount: data.discountAmount,
        couponCode: data.couponCode,
        slug: generatedSlug,
        validFrom: data.validFrom,
        validUntil: data.validUntil,
        isActive: data.isActive,
        imageUrl: data.imageUrl,
      },
    });

    return {
      success: true,
      message: "Sale updated successfully",
      sale: updatedSale,
    };
  } catch (err) {
    console.log(err);
    return { error: "Internal Server Error" };
  }
}

export async function getSale(slug: string) {
  try {
    const sale = await prisma.sale.findFirst({
      where: {
        slug,
      },
    });

    return {
      success: true,
      sale,
    };
  } catch (err) {
    console.error(err);
    return { error: "Internal Server Error" };
  }
}

export async function deleteSale(saleId: string) {
  try {
    const sale = await prisma.sale.findUnique({
      where: { id: saleId },
    });

    if (!sale) {
      return { error: "Sale not found" };
    }

    await prisma.sale.delete({
      where: {
        id: saleId,
      },
    });

    return {
      success: true,
      message: "Sale deleted successfully",
    };
  } catch (err) {
    console.log(err);
    return { error: "Internal Server Error" };
  }
}
