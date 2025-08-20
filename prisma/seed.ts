import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Add some menu items
  await prisma.menuItem.createMany({
    data: [
      { name: "Fried Chicken", price: "50.00" },
      { name: "Chicken Adobo", price: "50.00" },
      { name: "Spaghetti", price: "35.00" },
      { name: "Rice", price: "15.00" },
      { name: "Iced Tea", price: "20.00" },
    ],
    skipDuplicates: true, // avoids re-inserting if seed is run again
  });
}

main()
  .then(() => {
    console.log("✅ Database seeded successfully!");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
