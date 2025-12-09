import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/app/lib/db";
import { randomBytes } from "crypto";
import { sendEmail } from "@/app/lib/email";

export async function POST(req: Request) {
  try {
    const { name, email, password, contact } = await req.json();
    const users = db.collection("users");

    // Check if user exists
    const existing = await users.findOne({
      email: { $regex: `^${email}$`, $options: "i" },
    });
    if (existing) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await users.insertOne({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      contact: contact || "",
      role: "client", // default role
      emailVerified: false,
      createdAt: new Date(),
    });

    // Create verification token
    const verificationToken = randomBytes(32).toString("hex"); // ✅ declare variable

    // Save verification token to user
    await users.updateOne(
      { _id: result.insertedId },
      { $set: { verificationToken } }
    );

    const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${verificationToken}`;

    // Send email
    await sendEmail(
      email,
      "Verify your email",
      `<p>Hi ${name},</p>
       <p>Please verify your email by clicking the link below:</p>
       <a href="${verificationLink}">Verify Email</a>`
    );

    return NextResponse.json({
      success: true,
      message: "Account created. Please verify your email.",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
