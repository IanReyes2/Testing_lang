import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

// Simple function para gumawa ng 6-character customer code
function genCode(len = 6) {
  return Math.random().toString(36).substring(2, 2 + len);
}

// GET → kunin lahat ng orders (for Cashier)
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { 
        items: { include: { menuItem: true } } 
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST → gumawa ng bagong order (for Kiosk)
export async function POST(req: Request) {
  try {
    const { items }: { items: { menuItemId: number; qty: number }[] } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items' }, { status: 400 });
    }

    // Kunin presyo ng bawat menu item
    const ids = items.map((i) => i.menuItemId);
    const menu = await prisma.menuItem.findMany({ where: { id: { in: ids } } });

    let total = 0;
    const orderItems = items.map((i) => {
      const m = menu.find((x) => x.id === i.menuItemId);
      if (!m) throw new Error('Invalid menu item');
      total += Number(m.price) * i.qty;
      return { menuItemId: m.id, qty: i.qty, unitPrice: m.price };
    });

    const order = await prisma.order.create({
      data: {
        customerCode: genCode(),
        total,
        items: { create: orderItems },
      },
      include: { items: true },
    });

    return NextResponse.json({ orderId: order.id, customerCode: order.customerCode });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}