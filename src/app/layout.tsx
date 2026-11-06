import type { Metadata } from "next";
import localFont from "next/font/local";
import { getContent, getDesignTokens } from "@/sanity/content";
import { tokensToCss } from "@/sanity/designTokens";
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const tokens = await getDesignTokens();

  return (
    <html lang="en" className={sans.variable}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: tokensToCss(tokens) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
