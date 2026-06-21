import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

export type Bookmark = {
  id: string;
  keyword: string;
  note?: string;
  strategy?: "adsense" | "coupang" | "homefeed";
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "bookmarks.json");

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "[]", "utf-8");
  }
}

export async function listBookmarks(): Promise<Bookmark[]> {
  await ensureStore();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  const items = JSON.parse(raw) as Bookmark[];
  return items.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function addBookmark(input: {
  keyword: string;
  note?: string;
  strategy?: Bookmark["strategy"];
}): Promise<Bookmark> {
  const items = await listBookmarks();
  const bookmark: Bookmark = {
    id: randomUUID(),
    keyword: input.keyword.trim(),
    note: input.note?.trim(),
    strategy: input.strategy,
    createdAt: new Date().toISOString(),
  };
  items.unshift(bookmark);
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), "utf-8");
  return bookmark;
}

export async function removeBookmark(id: string): Promise<boolean> {
  const items = await listBookmarks();
  const next = items.filter((item) => item.id !== id);
  if (next.length === items.length) return false;
  await fs.writeFile(DATA_FILE, JSON.stringify(next, null, 2), "utf-8");
  return true;
}
