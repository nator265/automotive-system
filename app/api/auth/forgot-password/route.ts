import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { sendEmail } from "@/app/lib/email";
import { randomBytes } from "crypto";

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await db.collection("users").findOne({ email });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const token = randomBytes(32).toString("hex");
  const expires = Date.now() + 1000 * 60 * 15; // 15 minutes

  await db.collection("users").updateOne(
    { email },
    {
      $set: {
        resetToken: token,
        resetTokenExpires: expires,
      },
    }
  );

  const link = `${process.env.NEXT_PUBLIC_URL}/reset-password?token=${token}`;

  await sendEmail(
    email,
    "Reset Your Password",
    `<p>Click reset link: <a href="${link}">${link}</a></p>`
  );

  return NextResponse.json({ success: true });
}
