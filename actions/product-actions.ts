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
          connect: categories.map((category) => ({ id: category })),
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
