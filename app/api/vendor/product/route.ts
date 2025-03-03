import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate required fields
    const {
      title,
      slug,
      imageUrl,
      description,
      label,
      price,
      stock,
      status,
      categories, // Array of category IDs
    } = body;

    console.log("body:", body);

    if (
      !title ||
      !slug ||
      !imageUrl ||
      !description ||
      !label ||
      price == null ||
      stock == null ||
      !status ||
      !categories ||
      categories.length === 0
    ) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Ensure all category IDs exist in the database
    const categoriesIds = await prisma.category.findMany({
      where: {
        id: { in: categories },
      },
    });

    if (categories.length !== categoriesIds.length) {
      console.log("one or more category is invalid");
      return NextResponse.json(
        { success: false, message: "One or more category IDs are invalid" },
        { status: 400 }
      );
    }

    // Create the product and link it to the categories
    const product = await prisma.product.create({
      data: {
        title,
        slug,
        imageUrl,
        description,
        label,
        price,
        stock,
        status,
        categories: {
          connect: categories.map((id: string) => ({ id })),
        },
      },
    });

    return NextResponse.json(
      { success: true, message: "Product successfully created", product },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create product" },
      { status: 500 }
    );
  }
}
