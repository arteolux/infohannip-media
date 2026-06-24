export function getNaverCredentials() {
  const clientId = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("NAVER_CLIENT_ID, NAVER_CLIENT_SECRET 환경변수가 필요합니다.");
  }

  return { clientId, clientSecret };
}

export function getOpenAIConfig() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY 환경변수가 필요합니다.");
  }

  return {
    apiKey,
    baseUrl: process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1",
    model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
  };
}

export function isAccessTokenRequired() {
  return Boolean(process.env.ACCESS_TOKEN?.trim());
}
