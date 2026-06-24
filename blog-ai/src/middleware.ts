import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "blog_ai_session";

export function middleware(request: NextRequest) {
  const accessToken = process.env.ACCESS_TOKEN?.trim();
  if (!accessToken) return NextResponse.next();

  const { pathname } = request.nextUrl;
  const isPublic =
    pathname === "/login" ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico";

  if (isPublic) return NextResponse.next();

  const session = request.cookies.get(COOKIE_NAME)?.value;
  if (session === accessToken) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
