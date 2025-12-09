import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { randomBytes } from "crypto";
import { sendEmail } from "@/app/lib/email";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const users = db.collection("users");

    const user = await users.findOne({ email: email.toLowerCase() });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Create reset token
    const resetToken = randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await users.updateOne(
      { _id: user._id },
      { $set: { resetToken, resetTokenExpiry } }
    );

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`;

    await sendEmail(
      email,
      "Reset Your Password",
      `<p>Hi ${user.name},</p>
       <p>Click the link below to reset your password (valid for 1 hour):</p>
       <a href="${resetLink}">Reset Password</a>`
    );

    return NextResponse.json({
      success: true,
      message: "Password reset email sent",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
