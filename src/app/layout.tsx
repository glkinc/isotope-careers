import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <header className="border-b border-slate-200">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              Isotope Careers <span className="text-teal-600">Canada</span>
            </Link>
            <nav className="flex gap-6 text-sm font-medium text-slate-600">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-teal-600"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500">
          Isotope Careers Canada — an independent guide to careers in isotope
          production and use.
        </footer>
      </body>
    </html>
  );
}
