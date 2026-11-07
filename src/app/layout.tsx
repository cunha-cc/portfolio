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
    robots: { index: false, follow: false },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const tokens = await getDesignTokens();

  return (
    <html lang="en" className={sans.variable}>
      <body>
        {/* O React move este estilo para o <head>. Um <head> explícito falha com o HTML da Netlify. */}
        <style href="design-tokens" precedence="default">
          {tokensToCss(tokens)}
        </style>
        {children}
      </body>
    </html>
  );
}
