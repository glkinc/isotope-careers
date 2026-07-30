import type { LucideIcon } from "lucide-react";

type PillProps = {
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
};

export default function Pill({ icon: Icon, children, className = "" }: PillProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-primary mb-4 bg-primary/10 px-3 py-1 text-sm font-semibold text-brand ${className}`}
    >
      {Icon && <Icon aria-hidden className="h-3.5 w-3.5 shrink-0 text-primary-text" />}
      {children}
    </span>
  );
}
