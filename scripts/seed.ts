import prisma from "../lib/prisma";

const seedData = {
  categories: [
    {
      id: "cat_1",
      title: "Electronics",
      slug: "electronics",
      description: "Cutting-edge tech and gadgets.",
    },
    {
      id: "cat_2",
      title: "Apparel",
      slug: "apparel",
      description: "Stylish clothing for all seasons.",
    },
    {
      id: "cat_3",
      title: "Home & Living",
      slug: "home-living",
      description: "Furniture and home decor.",
    },
    {
      id: "cat_4",
      title: "Fitness",
      slug: "fitness",
      description: "Gym gear and health supplements.",
    },
    {
      id: "cat_5",
      title: "Books",
      slug: "books",
      description: "Physical and digital reading material.",
    },
  ],
  sales: [
    {
      id: "sale_1",
      title: "New Year Tech Bash",
      slug: "new-year-tech",
      description: "Start 2026 with the best gear.",
      discountBadge: "20% OFF",
      discountAmount: 20,
      couponCode: "NY2026",
      validFrom: "2026-01-01T00:00:00Z",
      validUntil: "2026-01-31T23:59:59Z",
      isActive: true,
      imageUrl: "https://pngimg.com/uploads/gift/gift_PNG100210.png",
    },
    {
      id: "sale_2",
      title: "Spring Fitness Clearout",
      slug: "spring-fitness",
      description: "Get ready for the sun with massive savings.",
      discountBadge: "BOGO",
      discountAmount: 50,
      couponCode: "FITSPRING",
      validFrom: "2026-03-01T00:00:00Z",
      validUntil: "2026-03-15T23:59:59Z",
      isActive: false,
      imageUrl:
        "https://pngimg.com/uploads/gym_equipment/gym_equipment_PNG13.png",
    },
  ],
  products: [
    {
      id: "p1",
      title: "Sonic Noise-Cancelling Headphones",
      slug: "sonic-headphones",
      imageUrl: "https://pngimg.com/uploads/headphones/headphones_PNG7655.png",
      description: "Immersive sound with 40-hour battery life.",
      label: "Premium",
      price: 299.99,
      stock: 25,
      status: "Hot",
      categories: [
        {
          id: "cat_1",
          title: "Electronics",
          slug: "electronics",
          description: "Cutting-edge tech and gadgets.",
        },
      ],
    },
    {
      id: "p2",
      title: "Minimalist Leather Watch",
      slug: "minimalist-watch",
      imageUrl: "https://pngimg.com/uploads/watches/watches_PNG101444.png",
      description: "Genuine leather strap with a sapphire crystal face.",
      label: "Trending",
      price: 150.0,
      stock: 10,
      status: "New",
      categories: [
        {
          id: "cat_2",
          title: "Apparel",
          slug: "apparel",
          description: "Stylish clothing for all seasons.",
        },
      ],
    },
    {
      id: "p3",
      title: "Ergonomic Office Chair",
      slug: "ergonomic-chair",
      imageUrl: "https://pngimg.com/uploads/chair/chair_PNG6901.png",
      description: "Breathable mesh back with lumbar support.",
      label: "Office Must-Have",
      price: 450.0,
      stock: 5,
      status: null,
      categories: [
        {
          id: "cat_3",
          title: "Home & Living",
          slug: "home-living",
          description: "Furniture and home decor.",
        },
      ],
    },
    {
      id: "p4",
      title: "Yoga Starter Kit",
      slug: "yoga-kit",
      imageUrl: "https://pngimg.com/uploads/fitness/fitness_PNG208.png",
      description: "Includes a non-slip mat, two blocks, and a strap.",
      label: "Sale",
      price: 45.0,
      stock: 100,
      status: "Sale",
      categories: [
        {
          id: "cat_4",
          title: "Fitness",
          slug: "fitness",
          description: "Gym gear and health supplements.",
        },
      ],
    },
    {
      id: "p5",
      title: "The Art of Clean Code",
      slug: "clean-code-book",
      imageUrl: "https://pngimg.com/uploads/book/book_PNG51115.png",
      description: "A comprehensive guide to writing maintainable software.",
      label: "Best Seller",
      price: 35.99,
      stock: 200,
      status: "Hot",
      categories: [
        {
          id: "cat_5",
          title: "Books",
          slug: "books",
          description: "Physical and digital reading material.",
        },
      ],
    },
    {
      id: "p6",
      title: "Smart RGB Desk Lamp",
      slug: "smart-lamp",
      imageUrl: "https://pngimg.com/uploads/lamp/lamp_PNG108700.png",
      description: "App-controlled lighting with 16 million colors.",
      label: "New Arrival",
      price: 59.99,
      stock: 0,
      status: "New",
      categories: [
        {
          id: "cat_1",
          title: "Electronics",
          slug: "electronics",
          description: "Cutting-edge tech and gadgets.",
        },
        {
          id: "cat_3",
          title: "Home & Living",
          slug: "home-living",
          description: "Furniture and home decor.",
        },
      ],
    },
    {
      id: "p7",
      title: "Organic Cotton T-Shirt",
      slug: "organic-tshirt",
      imageUrl: "https://pngimg.com/uploads/tshirt/tshirt_PNG5450.png",
      description: "Eco-friendly, breathable, and soft.",
      label: "Eco-Friendly",
      price: 25.0,
      stock: 500,
      status: null,
      categories: [
        {
          id: "cat_2",
          title: "Apparel",
          slug: "apparel",
          description: "Stylish clothing for all seasons.",
        },
      ],
    },
    {
      id: "p8",
      title: "4K Ultra-Wide Monitor",
      slug: "4k-monitor",
      imageUrl: "https://pngimg.com/uploads/monitor/laptop_PNG5898.png",
      description: "34-inch curved display for maximum productivity.",
      label: "Flash Sale",
      price: 899.0,
      stock: 12,
      status: "Sale",
      categories: [
        {
          id: "cat_1",
          title: "Electronics",
          slug: "electronics",
          description: "Cutting-edge tech and gadgets.",
        },
      ],
    },
    {
      id: "p9",
      title: "Cast Iron Skillet",
      slug: "cast-iron-skillet",
      imageUrl: "https://pngimg.com/uploads/frying_pan/frying_pan_PNG8356.png",
      description: "Pre-seasoned and ready for high-heat cooking.",
      label: "Chef's Choice",
      price: 40.0,
      stock: 60,
      status: null,
      categories: [
        {
          id: "cat_3",
          title: "Home & Living",
          slug: "home-living",
          description: "Furniture and home decor.",
        },
      ],
    },
    {
      id: "p10",
      title: "Wireless Gaming Mouse",
      slug: "gaming-mouse",
      imageUrl:
        "https://pngimg.com/uploads/computer_mouse/computer_mouse_PNG7700.png",
      description: "Ultra-lightweight with 25k DPI sensor.",
      label: "New",
      price: 129.0,
      stock: 33,
      status: "New",
      categories: [
        {
          id: "cat_1",
          title: "Electronics",
          slug: "electronics",
          description: "Cutting-edge tech and gadgets.",
        },
      ],
    },
  ],
};

