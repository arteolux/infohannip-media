"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  addBookmarkClient,
  listBookmarksClient,
  removeBookmarkClient,
  type Bookmark,
} from "@/lib/bookmarks-client";

const EVENT = "bookmarks-updated";

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function notify() {
  window.dispatchEvent(new Event(EVENT));
}

export function useBookmarks() {
  const items = useSyncExternalStore(
    subscribe,
    () => listBookmarksClient(),
    () => [],
  );

  const add = useCallback(
    (input: { keyword: string; note?: string; strategy?: Bookmark["strategy"] }) => {
      const item = addBookmarkClient(input);
      notify();
      return item;
    },
    [],
  );

  const remove = useCallback((id: string) => {
    removeBookmarkClient(id);
    notify();
  }, []);

  return { items, ready: true, add, remove };
}
