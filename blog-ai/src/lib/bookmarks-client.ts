export type Bookmark = {
  id: string;
  keyword: string;
  note?: string;
  strategy?: "adsense" | "coupang" | "homefeed";
  createdAt: string;
};

const STORAGE_KEY = "blog-ai-bookmarks";

function readStore(): Bookmark[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Bookmark[]) : [];
  } catch {
    return [];
  }
}

function writeStore(items: Bookmark[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function listBookmarksClient(): Bookmark[] {
  return readStore().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function addBookmarkClient(input: {
  keyword: string;
  note?: string;
  strategy?: Bookmark["strategy"];
}): Bookmark {
  const items = readStore();
  const bookmark: Bookmark = {
    id: crypto.randomUUID(),
    keyword: input.keyword.trim(),
    note: input.note?.trim(),
    strategy: input.strategy,
    createdAt: new Date().toISOString(),
  };
  items.unshift(bookmark);
  writeStore(items);
  return bookmark;
}

export function removeBookmarkClient(id: string): boolean {
  const items = readStore();
  const next = items.filter((item) => item.id !== id);
  if (next.length === items.length) return false;
  writeStore(next);
  return true;
}
