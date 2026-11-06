import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { createClient, defineQuery } from "next-sanity";
import { cache } from "react";
import { fallbackContent } from "@/content/fallback";
import type { Content, Profile, Project } from "@/content/types";
import type { DesignTokens } from "./designTokens";
import { apiVersion, dataset, projectId } from "./env";

/** Segundos até o site ir buscar conteúdo novo depois de publicares na Sanity. */
const REVALIDATE_SECONDS = 60;

const PROFILE_QUERY = defineQuery(`*[_id == "profile"][0]{
  name,
  email,
  note,
  bio,
  "education": coalesce(education[]{degree, school}, []),
  "experience": coalesce(experience[]{period, role, url}, []),
  "software": coalesce(software, []),
  "skills": coalesce(skills, [])
}`);

const PROJECTS_QUERY = defineQuery(`*[_type == "project"] | order(order asc, _createdAt desc){
  "id": _id,
  title,
  url,
  "tags": coalesce(tags, []),
  description,
  studio,
  studioUrl,
  "media": coalesce(images[]{
    _type,
    alt,
    _type == "video" => {"url": asset->url, poster},
    _type != "video" => {asset, crop, hotspot}
  }, [])
}`);

type SanityMedia =
  | (SanityImageSource & { _type: "image"; alt?: string })
  | { _type: "video"; alt?: string; url: string; poster?: SanityImageSource };
type SanityProject = Omit<Project, "media"> & { media: SanityMedia[] };

async function fetchFromSanity(): Promise<Content> {
  const client = createClient({ projectId, dataset, apiVersion, useCdn: true });
  const imageBuilder = createImageUrlBuilder(client);
  const options = { next: { revalidate: REVALIDATE_SECONDS } };

  const [profile, projects] = await Promise.all([
    client.fetch<Profile | null>(PROFILE_QUERY, {}, options),
    client.fetch<SanityProject[]>(PROJECTS_QUERY, {}, options),
  ]);

  return {
    profile: profile ?? fallbackContent.profile,
    projects: projects.length
      ? projects.map((project) => ({
          ...project,
          media: project.media.map((item) => {
            // O recorte 16:9 respeita o ponto de foco escolhido no Studio.
            const imageUrl = (source: SanityImageSource) =>
              imageBuilder.image(source).width(1600).height(900).fit("crop").auto("format").url();

            return item._type === "video"
              ? {
                  kind: "video" as const,
                  url: item.url,
                  alt: item.alt ?? "",
                  poster: item.poster ? imageUrl(item.poster) : null,
                }
              : { kind: "image" as const, url: imageUrl(item), alt: item.alt ?? "" };
          }),
        }))
      : fallbackContent.projects,
  };
}

/** Valores do documento Design System, ou null enquanto não estiver publicado. */
export const getDesignTokens = cache(() =>
  createClient({ projectId, dataset, apiVersion, useCdn: true }).fetch<Partial<DesignTokens> | null>(
    defineQuery(`*[_id == "designSystem"][0]`),
    {},
    { next: { revalidate: REVALIDATE_SECONDS } },
  ),
);

/** Conteúdo do site, vindo da Sanity. O que ainda estiver vazio usa o exemplo do design. */
export const getContent = cache(fetchFromSanity);
