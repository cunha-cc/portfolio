import { defineField, defineType } from "sanity";
import { tokenDefaults } from "../designTokens";

const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;

function colorField(name: keyof typeof tokenDefaults, title: string, description: string) {
  return defineField({
    name,
    title,
    description: `${description} Formato #RRGGBB. Valor original: ${tokenDefaults[name]}.`,
    type: "string",
    group: "colors",
    validation: (rule) =>
      rule.required().regex(HEX_COLOR, { name: "cor hexadecimal" }),
  });
}

function numberField(
  name: keyof typeof tokenDefaults,
  title: string,
  group: "type" | "spacing",
  min: number,
  max: number,
  unit: string,
) {
  return defineField({
    name,
    title,
    description: `Em ${unit}, entre ${min} e ${max}. Valor original: ${tokenDefaults[name]}.`,
    type: "number",
    group,
    validation: (rule) => rule.required().min(min).max(max),
  });
}

export const designSystem = defineType({
  name: "designSystem",
  title: "Design System",
  type: "document",
  groups: [
    { name: "colors", title: "Cores", default: true },
    { name: "type", title: "Tipografia" },
    { name: "spacing", title: "Espaçamento" },
  ],
  fields: [
    colorField("colorText", "Texto", "Texto principal, títulos e links."),
    colorField("colorMuted", "Texto secundário", "Nota, datas, tags e estúdio."),
    colorField("colorBackgroundDesktop", "Fundo em desktop", "Fundo da página a partir de 1280 px."),
    colorField("colorBackgroundMobile", "Fundo em mobile", "Fundo da página abaixo de 1280 px."),
    colorField("colorPlaceholder", "Fundo da galeria", "Aparece enquanto as imagens carregam."),

    numberField("fontTitle", "Tamanho dos títulos", "type", 12, 48, "px"),
    numberField("fontBody", "Tamanho do texto", "type", 12, 32, "px"),
    numberField("fontCaption", "Tamanho do texto pequeno", "type", 10, 20, "px"),
    numberField("lineHeightTitle", "Altura de linha dos títulos", "type", 1, 2, "múltiplos do tamanho"),
    numberField("lineHeightBody", "Altura de linha do texto", "type", 1, 2, "múltiplos do tamanho"),

    numberField("marginMobile", "Margem da página em mobile", "spacing", 0, 80, "px"),
    numberField("marginDesktop", "Margem da página em desktop", "spacing", 0, 120, "px"),
    numberField("gutter", "Espaço entre colunas em desktop", "spacing", 0, 64, "px"),
    numberField("sectionGap", "Espaço entre secções em mobile", "spacing", 0, 160, "px"),
    numberField("projectGap", "Espaço entre projetos", "spacing", 0, 160, "px"),
    numberField("blockGap", "Espaço entre Education, Experience e Skills", "spacing", 0, 120, "px"),
  ],
  preview: { prepare: () => ({ title: "Design System" }) },
});
