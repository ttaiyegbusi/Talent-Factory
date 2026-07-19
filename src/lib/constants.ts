import type { NavLink } from "@/types";

export const SITE_NAME = "Talent Factory";
export const SITE_DESCRIPTION =
  "Every great company runs on people you never see. We train and place the operators behind the business.";
export const SITE_URL = "https://www.talentfactoryhq.com";

export const NAV_LINKS: NavLink[] = [
  { label: "Find Talent", href: "/find-talent" },
  { label: "Pricing", href: "/pricing" },
  { label: "For Talent", href: "/for-talent" },
];

export const FOOTER_LINKS: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Platform",
    links: [
      { label: "Find Talent", href: "/find-talent" },
      { label: "Pricing", href: "/pricing" },
      { label: "Hire Someone", href: "/hire" },
    ],
  },
  {
    heading: "For Talent",
    links: [
      { label: "Why Talent Factory", href: "/for-talent" },
      { label: "Join as Talent", href: "/join" },
    ],
  },
];
