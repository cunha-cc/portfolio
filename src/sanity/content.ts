import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { createClient, defineQuery } from "next-sanity";
import { cache } from "react";
import { fallbackContent } from "@/content/fallback";
import type { Content, Profile, Project } from "@/content/types";
import { apiVersion, dataset, projectId } from "./env";

/** Segundos até o site ir buscar conteúdo novo depois de publicares na Sanity. */
const REVALIDATE_SECONDS = 60;

const PROFILE_QUERY = defineQuery(`*[_id == "profile"][0]{
  name,
  email,
  bio,
  "education": coalesce(education[]{degree, school}, []),
  "experience": coalesce(experience[]{period, role, url}, []),
  "skills": coalesce(skills, [])
}`);

const PROJECTS_QUERY = defineQuery(`*[_type == "project"] | order(order asc, _createdAt desc){
  "id": _id,
  title,
  url,
  "tags": coalesce(tags, []),
  description,
  studio,
  "images": coalesce(images[]{asset, crop, hotspot, alt}, [])
}`);

type SanityImage = SanityImageSource & { alt?: string };
type SanityProject = Omit<Project, "images"> & { images: SanityImage[] };

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
          images: project.images.map((image) => ({
            // O recorte 16:9 respeita o ponto de foco escolhido no Studio.
            url: imageBuilder.image(image).width(1600).height(900).fit("crop").auto("format").url(),
            alt: image.alt ?? "",
          })),
        }))
      : fallbackContent.projects,
  };
}

/** Conteúdo do site, vindo da Sanity. O que ainda estiver vazio usa o exemplo do design. */
export const getContent = cache(fetchFromSanity);
