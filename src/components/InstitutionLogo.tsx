"use client";

import { useState } from "react";
import { Building2 } from "lucide-react";

type Props = {
  name: string;
  logoUrl: string | null;
  className?: string;
};

export default function InstitutionLogo({ name, logoUrl, className }: Props) {
  const [failed, setFailed] = useState(false);

  if (!logoUrl || failed) {
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
      src={logoUrl}
      alt={`${name} logo`}
      onError={() => setFailed(true)}
      className={`object-contain ${className ?? ""}`}
    />
  );
}
