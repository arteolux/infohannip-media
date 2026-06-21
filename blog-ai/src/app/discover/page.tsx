"use client";

import { useState } from "react";
import Link from "next/link";
import { AppShell, PageHeader } from "@/components/layout";

type DiscoverResult = {
  query: string;
  blog: { total: number; items: { title: string; link: string; description: string; bloggername: string }[] };
  trend: { period: string; ratio: number }[];
  insight: string;
};

export default function DiscoverPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<DiscoverResult | null>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/discover?q=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "검색 실패");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "검색 실패");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  async function bookmark(keyword: string) {
    await fetch("/api/bookmarks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword, strategy: "adsense" }),
    });
    alert(`"${keyword}" 북마크에 저장했습니다.`);
  }

  return (
    <AppShell active="/discover">
      <PageHeader
        title="글감 발견"
        description="네이버 블로그 검색 + 데이터랩 트렌드로 주제를 탐색합니다."
      />
      <div className="space-y-8 px-8 py-6">
        <form onSubmit={handleSearch} className="flex gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="키워드 입력 (예: 건강기능식품 추천)"
            className="flex-1 rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-zinc-900"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? "검색 중..." : "검색"}
          </button>
        </form>

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {result ? (
          <div className="space-y-6">
            <section className="rounded-2xl border border-zinc-200 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">{result.query}</h3>
                  <p className="mt-1 text-sm text-zinc-500">
                    블로그 검색 {result.blog.total.toLocaleString()}건 · {result.insight}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => bookmark(result.query)}
                    className="rounded-lg border border-zinc-300 px-3 py-2 text-sm hover:bg-zinc-50"
                  >
                    북마크
                  </button>
                  <Link
                    href={`/ai?keyword=${encodeURIComponent(result.query)}`}
                    className="rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white"
                  >
                    AI 글쓰기
                  </Link>
                </div>
              </div>

              {result.trend.length > 0 ? (
                <div className="mt-5 flex items-end gap-2">
                  {result.trend.map((point) => (
                    <div key={point.period} className="flex flex-1 flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t bg-zinc-900"
                        style={{ height: `${Math.max(8, point.ratio * 1.2)}px` }}
                      />
                      <span className="text-[10px] text-zinc-500">
                        {point.period.slice(5)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : null}
            </section>

            <section>
              <h3 className="mb-3 text-sm font-semibold text-zinc-700">상위 블로그 글</h3>
              <div className="space-y-3">
                {result.blog.items.map((item) => (
                  <a
                    key={item.link}
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-xl border border-zinc-200 p-4 transition hover:border-zinc-400"
                  >
                    <p className="font-medium">{item.title}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-zinc-500">
                      {item.description}
                    </p>
                    <p className="mt-2 text-xs text-zinc-400">{item.bloggername}</p>
                  </a>
                ))}
              </div>
            </section>
          </div>
        ) : null}
      </div>
    </AppShell>
  );
}
