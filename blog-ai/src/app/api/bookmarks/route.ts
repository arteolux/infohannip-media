import { NextRequest, NextResponse } from "next/server";
import { listBookmarks, addBookmark, removeBookmark } from "@/lib/bookmarks";

export async function GET() {
  const items = await listBookmarks();
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const keyword = body.keyword?.trim();

  if (!keyword) {
    return NextResponse.json({ error: "keyword가 필요합니다." }, { status: 400 });
  }

  const item = await addBookmark({
    keyword,
    note: body.note,
    strategy: body.strategy,
  });

  return NextResponse.json({ item });
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id가 필요합니다." }, { status: 400 });
  }

  const removed = await removeBookmark(id);
  if (!removed) {
    return NextResponse.json({ error: "북마크를 찾을 수 없습니다." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
