import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/app/lib/db";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const users = db.collection("users");

    // Case-insensitive search
    const user = await users.findOne({
      email: { $regex: `^${email}$`, $options: "i" },
    });

    if (!user)
      return NextResponse.json({ error: "Incorrect email" }, { status: 401 });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );

    // Check if email verified
    if (!user.emailVerified) {
      return NextResponse.json(
        { error: "Please verify your email first" },
        { status: 401 }
      );
    }

    // Set cookie
    const res = NextResponse.json({ success: true, role: user.role });
    res.cookies.set("auth_user", user._id.toString(), {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
