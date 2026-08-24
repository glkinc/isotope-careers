"use client";

import { useState } from "react";
import { Building2 } from "lucide-react";

type Props = {
  name: string;
  website: string | null;
  className?: string;
};

// Institutions and companies don't have a hosted logo asset, so we derive
// one from their domain rather than storing brittle logo URLs. Clearbit
// serves an actual high-res logo when it has one; if not (or the request
// fails) we fall back to Google's favicon service at a large size, which is
// still much sharper than a plain 16-32px .ico favicon.
function logoUrlsFor(website: string): string[] | null {
  try {
    const { hostname } = new URL(website);
    return [
      `https://logo.clearbit.com/${hostname}?size=256`,
      `https://www.google.com/s2/favicons?domain=${hostname}&sz=256`,
    ];
  } catch {
    return null;
  }
}

export default function OrgLogo({ name, website, className }: Props) {
  const [attempt, setAttempt] = useState(0);
  const sources = website ? logoUrlsFor(website) : null;
  const src = sources?.[attempt];

  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-[#f6f6f7] ${className ?? ""}`}
      >
        <Building2 aria-hidden className="h-1/2 w-1/2 text-brand/40" />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`${name} logo`}
      onError={() => setAttempt((a) => a + 1)}
      className={`object-contain ${className ?? ""}`}
    />
  );
}
