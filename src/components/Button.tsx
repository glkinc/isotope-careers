import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type ButtonProps = {
  href: string;
  variant?: "solid" | "outline";
  external?: boolean;
  children: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "children">;

const base =
  "group inline-flex items-center gap-4 rounded-xl px-6 py-3.5 font-bold text-brand transition-all duration-300 ease-out hover:-translate-y-0.5";

const variants = {
  solid:
    "bg-white shadow-[0_2px_10px_rgba(0,0,0,0.12)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.16)]",
  outline:
    "border border-brand/15 bg-transparent shadow-none hover:border-transparent hover:bg-white hover:shadow-[0_6px_16px_rgba(0,0,0,0.16)]",
};

export default function Button({
  href,
  variant = "solid",
  external = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      <span>{children}</span>
      <span aria-hidden className="h-5 w-px bg-brand/15" />
      <svg
        aria-hidden
        viewBox="0 0 12 20"
        className="h-4 w-2.5 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1"
      >
        <path
          d="M1.5 1.5L9.5 10L1.5 18.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
