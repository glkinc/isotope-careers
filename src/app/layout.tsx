import type { Metadata } from "next";
import { Cabin, Open_Sans } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const cabin = Cabin({
  variable: "--font-cabin",
  weight: ["700"],
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Isotope Careers Canada",
    template: "%s | Isotope Careers Canada",
  },
  description:
    "Explore careers, education paths, and skill trees for isotope production and use in Canada.",
};

const navLinks = [
  { href: "/path-finder", label: "Find My Path" },
  { href: "/careers", label: "Careers" },
  { href: "/education", label: "Education" },
  { href: "/about", label: "About" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cabin.variable} ${openSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-brand font-sans">
        <header className="bg-brand">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
            <Link
              href="/"
              className="font-heading text-xl font-bold tracking-tight text-white"
            >
              Isotope Careers <span className="text-accent">Canada</span>
            </Link>
            <nav className="flex gap-8 text-sm font-bold text-white">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-brand py-8 text-center text-sm text-white/70">
          Isotope Careers Canada — an independent guide to careers in isotope
          production and use.
        </footer>
      </body>
    </html>
  );
}
