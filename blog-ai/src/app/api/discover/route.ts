import { NextRequest, NextResponse } from "next/server";
import { searchNaverBlog, fetchSearchTrend } from "@/lib/naver";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim();
  if (!query) {
    return NextResponse.json({ error: "검색어(q)가 필요합니다." }, { status: 400 });
  }

  try {
    const [blog, trend] = await Promise.all([
      searchNaverBlog(query, 10),
      fetchSearchTrend([query], 6).catch(() => []),
    ]);

    return NextResponse.json({
      query,
      blog,
      trend,
      insight: buildInsight(blog.total, trend),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "검색 실패";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function buildInsight(total: number, trend: { period: string; ratio: number }[]) {
  if (trend.length < 2) {
    return total > 10000
      ? "검색 결과가 많아 경쟁이 치열할 수 있습니다."
      : "검색 결과가 적어 틈새 주제일 수 있습니다.";
  }

  const first = trend[0]?.ratio ?? 0;
  const last = trend[trend.length - 1]?.ratio ?? 0;
  const delta = last - first;

  if (delta > 10) return "최근 검색 관심도가 상승 중입니다.";
  if (delta < -10) return "최근 검색 관심도가 하락 중입니다.";
  return "검색 관심도가 비교적 안정적입니다.";
}
