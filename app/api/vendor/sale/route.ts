import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body",
        },
        { status: 400 }
      );
    }

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
    } = body;

    if (!title || !validFrom || !validUntil) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    const formatedDiscountAmount = Number(discountAmount);

    await prisma.sale.create({
      data: {
        couponCode,
        description,
        discountAmount: formatedDiscountAmount,
        discountBadge,
        imageUrl,
        isActive,
        title,
        validFrom,
        validUntil,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Sale successfully created",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error creating sale:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create Sale",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const category = await prisma.sale.findMany();
    return NextResponse.json(category, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to get category",
      },
      { status: 500 }
    );
  }
}

// export async function PATCH(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { id } = params;
//     const { title, slug, description } = await req.json();
//     await prisma.category.update({
//       where: { id },
//       data: { title, description, slug },
//     });

//     NextResponse.json(
//       {
//         success: true,
//         message: "Category updated successfully",
//       },
//       { status: 200 }
//     );
//   } catch {
//     NextResponse.json(
//       {
//         success: false,
//         message: "Failed to update category",
//       },
//       { status: 500 }
//     );

//     return;
//   }
// }

// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { id } = params;
//     await prisma.category.delete({
//       where: { id },
//     });

//     NextResponse.json(
//       {
//         success: true,
//         message: "Category deleted successfully",
//       },
//       { status: 200 }
//     );
//   } catch {
//     NextResponse.json(
//       {
//         success: false,
//         message: "Failed to delete category",
//       },
//       { status: 500 }
//     );

//     return;
//   }
// }
