import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const menuItemId = Number(params.id);
    const { days } = await req.json(); // ["monday", "wednesday"]

    if (!Array.isArray(days)) {
      return NextResponse.json(
        { error: "days must be an array" },
        { status: 400 }
      );
    }

    // Remove existing days
    await prisma.menuitemavailability.deleteMany({
      where: { menuItemId },
    });

    // Insert new days
    await prisma.menuitemavailability.createMany({
      data: days.map((day: string) => ({
        menuItemId,
        dayOfWeek: day.toLowerCase(),
      })),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Availability update failed:", err);
    return NextResponse.json(
      { error: "Failed to update availability" },
      { status: 500 }
    );
  }
}
