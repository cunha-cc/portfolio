import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return (
    <>
      {/* A etiqueta da Netlify tapa o botão Publish no canto inferior direito. */}
      <style>{"#nl-badge-frame { right: auto !important; left: 0 !important; }"}</style>
      <NextStudio config={config} />
    </>
  );
}
