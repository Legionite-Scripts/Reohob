"use client";

import { useState } from "react";
import { MessageSquare, X } from "lucide-react";

const EMBED = process.env.NEXT_PUBLIC_CHATBOT_EMBED_URL;

/**
 * Chatbot slot. Replaces the old "Bukky AI" embed, which showed a 404.
 * Renders nothing unless NEXT_PUBLIC_CHATBOT_EMBED_URL is set. When set, the bot
 * loads only after the visitor opens it, so it never covers content or slows the page.
 */
export default function ChatbotSlot() {
  const [open, setOpen] = useState(false);
  if (!EMBED) return null;
  return (
    <div className="fixed right-3 bottom-20 z-40 flex flex-col items-end gap-2 lg:bottom-3">
      {open ? (
        <div className="h-[min(560px,75vh)] w-[min(360px,calc(100vw-1.5rem))] border border-ink bg-paper shadow-[0_8px_24px_color-mix(in_oklab,var(--color-ink)_20%,transparent)]">
          <iframe src={EMBED} title="Chat with Reohob" className="size-full" loading="lazy" />
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="inline-flex size-14 items-center justify-center rounded-full border-2 border-ink bg-sun text-ink shadow-[0_4px_14px_color-mix(in_oklab,var(--color-ink)_25%,transparent)]"
      >
        {open ? <X aria-hidden /> : <MessageSquare aria-hidden />}
        <span className="sr-only">{open ? "Close chat" : "Open chat"}</span>
      </button>
    </div>
  );
}
