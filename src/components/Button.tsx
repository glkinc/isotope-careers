import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

type ButtonProps = {
  href: string;
  variant?: "solid" | "outline";
  external?: boolean;
  children: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "children">;

const base =
  "group inline-flex items-center gap-3 sm:gap-4 rounded-xl px-4 py-3 sm:px-6 sm:py-3.5 text-sm sm:text-base font-bold transition-all duration-300 ease-out hover:-translate-y-0.5";

const variants = {
  solid: {
    button:
      "bg-primary-text text-white shadow-[0_2px_10px_rgba(0,0,0,0.18)] hover:bg-primary-text hover:shadow-[0_6px_16px_rgba(0,0,0,0.24)]",
    chevron: "",
  },
  outline: {
    button:
      "border border-brand/15 bg-transparent text-brand shadow-none hover:border-transparent hover:bg-white hover:shadow-[0_6px_16px_rgba(0,0,0,0.16)]",
    chevron: "group-hover:translate-x-1",
  },
};

export default function Button({
  href,
  variant = "solid",
  external = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const styles = variants[variant];
  return (
    <Link
      href={href}
      className={`${base} ${styles.button} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      <span>{children}</span>
      <ChevronRight
        aria-hidden
        className={`h-4 w-4 shrink-0 transition-transform duration-300 ease-out ${styles.chevron}`}
      />
    </Link>
  );
}
