"use server";

import prisma from "@/lib/prisma";
import { ProductType } from "@/types/schema";

export async function createProduct(data: ProductType) {
  try {
    const {
      status,
      categories,
      description,
      imageUrl,
      label,
      price,
      slug,
      stock,
      title,
    } = data;

    await prisma.product.create({
      data: {
        status,
        description,
        imageUrl,
        label,
        price,
        slug,
        stock,
        title,
        categories: {
          connect: categories.map((category) => ({ id: category.id })),
        },
      },
    });

    return {
      success: true,
      message: "Product created successfully",
    };
  } catch (err) {
    console.log(err);
    return { error: "Product failed to create" };
  }
}

export async function getProductsBySlug(slug: string) {
  try {
    const product = await prisma.product.findFirst({
      where: {
        slug: {
          equals: slug,
        },
      },
    });

    return {
      success: true,
      product,
    };
  } catch (err) {
    console.log(err);

    return { success: false, error: "Product not found" };
  }
}

export async function getAllProducts() {
  try {
    const products = await prisma.product.findMany({
      include: {
        categories: true,
      },
    });

    return {
      success: true,
      products,
    };
  } catch (err) {
    console.log(err);

    return { success: false, error: "Products not found" };
  }
}

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      include: {
        categories: true,
      },
    });

    return {
      success: true,
      products,
    };
  } catch (err) {
    console.log(err);

    return { success: false, error: "Products not found" };
  }
}

export async function searchProduct(
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
        products: [],
        message: "Please provide a search term",
      };
    }

    const { limit, offset } = options || {};

    const products = await prisma.product.findMany({
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
          {
            slug: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            label: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        categories: {
          select: {
            id: true,
            title: true,
            slug: true,
            description: true,
          },
        },
      },
      take: limit,
      skip: offset,
      orderBy: {
        title: "asc",
      },
    });

    return {
      success: true,
      products,
      count: products.length,
    };
  } catch (err) {
    console.log(err);
    return { error: "Internal Server Error" };
  }
}
