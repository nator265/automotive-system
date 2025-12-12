import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password  } = await req.json();

    // Case-insensitive search
    const user = await User.findOne({
      email: { $regex: `^${email}$`, $options: "i" },
    });

    if (!user)
      return NextResponse.json({ error: "Incorrect email" }, { status: 401 });

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );

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
