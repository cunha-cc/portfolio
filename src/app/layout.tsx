import type { Metadata } from "next";
import localFont from "next/font/local";
import { getContent } from "@/sanity/content";
import "./globals.css";

const sans = localFont({
  src: "../fonts/42dot-sans-latin.woff2",
  weight: "300 800",
  variable: "--font-42dot",
  display: "swap",
  // Sem fonte de recurso: a seta ↗ tem de vir do @font-face em globals.css.
  adjustFontFallback: false,
});

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getContent();
  return {
    title: `${profile.name} — Portfolio`,
    description: profile.bio,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable}>
      <body>{children}</body>
    </html>
  );
}
