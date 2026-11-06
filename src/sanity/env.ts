export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2026-11-01";

/** Falso até preencheres o .env.local; nesse caso o site mostra o conteúdo do design. */
export const isSanityConfigured = projectId.length > 0;
