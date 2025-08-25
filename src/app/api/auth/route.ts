import { NextResponse } from "next/server";
import prisma from "../../../../prisma";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Missing username or password." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json(
        { error: "No user found with the given username." },
        { status: 404 }
      );
    }

    if (password !== user.password) {
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
          name: user.username,
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
