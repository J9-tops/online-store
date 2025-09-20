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

export async function updateCategory(data: CategoryType) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: data.id },
    });

    if (!category) {
      return { error: "Category not found" };
    }

    const updatedCategory = await prisma.category.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        slug: data.slug,
      },
    });

    return {
      success: true,
      message: "Category updated successfully",
      category: updatedCategory,
    };
  } catch (err) {
    console.log(err);
    return { error: "Internal Server Error" };
  }
}

export async function getCategory(slug: string) {
  try {
    const category = await prisma.category.findUnique({
      where: {
        slug,
      },
    });

    return {
      success: true,
      category,
    };
  } catch (err) {
    console.error(err);
    return { error: "Internal Server Error" };
  }
}

export async function deleteCategory(categoryId: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      include: {
        products: true,
      },
    });

    if (!category) {
      return { error: "Category not found" };
    }

    if (category.products && category.products.length > 0) {
      return {
        error:
          "Cannot delete category with associated products. Please remove or reassign products first.",
      };
    }

    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });

    return {
      success: true,
      message: "Category deleted successfully",
    };
  } catch (err) {
    console.log(err);
    return { error: "Internal Server Error" };
  }
}
