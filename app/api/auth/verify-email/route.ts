import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token)
      return NextResponse.json({ error: "No token provided" }, { status: 400 });

    const users = db.collection("users");
    const user = await users.findOne({ verificationToken: token });

    if (!user)
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });

    await users.updateOne(
      { _id: user._id },
      { $set: { emailVerified: true }, $unset: { verificationToken: "" } }
    );

    return NextResponse.json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
