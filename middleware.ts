import { NextResponse } from "next/server";

export function middleware(req: Request) {
  const url = new URL(req.url);
  const cookie = req.headers.get("cookie") || "";
  const isLoggedIn = cookie.includes("auth_user=");

  const protectedAdmin = ["/dashboard"];
  const protectedClient = ["/client-dashboard"];

  if (protectedAdmin.some((p) => url.pathname.startsWith(p))) {
    if (!isLoggedIn) return NextResponse.redirect(new URL("/login", req.url));
  }

  if (protectedClient.some((p) => url.pathname.startsWith(p))) {
    if (!isLoggedIn) return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
