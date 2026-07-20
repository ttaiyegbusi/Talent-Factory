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

/* Same five roles + colors as the homepage Hero's falling cards, so this
 * page reads as a continuation of the brand rather than a new palette. */
const roles: Role[] = [
  {
    name: "Product Designer",
    browseLabel: "Browse Designers",
    blurb: "From wireframes to shipped UI, matched to your product's stage.",
    bg: "#ffd9c0",
    fg: "#fa7319",
  },
  {
    name: "Accountant",
    browseLabel: "Browse Accountants",
    blurb: "Books closed on time, every time, no chasing required.",
    bg: "#f6b51e",
    fg: "#fffaeb",
  },
  {
    name: "Design Engineer",
    browseLabel: "Browse Engineers",
    blurb: "Ships polished front-end work without a hand-off tax.",
    bg: "#ffc0c5",
    fg: "#fb3748",
  },
  {
    name: "Data Analyst",
    browseLabel: "Browse Analysts",
    blurb: "Turns your dashboards into decisions, not just charts.",
    bg: "#c0d5ff",
    fg: "#335cff",
  },
  {
    name: "Software Engineer",
    browseLabel: "Browse Engineers",
    blurb: "Full-stack operators who can own a feature end to end.",
    bg: "#171717",
    fg: "#ffffff",
  },
];

function RoleCard({
  role,
  index,
  isInView,
}: {
  role: Role;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      whileHover={{ y: -4 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: "easeOut",
        y: { type: "spring", stiffness: 300, damping: 22 },
      }}
      style={{ backgroundColor: role.bg }}
      className="flex flex-col gap-4 rounded-2xl p-7"
    >
      <h3
        className="text-xl font-semibold leading-tight tracking-[-0.3px]"
        style={{ color: role.fg, fontFamily: "var(--font-bricolage)" }}
      >
        {role.name}
      </h3>
      <p
        className="text-[14px] leading-[21px]"
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
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, amount: 0.3 });

  return (
    <section id="talent" className="bg-[#fffaeb] py-24">
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
          ref={gridRef}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {roles.map((role, i) => (
            <RoleCard key={role.name} role={role} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
