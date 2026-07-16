"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

type Feature = {
  title: string;
  body: string;
  bg: string;
  icon: "team" | "pencil" | "shield" | "psychotherapy";
  /* Where the title/body sit; the icon takes the opposite corner. */
  contentPosition: "top" | "bottom";
  /* White card's icon gets a dark badge instead of a bleeding watermark. */
  darkBadge?: boolean;
};

const features: Feature[] = [
  {
    title: "Tested, not just trusted",
    body: "Real skills checked against real tasks before anyone reaches your inbox.",
    bg: "#c8f0d9",
    icon: "team",
    contentPosition: "top",
  },
  {
    title: "We taught them ourselves",
    body: "Not pulled off a job board, trained by Talent Factory to a standard we can promise.",
    bg: "#ffd9c0",
    icon: "pencil",
    contentPosition: "bottom",
  },
  {
    title: "The admin is on us",
    body: "Contracts, onboarding, payment, handled, so you just get the work.",
    bg: "#c0d5ff",
    icon: "shield",
    contentPosition: "top",
  },
  {
    title: "If it doesn't click, we re-match",
    body: "An early mismatch isn't your problem to fix. We replace them, no fuss.",
    bg: "#ffffff",
    icon: "psychotherapy",
    contentPosition: "bottom",
    darkBadge: true,
  },
];

const iconSrc: Record<Feature["icon"], string> = {
  team: "/icons/team-fill.svg",
  pencil: "/icons/pencil-fill.svg",
  shield: "/icons/shield-star-fill.svg",
  psychotherapy: "/icons/psychotherapy-fill.svg",
};

function FeatureCard({ feature }: { feature: Feature }) {
  const iconOnTop = feature.contentPosition === "bottom";

  return (
    <motion.div
      style={{ backgroundColor: feature.bg }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="relative flex h-[300px] w-[260px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl p-7 md:h-[320px] md:w-full"
    >
      {feature.darkBadge ? (
        <div className="absolute right-6 top-6 flex size-[72px] items-center justify-center rounded-2xl bg-[#232323]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={iconSrc[feature.icon]}
            alt=""
            aria-hidden
            className="size-11"
          />
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={iconSrc[feature.icon]}
          alt=""
          aria-hidden
          className={`pointer-events-none absolute -right-8 size-[170px] ${
            iconOnTop ? "-top-8" : "-bottom-8"
          }`}
        />
      )}

      <div
        className={`relative flex h-full flex-col gap-2.5 ${
          feature.contentPosition === "bottom" ? "mt-auto" : ""
        }`}
      >
        <h3
          className="max-w-[75%] text-lg font-semibold leading-tight tracking-[-0.3px] text-black"
          style={{ fontFamily: "var(--font-bricolage)" }}
        >
          {feature.title}
        </h3>
        <p className="max-w-[80%] text-[14px] leading-[21px] text-[#4a4a4a]">
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
