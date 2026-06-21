"use client";

import Link from "next/link";
import { AppShell, PageHeader, StrategyBadge } from "@/components/layout";
import { useBookmarks } from "@/hooks/use-bookmarks";

export default function BookmarksPage() {
  const { items, ready, remove } = useBookmarks();

  return (
    <AppShell active="/bookmarks">
      <PageHeader title="북마크" description="저장한 글감 키워드 (브라우저에 저장)" />
      <div className="px-8 py-6">
        {!ready ? (
          <p className="text-sm text-zinc-500">불러오는 중...</p>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 p-8 text-center">
            <p className="text-sm text-zinc-500">저장된 글감이 없습니다.</p>
            <Link href="/discover" className="mt-3 inline-block text-sm font-medium text-zinc-900">
              글감 발견하러 가기 →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-200 p-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{item.keyword}</p>
                    <StrategyBadge strategy={item.strategy} />
                  </div>
                  <p className="mt-1 text-xs text-zinc-400">
                    {new Date(item.createdAt).toLocaleString("ko-KR")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/ai?keyword=${encodeURIComponent(item.keyword)}`}
                    className="rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white"
                  >
                    AI 글쓰기
                  </Link>
                  <button
                    onClick={() => remove(item.id)}
                    className="rounded-lg border border-zinc-300 px-3 py-2 text-sm"
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
