"use server";

import prisma from "@/lib/prisma";
import { CategoryType } from "@/types/schema";

export async function addCategory(data: CategoryType) {
  try {
    const { title, description, slug } = data;

    await prisma.category.create({
      data: {
        title,
        description,
        slug,
      },
    });

    return {
      success: true,
      message: "Category successfully created",
    };
  } catch (err) {
    console.log(err);
    return { error: "Internal Server Error" };
  }
}

export async function getAllCategories() {
  try {
    const categories = await prisma.category.findMany();

    return {
      success: true,
      categories,
    };
  } catch (err) {
    console.log(err);
    return { error: "Internal Server Error" };
  }
}

export async function getCategoryProductCount(categorySlug: string) {
  try {
    const category = await prisma.category.findFirst({
      where: {
        slug: categorySlug,
      },
      include: {
        products: true,
      },
    });
    const categoryCount = category?.products.length;

    return {
      success: true,
      count: categoryCount,
    };
  } catch (err) {
    console.log(err);
    return { error: "Internal Server Error" };
  }
}

export async function searchCategory(
  searchTerm: string,
  options?: {
    includeProducts?: boolean;
    limit?: number;
    offset?: number;
  }
) {
  try {
    if (!searchTerm || searchTerm.trim() === "") {
      return {
        success: true,
        categories: [],
        message: "Please provide a search term",
      };
    }

    const { includeProducts = false, limit, offset } = options || {};

    const categories = await prisma.category.findMany({
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
        ],
      },
      include: {
        products: includeProducts,
      },
      take: limit,
      skip: offset,
      orderBy: {
        title: "asc",
      },
    });

    return {
      success: true,
      categories,
      count: categories.length,
    };
  } catch (err) {
    console.log(err);
    return { error: "Internal Server Error" };
  }
}
