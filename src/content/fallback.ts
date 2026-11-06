import type { Content, Project } from "./types";

// Conteúdo do Figma, mostrado enquanto a Sanity não estiver ligada ou estiver vazia.
const LOREM_SHORT =
  "Lorem ipsum dolor sit amet consectetur. Ipsum amet eu dignissim consectetur nunc nec tortor enim.";

const placeholderProject = (id: string): Project => ({
  id,
  title: "Title",
  url: "#",
  tags: ["Brand", "Web"],
  description: LOREM_SHORT,
  studio: "Onda Studio",
  studioUrl: "#",
  media: [
    { kind: "image", url: null, alt: "" },
    { kind: "image", url: null, alt: "" },
  ],
});

export const fallbackContent: Content = {
  profile: {
    name: "R. Cunha",
    email: "email@example.com",
    note: "But you can call me “Ray”. In portuguese, it's pronounced \"hī,\" like \"hi”. So, you can say “Hi, Hi!”",
    bio: "Lorem ipsum dolor sit amet consectetur. Ipsum amet eu dignissim consectetur nunc nec tortor enim. Eget magna quam sed mauris. Nisl purus malesuada dictum enim tellus tincidunt et neque nullam. Mattis enim lorem sollicitudin ut. Tristique ipsum massa facilisi ut vestibulum vitae.",
    education: [
      {
        degree: "Bachelor’s degree in Communication Design",
        school: "Faculty of Fine Arts of University of Porto",
      },
    ],
    experience: [
      { period: "2023 - Current", role: "Designer at Onda Studio", url: "#" },
      { period: "2021 - 2023", role: "Intership at ESTUDIO CRU", url: "#" },
      { period: "2021 - 2021", role: "Designer at FBAUP Design INC." },
    ],
    software: ["Figma", "Claude", "Illustration", "After Effects", "Photoshop", "Indesign"],
    skills: ["Digital Design", "AI", "Branding", "Motion", "Illustration"],
  },
  projects: [placeholderProject("placeholder-1"), placeholderProject("placeholder-2")],
};
