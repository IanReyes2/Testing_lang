import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    // include availabilities using lowercase model name
    const menuItems = await prisma.menuitem.findMany({
      where: { available: true, ...(category ? { category } : {}) },
      include: { menuitemavailability: true }, 
    });

    const today = new Date()
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();

    // Map to a unified structure for front-end
    const filtered = menuItems.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      available: item.available,
      category: item.category,
      availabilities: item.menuitemavailability || [],
    })).filter((item) =>
      item.availabilities.length === 0 ||
      item.availabilities.some((a) => a.dayOfWeek.toLowerCase() === today)
    );
    
    return NextResponse.json(filtered);
  } catch (error) {
    console.error("❌ Error fetching menu items:", error);
    return NextResponse.json({ error: "Failed to fetch menu", data: [] }, { status: 500 }); 
  }
}