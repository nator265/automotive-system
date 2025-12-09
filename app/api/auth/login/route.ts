import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/app/lib/db";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const users = db.collection("users");
    const user = await users.findOne({ email });
    console.log("user", user);

    if (!user)
      return NextResponse.json({ error: "Incorrect email",  }, { status: 401 });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return NextResponse.json(
        { error: "Incorrect password, password is" + user.password},
        { status: 401 }
      );

    // Write cookie
    const res = NextResponse.json({
      success: true,
      role: user.role,
    });

    res.cookies.set("auth_user", user._id.toString(), {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });

    return res;
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
