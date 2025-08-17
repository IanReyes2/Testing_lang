import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

// GET → fetch all available menu items
export async function GET() {
  try {
    const menu = await prisma.menuItem.findMany({
      where: { available: true },
      orderBy: { id: 'asc' },
    });
    return NextResponse.json(menu);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}
