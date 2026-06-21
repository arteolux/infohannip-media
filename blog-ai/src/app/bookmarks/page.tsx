import { listBookmarks } from "@/lib/bookmarks";
import { BookmarkList } from "./bookmark-list";

export default async function BookmarksPage() {
  const items = await listBookmarks();
  return <BookmarkList initialItems={items} />;
}
