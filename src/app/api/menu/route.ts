import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// ✅ Prevent multiple instances of PrismaClient in dev
const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"], // optional: logs queries in dev
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category"); // ✅ added

    const menuItems = await prisma.menuItem.findMany({
      where: {
        available: true,
        ...(category ? { category } : {}), // ✅ added filter by category
      },
    });

    return NextResponse.json(menuItems);
  } catch (error) {
    console.error("❌ Error fetching menu items:", error);
    return NextResponse.json({ error: "Failed to fetch menu" }, { status: 500 });
  }
}
