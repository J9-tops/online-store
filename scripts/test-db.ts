
import prisma from "../lib/prisma.ts";

async function main() {
  console.log("Testing JSON DB Adapter...");

  // 1. Create User
  console.log("Creating User...");
  const user = await prisma.user.create({
    data: {
      name: "Test User",
      email: "test@example.com",
      role: "User",
      emailVerified: true
    },
  });
  console.log("User created:", user);

  // 2. Create Category
  console.log("Creating Category...");
  const category = await prisma.category.create({
    data: {
      title: "Electronics",
      slug: "electronics",
      description: "Gadgets",
    },
  });
  console.log("Category created:", category);

  // 3. Create Product with relation
  console.log("Creating Product...");
  const product = await prisma.product.create({
    data: {
      title: "Smartphone",
      slug: "smartphone",
      description: "A cool phone",
      label: "New",
      price: 999,
      stock: 10,
      imageUrl: "/images/phone.jpg",
      status: "New",
      categories: {
        connect: [{ id: category.id }],
      },
    },
  });
  console.log("Product created:", product);

  // 4. Read Product with include
  console.log("Reading Product with categories...");
  const p = await prisma.product.findFirst({
    where: { slug: "smartphone" },
    include: { categories: true },
  });
  console.log("Product read:", JSON.stringify(p, null, 2));

  if (!p.categories || p.categories.length === 0) {
    console.error("FAILED: Categories not connected/included.");
  } else {
    console.log("SUCCESS: Categories connected properly.");
  }

  // 5. List all categories
  console.log("Listing all categories...");
  const categories = await prisma.category.findMany();
  console.log("Found categories:", categories.length);
  if (categories.length > 0) {
      console.log("First category:", categories[0]);
  } else {
      console.log("No categories found in DB!");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
