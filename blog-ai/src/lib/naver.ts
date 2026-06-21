import { getNaverCredentials } from "./config";

const NAVER_HEADERS = () => {
  const { clientId, clientSecret } = getNaverCredentials();
  return {
    "X-Naver-Client-Id": clientId,
    "X-Naver-Client-Secret": clientSecret,
  };
};

export type NaverBlogItem = {
  title: string;
  link: string;
  description: string;
  bloggername: string;
  bloggerlink: string;
  postdate: string;
};

export type NaverBlogSearchResult = {
  total: number;
  items: NaverBlogItem[];
};

export async function searchNaverBlog(
  query: string,
  display = 10,
): Promise<NaverBlogSearchResult> {
  const url = new URL("https://openapi.naver.com/v1/search/blog.json");
  url.searchParams.set("query", query);
  url.searchParams.set("display", String(display));
  url.searchParams.set("sort", "sim");

  const res = await fetch(url, { headers: NAVER_HEADERS(), cache: "no-store" });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`네이버 블로그 검색 실패 (${res.status}): ${text}`);
  }

  const data = await res.json();
  return {
    total: data.total ?? 0,
    items: (data.items ?? []).map((item: NaverBlogItem) => ({
      ...item,
      title: stripHtml(item.title),
      description: stripHtml(item.description),
    })),
  };
}

export type TrendPoint = {
  period: string;
  ratio: number;
};

export async function fetchSearchTrend(
  keywords: string[],
  months = 6,
): Promise<TrendPoint[]> {
  const end = new Date();
  const start = new Date();
  start.setMonth(start.getMonth() - months);

  const body = {
    startDate: formatDate(start),
    endDate: formatDate(end),
    timeUnit: "month",
    keywordGroups: keywords.map((keyword) => ({
      groupName: keyword,
      keywords: [keyword],
    })),
  };

  const res = await fetch("https://openapi.naver.com/v1/datalab/search", {
    method: "POST",
    headers: {
      ...NAVER_HEADERS(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`네이버 데이터랩 조회 실패 (${res.status}): ${text}`);
  }

  const data = await res.json();
  const first = data.results?.[0]?.data ?? [];
  return first.map((row: { period: string; ratio: number }) => ({
    period: row.period,
    ratio: row.ratio,
  }));
}

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function stripHtml(text: string) {
  return text.replace(/<[^>]+>/g, "").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
}
