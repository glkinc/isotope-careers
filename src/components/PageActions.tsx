"use client";

import { useEffect, useRef, useState } from "react";
import { Printer, Share2 } from "lucide-react";

type Props = {
  title: string;
};

export default function PageActions({ title }: Props) {
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShareOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  async function handleShareClick() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url: window.location.href });
      } catch {
        // user cancelled - no-op
      }
      return;
    }
    setShareOpen((v) => !v);
  }

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const url = typeof window !== "undefined" ? window.location.href : "";
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="no-print flex items-center gap-3 print:hidden">
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-brand/15 px-4 py-2 text-sm font-bold text-brand transition-colors duration-200 hover:border-primary"
      >
        <Printer aria-hidden className="h-4 w-4" />
        Print
      </button>

      <div ref={menuRef} className="relative">
        <button
          type="button"
          onClick={handleShareClick}
          className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-brand/15 px-4 py-2 text-sm font-bold text-brand transition-colors duration-200 hover:border-primary"
        >
          <Share2 aria-hidden className="h-4 w-4" />
          Share
        </button>

        {shareOpen && (
          <div className="absolute right-0 z-10 mt-2 w-48 rounded-md border border-brand/10 bg-white py-1 shadow-lg">
            <a
              href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm text-brand hover:bg-primary/10"
            >
              Share on X
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm text-brand hover:bg-primary/10"
            >
              Share on LinkedIn
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm text-brand hover:bg-primary/10"
            >
              Share on Facebook
            </a>
            <a
              href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
              className="block px-4 py-2 text-sm text-brand hover:bg-primary/10"
            >
              Email
            </a>
            <button
              type="button"
              onClick={copyLink}
              className="block w-full cursor-pointer px-4 py-2 text-left text-sm text-brand hover:bg-primary/10"
            >
              {copied ? "Copied!" : "Copy link"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
