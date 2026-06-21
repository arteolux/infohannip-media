import { getOpenAIConfig } from "./config";

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

const SYSTEM_PROMPT = `당신은 한국어 수익형 블로그 글쓰기 전문가입니다.
- SEO에 맞는 제목, 소제목, 본문 구조를 제안합니다.
- 애드센스, 쿠팡파트너스, 네이버 홈피드 전략에 맞게 톤을 조절합니다.
- 과장·허위 정보 없이 실용적인 초안을 작성합니다.
- 마크다운 형식으로 답변합니다.`;

export async function generateBlogDraft(
  messages: ChatMessage[],
): Promise<string> {
  const { apiKey, baseUrl, model } = getOpenAIConfig();

  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.7,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`AI 생성 실패 (${res.status}): ${text}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}
