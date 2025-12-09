import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";

export async function POST(req: Request) {
  const { token } = await req.json();

  const user = await db
    .collection("users")
    .findOne({ verificationToken: token });

  if (!user) {
    return NextResponse.json({ message: "Invalid token" }, { status: 400 });
  }

  await db.collection("users").updateOne(
    { _id: user._id },
    {
      $set: { emailVerified: true },
      $unset: { verificationToken: "" },
    }
  );

  return NextResponse.json({ message: "Email verified successfully!" });
}
