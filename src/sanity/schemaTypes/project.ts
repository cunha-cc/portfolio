import { defineArrayMember, defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Projeto",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nome do projeto",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "Link do site do projeto (opcional)",
      description: "Se preencheres, o nome fica clicável e aparece a seta ↗.",
      type: "url",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      description: "Por exemplo: Brand, Web. Aparecem em maiúsculas no site.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "studio",
      title: "Estúdio (opcional)",
      description:
        "Se fizeste o projeto num estúdio. Escreve só o nome: o site acrescenta “At”.",
      type: "string",
    }),
    defineField({
      name: "studioUrl",
      title: "Link do estúdio (opcional)",
      description: "Se preencheres, o nome do estúdio fica sublinhado e clicável.",
      type: "url",
    }),
    defineField({
      name: "images",
      title: "Imagens e vídeos",
      description:
        "Formato 16:9. Vídeos em MP4 ou WebM, de preferência comprimidos. Com mais de um item aparecem as setas da galeria. Arrasta para mudar a ordem.",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Descrição da imagem",
              description: "Para leitores de ecrã e motores de busca.",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
        }),
        defineArrayMember({
          type: "file",
          name: "video",
          title: "Vídeo",
          options: { accept: "video/mp4,video/webm" },
          fields: [
            defineField({
              name: "alt",
              title: "Descrição do vídeo",
              description: "Para leitores de ecrã e motores de busca.",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "poster",
              title: "Imagem de capa (opcional)",
              description: "Aparece enquanto o vídeo carrega.",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: "alt", media: "poster" },
            prepare: ({ title, media }) => ({ title, subtitle: "Vídeo", media }),
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "order",
      title: "Ordem",
      description: "Os números mais baixos aparecem primeiro no site.",
      type: "number",
      initialValue: 10,
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Ordem no site",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "studio", first: "images.0" },
    prepare: ({ title, subtitle, first }) => ({
      title,
      subtitle,
      // Só as imagens podem servir de miniatura; um vídeo usa a capa, se tiver.
      media: first?._type === "video" ? first.poster : first,
    }),
  },
});
