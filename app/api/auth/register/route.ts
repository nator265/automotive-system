import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/app/lib/db";

export async function POST(req: Request) {
  try {
    const { name, email, password, contact } = await req.json();

    const users = db.collection("users");
    const existing = await users.findOne({ email });

    if (existing) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await users.insertOne({
      name,
      email,
      password: hashed,
      contact,
      role: "client",
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
