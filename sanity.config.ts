"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

// O Perfil é um documento único: existe só um, por isso não se cria nem apaga.
const PROFILE_ID = "profile";

export default defineConfig({
  name: "default",
  title: "Portfólio",
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter((template) => template.schemaType !== "profile"),
  },
  document: {
    actions: (actions, { schemaType }) =>
      schemaType === "profile"
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
              .id(PROFILE_ID)
              .child(
                S.document()
                  .schemaType("profile")
                  .documentId(PROFILE_ID)
                  .title("Perfil"),
              ),
            S.documentTypeListItem("project").title("Projetos"),
          ]),
    }),
  ],
});
