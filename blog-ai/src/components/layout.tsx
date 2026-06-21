import Link from "next/link";

const NAV = [
  { href: "/", label: "홈" },
  { href: "/discover", label: "글감 발견" },
  { href: "/ai", label: "AI 글쓰기" },
  { href: "/bookmarks", label: "북마크" },
];

export function Sidebar({ active }: { active: string }) {
  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-zinc-200 bg-zinc-50">
      <div className="border-b border-zinc-200 px-5 py-6">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          Personal
        </p>
        <h1 className="mt-1 text-lg font-semibold text-zinc-900">글감 AI</h1>
        <p className="mt-1 text-xs text-zinc-500">개인용 · 로컬 전용</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {NAV.map((item) => {
          const isActive = active === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-700 hover:bg-zinc-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export function AppShell({
  active,
  children,
}: {
  active: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white text-zinc-900">
      <Sidebar active={active} />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

export function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="border-b border-zinc-200 px-8 py-6">
      <h2 className="text-2xl font-semibold">{title}</h2>
      {description ? (
        <p className="mt-1 text-sm text-zinc-500">{description}</p>
      ) : null}
    </div>
  );
}

export function StrategyBadge({ strategy }: { strategy?: string }) {
  const label =
    strategy === "coupang"
      ? "쿠팡"
      : strategy === "homefeed"
        ? "홈피드"
        : strategy === "adsense"
          ? "애드센스"
          : null;

  if (!label) return null;

  return (
    <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600">
      {label}
    </span>
  );
}
