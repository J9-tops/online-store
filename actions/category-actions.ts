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
