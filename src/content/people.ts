/**
 * Management and board.
 * Names and roles transcribed from the "Executive Advisory Board" flyers on the old About page.
 * Photos are interim crops of those flyers: replace with proper portraits.
 * Bios are TODO: the old site gave roles only.
 */

export type Person = {
  name: string;
  role: string;
  /** Outside role, as printed on the flyer */
  affiliation?: string;
  bio: string;
  bioConfirmed: boolean;
  photo: string;
  group: "leadership" | "board";
};

export const people: Person[] = [
  {
    name: "Rere Obaisi",
    role: "MD/CEO, Reohob Group",
    bio: "TODO: two or three sentences on background, experience and responsibilities.",
    bioConfirmed: false,
    photo: "/team/rere-obaisi.webp",
    group: "leadership",
  },
  {
    name: "Gabriel Falana",
    role: "Executive Advisory Board",
    affiliation: "Head Products and Strategy, Castle Trust Bank, United Kingdom",
    bio: "TODO: short bio.",
    bioConfirmed: false,
    photo: "/team/gabriel-falana.webp",
    group: "board",
  },
  {
    name: "Dolapo Osinowo",
    role: "Executive Advisory Board",
    affiliation: "Executive Assistant to the Chairman, Multichoice Nigeria",
    bio: "TODO: short bio.",
    bioConfirmed: false,
    photo: "/team/dolapo-osinowo.webp",
    group: "board",
  },
  {
    name: "Emmanuel Oyedeji",
    role: "Executive Advisory Board",
    affiliation: "Operations Project Manager, Monster Energy, United Kingdom",
    bio: "TODO: short bio.",
    bioConfirmed: false,
    photo: "/team/emmanuel-oyedeji.webp",
    group: "board",
  },
];
