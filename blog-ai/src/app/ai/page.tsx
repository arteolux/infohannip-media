"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AppShell, PageHeader } from "@/components/layout";

type Message = { role: "user" | "assistant"; content: string };

function AiWriterContent() {
  const searchParams = useSearchParams();
  const initialKeyword = searchParams.get("keyword") ?? "";

  const [keyword, setKeyword] = useState(initialKeyword);
  const [strategy, setStrategy] = useState("adsense");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generate(initial = false) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          initial
            ? { keyword, strategy }
            : {
                messages: [
                  ...messages.map((m) => ({ role: m.role, content: m.content })),
                  { role: "user", content: input },
                ],
              },
        ),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "생성 실패");

      const nextMessages = initial
        ? [{ role: "assistant" as const, content: data.content }]
        : [
            ...messages,
            { role: "user" as const, content: input },
            { role: "assistant" as const, content: data.content },
          ];

      setMessages(nextMessages);
      setInput("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "생성 실패");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell active="/ai">
      <PageHeader
        title="AI 글쓰기"
        description="키워드 기반 초안 생성 후 대화로 수정합니다."
      />
      <div className="flex h-[calc(100vh-97px)] flex-col px-8 py-6">
        <div className="mb-4 flex flex-wrap gap-3">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="키워드"
            className="min-w-48 flex-1 rounded-xl border border-zinc-300 px-4 py-2 text-sm"
          />
          <select
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
            className="rounded-xl border border-zinc-300 px-4 py-2 text-sm"
          >
            <option value="adsense">애드센스</option>
            <option value="coupang">쿠팡파트너스</option>
            <option value="homefeed">네이버 홈피드</option>
          </select>
          <button
            onClick={() => generate(true)}
            disabled={loading || !keyword.trim()}
            className="rounded-xl bg-zinc-900 px-4 py-2 text-sm text-white disabled:opacity-50"
          >
            초안 생성
          </button>
        </div>

        {error ? (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div className="flex-1 space-y-4 overflow-auto rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
          {messages.length === 0 ? (
            <p className="text-sm text-zinc-500">
              키워드를 입력하고 초안 생성을 누르세요.
            </p>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-3xl rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "ml-auto bg-zinc-900 text-white"
                    : "bg-white border border-zinc-200"
                }`}
              >
                {msg.content}
              </div>
            ))
          )}
        </div>

        <form
          className="mt-4 flex gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim() && messages.length) generate(false);
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="수정 요청 (예: 소제목을 더 구체적으로)"
            className="flex-1 rounded-xl border border-zinc-300 px-4 py-3 text-sm"
          />
          <button
            type="submit"
            disabled={loading || !input.trim() || messages.length === 0}
            className="rounded-xl border border-zinc-300 px-4 py-3 text-sm disabled:opacity-50"
          >
            전송
          </button>
        </form>
      </div>
    </AppShell>
  );
}

export default function AiPage() {
  return (
    <Suspense>
      <AiWriterContent />
    </Suspense>
  );
}
