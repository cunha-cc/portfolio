import { ProfilePanel } from "@/components/ProfilePanel";
import { ProjectCard } from "@/components/ProjectCard";
import { getContent } from "@/sanity/content";

export default async function HomePage() {
  const { profile, projects } = await getContent();

  return (
    <main className="mx-auto grid max-w-[1440px] grid-cols-1 gap-y-(--section-gap) px-(--margin-mobile) pt-(--margin-mobile) pb-10 xl:grid-cols-12 xl:gap-x-(--gutter) xl:px-(--margin-desktop) xl:py-0">
      <ProfilePanel profile={profile} />

      <section className="flex flex-col gap-4 xl:contents">
        <h2 className="text-title font-bold xl:sticky xl:top-(--margin-desktop) xl:col-start-6 xl:row-start-1 xl:mt-(--margin-desktop) xl:-ml-[3px] xl:self-start xl:whitespace-nowrap">
          Selected
          <br />
          Work
        </h2>
        <div className="flex flex-col gap-(--project-gap) xl:col-span-5 xl:col-start-7 xl:row-start-1 xl:py-(--margin-desktop)">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} priority={index === 0} />
          ))}
        </div>
      </section>

      <a
        href={`mailto:${profile.email}`}
        className="text-title hidden font-bold underline-offset-2 hover:underline xl:sticky xl:top-(--margin-desktop) xl:col-start-12 xl:row-start-1 xl:mt-(--margin-desktop) xl:block xl:self-start xl:justify-self-end"
      >
        Email
      </a>
    </main>
  );
}
