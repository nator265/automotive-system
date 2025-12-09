import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { sendEmail } from "@/app/lib/email";
import { randomBytes } from "crypto";

export async function POST(req: Request) {
  const { email } = await req.json();

  const token = randomBytes(32).toString("hex");

  await db.collection("users").updateOne(
    { email },
    {
      $set: {
        verificationToken: token,
      },
    }
  );

  const link = `${process.env.NEXT_PUBLIC_URL}/verify?token=${token}`;

  await sendEmail(
    email,
    "Verify Your Email",
    `<p>Click to verify: <a href="${link}">${link}</a></p>`
  );

  return NextResponse.json({ success: true });
}
