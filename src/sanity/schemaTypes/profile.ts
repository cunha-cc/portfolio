import { defineArrayMember, defineField, defineType } from "sanity";

export const profile = defineType({
  name: "profile",
  title: "Perfil",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      description: "Para onde vai o link “Email” do site.",
      type: "email",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "note",
      title: "Nota (opcional)",
      description:
        "Texto em cinzento entre o nome e a descrição “Sobre mim”. Um Enter cria uma quebra de linha só em tablet.",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "bio",
      title: "Sobre mim",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "education",
      title: "Educação",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "educationItem",
          title: "Formação",
          fields: [
            defineField({
              name: "degree",
              title: "Curso",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "school",
              title: "Instituição",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "degree", subtitle: "school" } },
        }),
      ],
    }),
    defineField({
      name: "experience",
      title: "Experiência",
      description: "Arrasta para mudar a ordem.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "experienceItem",
          title: "Experiência",
          fields: [
            defineField({
              name: "period",
              title: "Período",
              description: "Por exemplo: 2023 - Current",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "role",
              title: "Função",
              description: "Por exemplo: Designer at Onda Studio",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "Link (opcional)",
              description: "Se preencheres, aparece a seta ↗ junto à função.",
              type: "url",
            }),
          ],
          preview: { select: { title: "role", subtitle: "period" } },
        }),
      ],
    }),
    defineField({
      name: "software",
      title: "Software",
      description: "Arrasta para mudar a ordem.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "skills",
      title: "Competências",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
  ],
  preview: { select: { title: "name" } },
});
