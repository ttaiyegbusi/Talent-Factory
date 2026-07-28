"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Role = {
  name: string;
  browseLabel: string;
  blurb: string;
  bg: string;
  fg: string;
};

/* Same 9 categories as the /hire and /join forms' role dropdown, cycling
 * through the brand's 5 accent colors (same accessible values as the
 * homepage Hero's role chips) so the palette repeats rather than
 * introducing new ones. */
const roles: Role[] = [
  {
    name: "Executive Assistant",
    browseLabel: "Browse Assistants",
    blurb: "Keeps your calendar, inbox, and priorities running without you micromanaging any of it.",
    bg: "#ffd9c0",
    fg: "#a74504",
  },
  {
    name: "Accountant / Bookkeeper",
    browseLabel: "Browse Accountants",
    blurb: "Books closed on time, every time, no chasing required.",
    bg: "#f6b51e",
    fg: "#5c4716",
  },
  {
    name: "Marketing Specialist",
    browseLabel: "Browse Marketers",
    blurb: "Plans and ships campaigns that actually move the needle, not just the calendar.",
    bg: "#ffc0c5",
    fg: "#b40413",
  },
  {
    name: "Customer Support",
    browseLabel: "Browse Support",
    blurb: "Answers fast, escalates smart, and makes every customer feel handled.",
    bg: "#c0d5ff",
    fg: "#0d3dff",
  },
  {
    name: "Product Designer",
    browseLabel: "Browse Designers",
    blurb: "From wireframes to shipped UI, matched to your product's stage.",
    bg: "#171717",
    fg: "#ffffff",
  },
  {
    name: "Software Engineer",
    browseLabel: "Browse Engineers",
    blurb: "Full-stack operators who can own a feature end to end.",
    bg: "#ffd9c0",
    fg: "#a74504",
  },
  {
    name: "Design Engineer",
    browseLabel: "Browse Engineers",
    blurb: "Ships polished front-end work without a hand-off tax.",
    bg: "#f6b51e",
    fg: "#5c4716",
  },
  {
    name: "Data Analyst",
    browseLabel: "Browse Analysts",
    blurb: "Turns your dashboards into decisions, not just charts.",
    bg: "#c0d5ff",
    fg: "#0d3dff",
  },
  {
    name: "Operations Manager",
    browseLabel: "Browse Managers",
    blurb: "Keeps the day-to-day running so nothing falls through the cracks.",
    bg: "#171717",
    fg: "#ffffff",
  },
];

/* Same right-to-left entrance as Stats/TrustFeatures: cards start bunched
 * past the right edge and settle leftward. Capped at 5 card-widths so a
 * long carousel like this one doesn't fling the earliest cards in at a
 * wildly higher velocity than the rest. */
const enterOffset = (index: number, count: number) =>
  `${Math.min(count - index, 5) * 108}%`;

function RoleCard({
  role,
  index,
  count,
  isInView,
}: {
  role: Role;
  index: number;
  count: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ x: enterOffset(index, count), opacity: 0 }}
      animate={isInView ? { x: "0%", opacity: 1 } : undefined}
      whileHover={{ y: -4 }}
      transition={{
        duration: 0.9,
        delay: Math.min(index, 6) * 0.08,
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: 0.35, delay: Math.min(index, 6) * 0.08 },
        y: { type: "spring", stiffness: 300, damping: 22 },
      }}
      style={{ backgroundColor: role.bg }}
      className="flex h-[220px] w-[240px] shrink-0 snap-start flex-col gap-3 rounded-2xl p-6"
    >
      <h3
        className="text-lg font-semibold leading-tight tracking-[-0.3px]"
        style={{ color: role.fg, fontFamily: "var(--font-bricolage)" }}
      >
        {role.name}
      </h3>
      <p
        className="text-[13.5px] leading-[20px]"
        style={{ color: role.fg, opacity: 0.85 }}
      >
        {role.blurb}
      </p>
      <span
        className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium"
        style={{ color: role.fg }}
      >
        {role.browseLabel}
        <span aria-hidden>→</span>
      </span>
    </motion.div>
  );
}

export default function TalentCarousel() {
  const rowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rowRef, { once: true, amount: 0.3 });

  return (
    <section id="talent" className="overflow-hidden bg-[#fffaeb] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-3">
          <p className="text-sm text-[#767676]">Browse by category</p>
          <h2
            className="text-[32px] font-semibold leading-[1.15] tracking-[-1.2px] text-black md:text-[44px] md:tracking-[-1.6px]"
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            Real people, ready now
          </h2>
          <p className="max-w-md text-base leading-[23px] tracking-[-0.32px] text-[#767676]">
            A sample of the categories in our pool. Every one of them tested
            and trained before you meet them.
          </p>
        </div>

        <div
          ref={rowRef}
          className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{
            maskImage:
              "linear-gradient(to right, black 0%, black 90%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, black 0%, black 90%, transparent 100%)",
          }}
        >
          {roles.map((role, i) => (
            <RoleCard
              key={role.name}
              role={role}
              index={i}
              count={roles.length}
              isInView={isInView}
            />
          ))}
        </div>

        <div className="mt-4 flex items-center gap-1.5 text-sm text-[#767676]">
          {roles.map((role) => (
            <span
              key={role.name}
              aria-hidden
              className="size-1.5 rounded-full bg-[#767676]/35"
            />
          ))}
          <span className="ml-1.5">swipe to see more</span>
        </div>
      </div>
    </section>
  );
}
