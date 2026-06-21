import Link from "next/link";
import { AppShell, PageHeader } from "@/components/layout";

const STEPS = [
  {
    step: "1",
    title: "수익화 전략 선택",
    desc: "애드센스 · 쿠팡파트너스 · 네이버 홈피드 중 목표를 정합니다.",
  },
  {
    step: "2",
    title: "글감 발견",
    desc: "네이버 검색·트렌드로 경쟁과 관심도를 확인합니다.",
  },
  {
    step: "3",
    title: "AI 글쓰기",
    desc: "초안 생성 후 대화로 수정해 포스팅합니다.",
  },
];

export default function HomePage() {
  return (
    <AppShell active="/">
      <PageHeader
        title="개인용 글감 AI"
        description="결제·멤버십 없이 로컬에서만 사용하는 블로그 글쓰기 도구"
      />
      <div className="px-8 py-6">
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {STEPS.map((item) => (
            <div key={item.step} className="rounded-2xl border border-zinc-200 p-5">
              <p className="text-xs font-semibold text-zinc-400">STEP {item.step}</p>
              <h3 className="mt-2 font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/discover"
            className="rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white"
          >
            글감 발견 시작
          </Link>
          <Link
            href="/ai"
            className="rounded-xl border border-zinc-300 px-5 py-3 text-sm font-medium"
          >
            AI 글쓰기
          </Link>
          <Link
            href="/bookmarks"
            className="rounded-xl border border-zinc-300 px-5 py-3 text-sm font-medium"
          >
            북마크 보기
          </Link>
        </div>

        <div className="mt-10 rounded-2xl bg-zinc-50 p-5 text-sm text-zinc-600">
          <p className="font-medium text-zinc-900">시작 전 설정</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            <li>
              <code className="text-xs">blog-ai/.env.local</code> 파일 생성
            </li>
            <li>
              <code className="text-xs">NAVER_CLIENT_ID</code>,{" "}
              <code className="text-xs">NAVER_CLIENT_SECRET</code> 입력
            </li>
            <li>
              <code className="text-xs">OPENAI_API_KEY</code> 입력 (AI 글쓰기용)
            </li>
            <li>
              <code className="text-xs">npm run dev</code> 로 로컬 실행
            </li>
          </ol>
        </div>
      </div>
    </AppShell>
  );
}
