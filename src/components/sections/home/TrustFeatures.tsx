"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

type Feature = {
  title: string;
  body: string;
  bg: string;
  icon: "pencil" | "people" | "match" | "shield";
};

const features: Feature[] = [
  {
    title: "We taught them ourselves",
    body: "Not pulled off a job board, trained by Talent Factory to a standard we can promise.",
    bg: "#ffd9c0",
    icon: "pencil",
  },
  {
    title: "Tested, not just trusted",
    body: "Real skills checked against real tasks before anyone reaches your inbox.",
    bg: "#c8f0d9",
    icon: "people",
  },
  {
    title: "If it doesn't click, we re-match",
    body: "An early mismatch isn't your problem to fix. We replace them, no fuss.",
    bg: "#ffffff",
    icon: "match",
  },
  {
    title: "The admin is on us",
    body: "Contracts, onboarding, payment, handled, so you just get the work.",
    bg: "#c0d5ff",
    icon: "shield",
  },
];

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-7" fill="#171717">
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25ZM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-7" fill="#171717">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3ZM8 11c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3Zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5Zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5Z" />
    </svg>
  );
}

function MatchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-7" fill="none">
      <path
        d="M9 20a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1H9v1Z"
        fill="#171717"
      />
      <path
        d="M12 2a7 7 0 0 0-4 12.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26A7 7 0 0 0 12 2Z"
        fill="#171717"
      />
      <path d="M12 6v4M10 8h4" stroke="#ffd9c0" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-7" fill="#171717">
      <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4Z" />
      <path
        d="m12 7 1.05 2.13 2.35.34-1.7 1.66.4 2.34L12 12.4l-2.1 1.07.4-2.34-1.7-1.66 2.35-.34L12 7Z"
        fill="#c0d5ff"
      />
    </svg>
  );
}

const icons = { pencil: PencilIcon, people: PeopleIcon, match: MatchIcon, shield: ShieldIcon };

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = icons[feature.icon];
  return (
    <motion.div
      style={{ backgroundColor: feature.bg }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="flex h-[300px] w-[260px] shrink-0 snap-start flex-col rounded-2xl p-7 md:h-[320px] md:w-full"
    >
      <Icon />
      <div className="mt-auto flex flex-col gap-2.5 pt-6">
        <h3
          className="text-lg font-semibold leading-tight tracking-[-0.3px] text-black"
          style={{ fontFamily: "var(--font-bricolage)" }}
        >
          {feature.title}
        </h3>
        <p className="text-[14px] leading-[21px] text-[#4a4a4a]">
          {feature.body}
        </p>
      </div>
    </motion.div>
  );
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === "left" ? "Scroll left" : "Scroll right"}
      className="flex size-9 items-center justify-center rounded-full bg-white text-black transition-opacity hover:opacity-80"
    >
      <svg viewBox="0 0 24 24" className="size-4" fill="none">
        <path
          d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default function TrustFeatures() {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    rowRef.current?.scrollBy({
      left: dir === "left" ? -280 : 280,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#fffaeb] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[32px] font-semibold leading-[1.2] tracking-[-1.2px] md:text-[40px] md:tracking-[-1.5px]"
            style={{ fontFamily: "var(--font-bricolage)", color: "#f6b51e" }}
          >
            A CV tells you nothing.
            <br />
            We tell you everything.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="flex max-w-sm flex-col gap-5 md:items-end md:text-right"
          >
            <p className="text-base leading-[23px] text-[#767676]">
              Job boards hand you a stack of strangers and wish you luck. We
              hand you someone we taught, tested, and would stake our name
              on.
            </p>
            <div className="flex gap-2">
              <ArrowButton direction="left" onClick={() => scroll("left")} />
              <ArrowButton direction="right" onClick={() => scroll("right")} />
            </div>
          </motion.div>
        </div>

        <div
          ref={rowRef}
          className="mt-12 flex gap-5 overflow-x-auto pb-2 [scrollbar-width:none] md:grid md:grid-cols-4 md:overflow-visible [&::-webkit-scrollbar]:hidden"
        >
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
