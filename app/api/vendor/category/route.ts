// import prisma from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { title, slug, description } = await req.json();
//     await prisma.category.create({
//       data: {
//         title,
//         description,
//         slug,
//       },
//     });
//     return NextResponse.json(
//       {
//         success: true,
//         message: "Category successfully created",
//       },
//       { status: 201 }
//     );
//   } catch {
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to create category",
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function GET() {
//   try {
//     const category = await prisma.category.findMany();
//     return NextResponse.json(category, { status: 200 });
//   } catch {
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to get category",
//       },
//       { status: 500 }
//     );
//   }
// }
