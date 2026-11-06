"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

// Documentos únicos: existe só um de cada, por isso não se criam nem apagam.
const SINGLETONS = ["profile", "designSystem"];

export default defineConfig({
  name: "default",
  title: "Portfólio",
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter((template) => !SINGLETONS.includes(template.schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      SINGLETONS.includes(schemaType)
        ? actions.filter(
            ({ action }) =>
              action === "publish" ||
              action === "discardChanges" ||
              action === "restore",
          )
        : actions,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Conteúdo")
          .items([
            S.listItem()
              .title("Perfil")
              .id("profile")
              .child(
                S.document()
                  .schemaType("profile")
                  .documentId("profile")
                  .title("Perfil"),
              ),
            S.documentTypeListItem("project").title("Projetos"),
            S.divider(),
            S.listItem()
              .title("Design System")
              .id("designSystem")
              .child(
                S.document()
                  .schemaType("designSystem")
                  .documentId("designSystem")
                  .title("Design System"),
              ),
          ]),
    }),
  ],
});
