import type { Profile } from "@/content/types";
import { ExternalLink } from "./ExternalLink";

export function ProfilePanel({ profile }: { profile: Profile }) {
  return (
    <div className="flex flex-col gap-16 xl:sticky xl:top-0 xl:col-span-5 xl:row-start-1 xl:h-dvh xl:justify-between xl:gap-10 xl:self-start xl:overflow-y-auto xl:py-10 xl:[scrollbar-width:none]">
      <header className="flex flex-col gap-4 xl:w-[448px] xl:max-w-full">
        <div className="text-title flex items-center justify-between font-bold">
          <h1>{profile.name}</h1>
          <a href={`mailto:${profile.email}`} className="underline-offset-2 hover:underline xl:hidden">
            Email
          </a>
        </div>
        {profile.note && <p className="text-muted">{profile.note}</p>}
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
                  <div className="flex flex-col gap-2 whitespace-nowrap xl:grid xl:grid-cols-[227px_1fr] xl:items-center xl:gap-0">
                    <span className="text-caption text-muted uppercase">{item.period}</span>
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

        <div className="flex items-start gap-[94px] whitespace-nowrap xl:gap-[142px]">
          <SimpleList title="Software" items={profile.software} />
          <SimpleList title="Skills" items={profile.skills} />
        </div>
      </div>
    </div>
  );
}

function SimpleList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-bold">{title}</h2>
      <ul className="flex flex-col gap-1">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
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
