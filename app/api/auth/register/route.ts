import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import User from "@/models/User";
import { randomBytes } from "crypto";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password, contact } = await req.json();

    // Check if user exists
    const existing = await User.findOne({
      email: { $regex: `^${email}$`, $options: "i" },
    });
    if (existing) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Create verification token
    const verificationToken = randomBytes(32).toString("hex");

    // Create user
    const user = new User({
      name,
      email: email.toLowerCase(),
      password,
      contact: contact || "",
      role: "client",
      verificationToken,
    });

    await user.save();

    return NextResponse.json({
      success: true,
      message: "Account created. Please verify your email.",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
