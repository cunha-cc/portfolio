import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="flex min-h-dvh flex-col gap-4 p-10">
        <h1 className="text-title font-bold">A Sanity ainda não está ligada</h1>
        <p>
          Segue os passos do README e preenche o ficheiro .env.local com o Project ID. Depois
          reinicia o servidor.
        </p>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
