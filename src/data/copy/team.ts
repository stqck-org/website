import teamEn from "../en/team.json";
import teamFr from "../fr/team.json";

import type { TeamMemberId } from "../team";

export interface TeamItemCopy {
  role: string;
  note: string;
}

/** Copy contract for the Team section; items are keyed by member id. */
export interface TeamCopy {
  sectionLabel: string;
  heading: string;
  intro: string;
  learnAbout: string;
  viewAll: string;
  items: Record<TeamMemberId, TeamItemCopy>;
  aria: {
    previous: string;
    next: string;
    select: string;
    portrait: string;
  };
}

const en: TeamCopy = teamEn;
const fr: TeamCopy = teamFr;

export const teamCopy = { en, fr };
