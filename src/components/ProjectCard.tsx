import type { Project } from "@/content/types";
import { ExternalLink } from "./ExternalLink";
import { ProjectGallery } from "./ProjectGallery";

type Props = { project: Project; priority?: boolean };

export function ProjectCard({ project, priority = false }: Props) {
  return (
    <article className="flex flex-col gap-4">
      <ProjectGallery
        images={project.images}
        projectTitle={project.title}
        priority={priority}
      />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-bold">
            <ExternalLink href={project.url}>{project.title}</ExternalLink>
          </h3>
          {project.tags.length > 0 && (
            <p className="text-small text-muted whitespace-nowrap uppercase">
              {project.tags.join(" • ")}
            </p>
          )}
        </div>
        <p>{project.description}</p>
        {project.studio && (
          <p className="text-muted">
            At{" "}
            {project.studioUrl ? (
              <a
                href={project.studioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-ink"
              >
                {project.studio}
              </a>
            ) : (
              project.studio
            )}
          </p>
        )}
      </div>
    </article>
  );
}
