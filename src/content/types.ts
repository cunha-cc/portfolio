export type Education = { degree: string; school: string };

export type Experience = { period: string; role: string; url?: string | null };

export type Profile = {
  name: string;
  email: string;
  bio: string;
  education: Education[];
  experience: Experience[];
  skills: string[];
};

/** `url` é null nos marcadores cinzentos, usados enquanto não houver imagens. */
export type ProjectImage = { url: string | null; alt: string };

export type Project = {
  id: string;
  title: string;
  url?: string | null;
  tags: string[];
  description: string;
  studio?: string | null;
  images: ProjectImage[];
};

export type Content = { profile: Profile; projects: Project[] };
