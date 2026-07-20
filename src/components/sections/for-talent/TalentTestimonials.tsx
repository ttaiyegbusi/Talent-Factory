"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  bg: string;
  text: string;
  chipBg: string;
  chipText: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Marisol T.",
    role: "Executive Assistant",
    quote:
      "I used to piece together gigs from three different job boards. Now I have one steady client who actually values what I do, and I got there in under two weeks.",
    bg: "#fdecc4",
    text: "#171717",
    chipBg: "#f6b51e",
    chipText: "#624c18",
  },
  {
    name: "Idris K.",
    role: "Bookkeeper",
    quote:
      "The training before I even met a client made the difference. I walked in knowing exactly what was expected instead of guessing.",
    bg: "#c8f0d9",
    text: "#171717",
    chipBg: "#a8dfc0",
    chipText: "#1c6b2e",
  },
  {
    name: "Priya N.",
    role: "Marketing Specialist",
    quote:
      "My first placement wasn't the right fit, and Talent Factory rematched me within days, no awkward conversations, no penalty. That alone earned my trust.",
    bg: "#c0d5ff",
    text: "#171717",
    chipBg: "#a8c1ff",
    chipText: "#1a2e6b",
  },
];

function StarRow() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="size-4" fill="#171717">
          <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.09.99 5.77L10 14.7l-5.18 2.75.99-5.77-4.19-4.09 5.79-.84L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({
  t,
  index,
  isInView,
}: {
  t: Testimonial;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      style={{ backgroundColor: t.bg, color: t.text }}
      className="relative flex flex-col overflow-hidden rounded-2xl p-6"
    >
      <StarRow />
      <p className="mt-3 text-[15px] leading-[23px] opacity-90">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="mt-5 flex items-center gap-2.5">
        <span
          className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium"
          style={{ backgroundColor: t.chipBg, color: t.chipText }}
        >
          {t.name}
        </span>
        <span className="text-sm opacity-70">{t.role}</span>
      </div>
    </motion.div>
  );
}

export default function TalentTestimonials() {
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, amount: 0.3 });

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-3">
          <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#e8f6ea] px-4 py-2 text-sm font-medium text-[#1c6b2e]">
            <svg viewBox="0 0 20 20" className="size-4 fill-[#1c6b2e]">
              <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.09.99 5.77L10 14.7l-5.18 2.75.99-5.77-4.19-4.09 5.79-.84L10 1.5z" />
            </svg>
            Rated 4.9/5 by our talent
          </div>
          <h2
            className="text-[32px] font-semibold leading-[1.15] tracking-[-1.2px] text-black md:text-[44px] md:tracking-[-1.6px]"
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            Hear from people who joined
          </h2>
        </div>

        <div
          ref={gridRef}
          className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
