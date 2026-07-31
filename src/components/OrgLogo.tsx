"use client";

import { useState } from "react";
import { Building2 } from "lucide-react";

type Props = {
  name: string;
  website: string | null;
  className?: string;
};

// Institutions and companies don't have a hosted logo asset, so we derive
// one from their domain via a favicon service rather than storing brittle
// logo URLs.
function faviconUrlFor(website: string): string | null {
  try {
    const { hostname } = new URL(website);
    return `https://icons.duckduckgo.com/ip3/${hostname}.ico`;
  } catch {
    return null;
  }
}

export default function OrgLogo({ name, website, className }: Props) {
  const [failed, setFailed] = useState(false);
  const src = website ? faviconUrlFor(website) : null;

  if (!src || failed) {
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
      onError={() => setFailed(true)}
      className={`object-contain ${className ?? ""}`}
    />
  );
}
