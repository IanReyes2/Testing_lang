import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "../../../../prisma"; // adjust path if needed

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json(); // ✅ use username instead of id

    if (!username || !password) {
      return NextResponse.json(
        { error: "Missing username or password." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { username }, // ✅ search by username (must be unique in schema)
    });

    if (!user) {
      return NextResponse.json(
        { error: "No user found with the given username." },
        { status: 404 }
      );
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash); // ✅
    if (!passwordMatches) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        message: "Login successful!",
        user: {
          id: user.id,
          name: user.fullName ?? user.username ?? "Unknown",
        },
      },
      { status: 200 }
    );
  } catch (e) {
    console.error("Authentication error:", e);
    return NextResponse.json(
      { error: "Something went wrong on the server." },
      { status: 500 }
    );
  }
}
