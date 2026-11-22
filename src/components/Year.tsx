"use client";

import { useEffect, useState } from "react";

/** Current year, resolved in the browser so the static shell never goes stale. */
export default function Year() {
  const [y, setY] = useState<number | null>(null);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- reads a browser-only value once after hydration; it cannot be known during static rendering
  useEffect(() => setY(new Date().getFullYear()), []);
  return <span suppressHydrationWarning>{y ?? 2026}</span>;
}
