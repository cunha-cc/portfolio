/** Valores do Figma, usados enquanto o documento Design System estiver vazio. */
export const tokenDefaults = {
  colorText: "#1c1b1f",
  colorMuted: "#646464",
  colorBackgroundDesktop: "#ffffff",
  colorBackgroundMobile: "#fdfdfd",
  colorPlaceholder: "#cfcfcf",
  fontTitle: 18,
  fontBody: 16,
  fontCaption: 12,
  lineHeightTitle: 1.15,
  lineHeightBody: 1.2,
  marginMobile: 20,
  marginDesktop: 40,
  gutter: 24,
  sectionGap: 64,
  projectGap: 64,
  blockGap: 40,
};

export type DesignTokens = typeof tokenDefaults;

const color = (value: unknown, fallback: string) =>
  typeof value === "string" && /^#[0-9a-fA-F]{6}$/.test(value) ? value : fallback;

const number = (value: unknown, fallback: number) =>
  typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : fallback;

/** Converte os valores da Sanity em variáveis CSS; valores inválidos usam o original. */
export function tokensToCss(tokens: Partial<DesignTokens> | null): string {
  const d = tokenDefaults;
  const t = tokens ?? {};
  const fontTitle = number(t.fontTitle, d.fontTitle);

  return `:root{${[
    `--color-ink:${color(t.colorText, d.colorText)}`,
    `--color-muted:${color(t.colorMuted, d.colorMuted)}`,
    `--color-page-desktop:${color(t.colorBackgroundDesktop, d.colorBackgroundDesktop)}`,
    `--color-surface:${color(t.colorBackgroundMobile, d.colorBackgroundMobile)}`,
    `--color-placeholder:${color(t.colorPlaceholder, d.colorPlaceholder)}`,
    `--text-title:${fontTitle}px`,
    `--text-title--letter-spacing:${(fontTitle * -0.01).toFixed(3)}px`,
    `--text-body:${number(t.fontBody, d.fontBody)}px`,
    `--text-caption:${number(t.fontCaption, d.fontCaption)}px`,
    `--text-title--line-height:${number(t.lineHeightTitle, d.lineHeightTitle)}`,
    `--text-body--line-height:${number(t.lineHeightBody, d.lineHeightBody)}`,
    `--margin-mobile:${number(t.marginMobile, d.marginMobile)}px`,
    `--margin-desktop:${number(t.marginDesktop, d.marginDesktop)}px`,
    `--gutter:${number(t.gutter, d.gutter)}px`,
    `--section-gap:${number(t.sectionGap, d.sectionGap)}px`,
    `--project-gap:${number(t.projectGap, d.projectGap)}px`,
    `--block-gap:${number(t.blockGap, d.blockGap)}px`,
  ].join(";")}}`;
}
