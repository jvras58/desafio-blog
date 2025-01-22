// TODO: Modificado aqui: 
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    cookieName:
      process.env.VERCEL_ENV === "development"
        ? "authjs.session-token"
        : "__Secure-authjs.session-token",
  });
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  const now = Math.floor(Date.now() / 1000);
  if (token.exp && token.exp < now) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!auth|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};