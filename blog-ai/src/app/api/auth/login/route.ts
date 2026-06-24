import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "blog_ai_session";

export async function POST(request: NextRequest) {
  const accessToken = process.env.ACCESS_TOKEN?.trim();
  if (!accessToken) {
    return NextResponse.json({ ok: true, authRequired: false });
  }

  const body = await request.json();
  const token = body.token?.trim();

  if (token !== accessToken) {
    return NextResponse.json({ error: "접근 토큰이 올바르지 않습니다." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true, authRequired: true });
  res.cookies.set(COOKIE_NAME, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(COOKIE_NAME);
  return res;
}
