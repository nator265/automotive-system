import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { token, password } = await req.json();

  const user = await db.collection("users").findOne({
    resetToken: token,
    resetTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 400 }
    );
  }

  const hashed = await bcrypt.hash(password, 10);

  await db.collection("users").updateOne(
    { _id: user._id },
    {
      $set: { password: hashed },
      $unset: { resetToken: "", resetTokenExpires: "" },
    }
  );

  return NextResponse.json({ message: "Password reset successful!" });
}
