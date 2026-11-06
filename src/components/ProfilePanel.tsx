import type { Profile } from "@/content/types";
import { ExternalLink } from "./ExternalLink";

export function ProfilePanel({ profile }: { profile: Profile }) {
  return (
    <div className="flex flex-col gap-15 xl:sticky xl:top-0 xl:col-span-5 xl:row-start-1 xl:h-dvh xl:justify-between xl:gap-10 xl:self-start xl:overflow-y-auto xl:py-10 xl:[scrollbar-width:none]">
      <header className="flex flex-col gap-4 xl:w-[448px] xl:max-w-full">
        <div className="text-title flex items-center justify-between font-bold">
          <h1>{profile.name}</h1>
          <a href={`mailto:${profile.email}`} className="underline-offset-2 hover:underline xl:hidden">
            Email
          </a>
        </div>
        <p>{profile.bio}</p>
      </header>

      <div className="flex flex-col gap-10">
        {profile.education.length > 0 && (
          <section className="flex flex-col gap-4">
            <h2 className="font-bold">Education</h2>
            <div className="flex flex-col gap-4">
              {profile.education.map((item) => (
                <p key={`${item.degree}-${item.school}`}>
                  <strong className="font-bold">{item.degree}</strong>
                  <br />
                  {item.school}
                </p>
              ))}
            </div>
          </section>
        )}

        {profile.experience.length > 0 && (
          <section className="flex flex-col gap-4 xl:w-[472px] xl:max-w-full">
            <h2 className="font-semibold xl:font-bold">Experience</h2>
            <ul className="flex flex-col gap-4 xl:gap-2">
              {profile.experience.map((item, index) => (
                <li
                  key={`${item.period}-${item.role}`}
                  className="flex flex-col gap-4 xl:gap-2"
                >
                  <div className="flex flex-col gap-2 whitespace-nowrap xl:grid xl:grid-cols-[247px_1fr] xl:items-center xl:gap-0">
                    <span className="text-small xl:text-body">{item.period}</span>
                    <span>
                      <ExternalLink href={item.url}>{item.role}</ExternalLink>
                    </span>
                  </div>
                  {index < profile.experience.length - 1 && <Divider />}
                </li>
              ))}
            </ul>
          </section>
        )}

        {profile.skills.length > 0 && (
          <section className="flex flex-col gap-4">
            <h2 className="font-bold">Skills</h2>
            <ul className="flex flex-col gap-1">
              {profile.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="relative h-0 w-full">
      <div className="absolute -inset-y-[0.5px] inset-x-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/divider.svg" alt="" className="block size-full max-w-none" />
      </div>
    </div>
  );
}