async function main() {
  console.log("Seeding database...");

  // 1. Categories
  console.log("Seeding Categories...");
  const createdCategories: any[] = [];

  // Clean up existing categories if you want a fresh start logic (optional, assuming append/fresh behavior)

  for (const cat of seedData.categories) {
    // Destructure to remove id
    const { id, ...dataWithoutId } = cat;

    // Check if exists
    let exists = await prisma.category.findUnique({
      where: { slug: cat.slug },
    });
    if (!exists) {
      exists = await prisma.category.create({
        data: dataWithoutId,
      });
      console.log(`Created category: ${cat.title}`);
    } else {
      console.log(`Category exists: ${cat.title}`);
    }
    createdCategories.push(exists);
  }

  // 2. Sales
  console.log("Seeding Sales...");
  for (const sale of seedData.sales) {
    const { id, validFrom, validUntil, ...rest } = sale;
    const data = {
      ...rest,
      validFrom: new Date(validFrom),
      validUntil: new Date(validUntil),
    };

    const exists = await prisma.sale.findFirst({ where: { slug: sale.slug } });
    if (!exists) {
      await prisma.sale.create({ data });
      console.log(`Created sale: ${sale.title}`);
    } else {
      console.log(`Sale exists: ${sale.title}`);
    }
  }

  // 3. Products
  console.log("Seeding Products...");
  for (const product of seedData.products) {
    const { id, categories, ...productData } = product;

    // Find real category IDs based on the slugs in the seed data
    const catsToConnect = [];
    if (categories) {
      for (const catRef of categories) {
        const realCat = createdCategories.find(
          (c: any) => c.slug === catRef.slug
        );
        if (realCat) {
          catsToConnect.push({ id: realCat.id });
        }
      }
    }

    const exists = await prisma.product.findUnique({
      where: { slug: product.slug },
    });
    if (!exists) {
      await prisma.product.create({
        data: {
          ...productData,
          categories: {
            connect: catsToConnect,
          },
        },
      });
      console.log(`Created product: ${product.title}`);
    } else {
      console.log(`Product exists: ${product.title}`);
    }
  }

  console.log("Seeding completed.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
