import { NextRequest, NextResponse } from "next/server";
import { generateBlogDraft, type ChatMessage } from "@/lib/ai";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const messages = body.messages as ChatMessage[] | undefined;
  const keyword = body.keyword?.trim();
  const strategy = body.strategy ?? "adsense";

  if (!messages?.length && !keyword) {
    return NextResponse.json(
      { error: "messages 또는 keyword가 필요합니다." },
      { status: 400 },
    );
  }

  const chatMessages: ChatMessage[] = messages?.length
    ? messages
    : [
        {
          role: "user",
          content: buildPrompt(keyword, strategy),
        },
      ];

  try {
    const content = await generateBlogDraft(chatMessages);
    return NextResponse.json({ content });
  } catch (error) {
    const message = error instanceof Error ? error.message : "AI 생성 실패";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function buildPrompt(keyword: string, strategy: string) {
  const strategyLabel =
    strategy === "coupang"
      ? "쿠팡파트너스"
      : strategy === "homefeed"
        ? "네이버 홈피드"
        : "구글 애드센스";

  return `키워드 "${keyword}"로 ${strategyLabel} 수익형 블로그 글 초안을 작성해주세요.
- 제목 3개 후보
- SEO 소제목 구조
- 1500자 내외 본문 초안
- 추천 태그 5개`;
}
