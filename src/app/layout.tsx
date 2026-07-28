import type { Metadata, Viewport } from "next";
import { Cabin } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import Header from "@/components/Header";

const cabin = Cabin({
  variable: "--font-cabin",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sabertree",
    template: "%s | Sabertree",
  },
  description:
    "Explore careers, education paths, and skill trees for isotope production and use in Canada.",
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
    other: [
      {
        rel: "mask-icon",
        url: "/favicon/safari-pinned-tab.svg",
        color: "#45434c",
      },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  other: {
    "msapplication-config": "/favicon/browserconfig.xml",
  },
};

export const viewport: Viewport = {
  themeColor: "#45434c",
};

const navLinks = [
  { href: "/find-a-career", label: "Find a Career" },
  { href: "/careers", label: "All Careers" },
  { href: "/education", label: "Browse Programs" },
  { href: "/about", label: "About" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cabin.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-brand font-sans">
        <Header navLinks={navLinks} />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-brand/10 bg-white py-12 print:hidden">
          <div className="mx-auto flex max-w-5xl flex-col items-start gap-4 px-6 text-left">
            <Image
              src="/logo-full.svg"
              alt="Sabertree"
              width={180}
              height={30}
            />
            <p className="text-sm text-brand/80">
              © {new Date().getFullYear()} Sabertree. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
