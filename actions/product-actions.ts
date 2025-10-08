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
      include: {
        categories: true,
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

export async function getAllCategoryProducts(slug: string) {
  try {
    const category = await prisma.category.findUnique({
      where: {
        slug,
      },
      include: {
        products: {
          include: {
            categories: true,
          },
        },
      },
    });
    console.log(category);
    const products = category?.products;

    return {
      success: true,
      products,
    };
  } catch (err) {
    console.log(err);
    return { error: "Internal Server Error" };
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

export async function updateProduct(data: ProductType) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: data.id },
    });

    if (!product) {
      return { error: "Product not found" };
    }

    const generatedSlug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-");

    await prisma.product.update({
      where: { id: data.id },
      data: {
        categories: {
          set: [],
        },
      },
    });

    const updatedProduct = await prisma.product.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        label: data.label,
        price: data.price,
        stock: data.stock,
        status: data.status,
        slug: generatedSlug,
        imageUrl: data.imageUrl,
        categories: {
          connect: data.categories.map((category) => ({
            id: category.id,
            slug: category.slug,
          })),
        },
      },
      include: {
        categories: true,
      },
    });

    return {
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    };
  } catch (err) {
    console.log(err);
    return { error: "Internal Server Error" };
  }
}

export async function getProduct(slug: string) {
  try {
    const product = await prisma.product.findFirst({
      where: {
        slug,
      },
      include: {
        categories: true,
      },
    });

    return {
      success: true,
      product,
    };
  } catch (err) {
    console.error(err);
    return { error: "Internal Server Error" };
  }
}

export async function deleteProduct(productId: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return { error: "Product not found" };
    }

    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    return {
      success: true,
      message: "Product deleted successfully",
    };
  } catch (err) {
    console.log(err);
    return { error: "Internal Server Error" };
  }
}
