"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

type Testimonial = {
  name: string;
  title: string;
  body: string;
  bg: string;
  text: string;
  chipBg: string;
  chipText: string;
  /* Position + size within the 740x560 scatter canvas (desktop only). */
  top: number;
  left: number;
  width: number;
  height: number;
  z: number;
};

const testimonials: Testimonial[] = [
  {
    name: "Sydney D.",
    title: "Hiring finally feels calm",
    body: "I used to dread every hiring cycle. Now I post what I need and a specialist shows up ready to work within days. It's the calmest our hiring has ever felt, and the quality hasn't dropped once.",
    bg: "#fdecc4",
    text: "#171717",
    chipBg: "#f6b51e",
    chipText: "#624c18",
    top: 0,
    left: 200,
    width: 270,
    height: 305,
    z: 10,
  },
  {
    name: "Kevin",
    title: "Transformed how we scale",
    body: "Bringing on contractors used to mean managing chaos on top of chaos. Talent Factory's operators just plug in and run. Best hiring decision we've made this year, hands down.",
    bg: "#f2f2f2",
    text: "#171717",
    chipBg: "#e2e2e2",
    chipText: "#171717",
    top: 36,
    left: 468,
    width: 270,
    height: 288,
    z: 20,
  },
  {
    name: "Jason F.",
    title: "Found our ops lead in a week",
    body: "We needed someone to run day-to-day operations and stopped dreading Mondays within a week of onboarding. Talent Factory matched us with someone who just gets it.",
    bg: "#c0d5ff",
    text: "#171717",
    chipBg: "#a8c1ff",
    chipText: "#1a2e6b",
    top: 198,
    left: 0,
    width: 245,
    height: 270,
    z: 15,
  },
  {
    name: "Christy",
    title: "Already referred 4 founders",
    body: "I've referred four other founders since we hired our first assistant through Talent Factory. The vetting alone saved us weeks of interviews and false starts.",
    bg: "#ffffff",
    text: "#171717",
    chipBg: "#f2f2f2",
    chipText: "#171717",
    top: 243,
    left: 225,
    width: 260,
    height: 270,
    z: 25,
  },
  {
    name: "Jen S.",
    title: "Over a year in and thrilled",
    body: "We've had our accountant through Talent Factory for over a year now. She caught two costly mistakes before they became real problems. Worth every cent, every month.",
    bg: "#1e1e4f",
    text: "#ffffff",
    chipBg: "#33336b",
    chipText: "#ffffff",
    top: 207,
    left: 477,
    width: 260,
    height: 306,
    z: 30,
  },
];

function StarRow({ light }: { light?: boolean }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="size-4"
          fill={light ? "#ffffff" : "#171717"}
        >
          <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.09.99 5.77L10 14.7l-5.18 2.75.99-5.77-4.19-4.09 5.79-.84L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <motion.div
      style={{
        backgroundColor: t.bg,
        color: t.text,
        zIndex: t.z,
        width: t.width,
        height: t.height,
      }}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="relative overflow-hidden rounded-2xl p-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
    >
      <StarRow light={t.text === "#ffffff"} />
      <h3
        className="mt-3 text-xl font-semibold leading-snug tracking-[-0.4px]"
        style={{ fontFamily: "var(--font-bricolage)" }}
      >
        {t.title}
      </h3>
      <p className="mt-2.5 text-[14px] leading-[21px] opacity-80">{t.body}</p>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
        style={{
          background: `linear-gradient(to bottom, transparent, ${t.bg} 70%)`,
        }}
      />
      <div className="absolute bottom-5 left-6">
        <span
          className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium"
          style={{ backgroundColor: t.chipBg, color: t.chipText }}
        >
          Read more
        </span>
      </div>
      <p className="absolute bottom-5 right-5 text-xs font-medium opacity-60">
        {t.name}
      </p>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-white py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 xl:flex-row xl:items-center xl:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex max-w-md shrink-0 flex-col gap-5 xl:w-[320px]"
        >
          <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#e8f6ea] px-4 py-2 text-sm font-medium text-[#1c6b2e]">
            <svg viewBox="0 0 20 20" className="size-4 fill-[#1c6b2e]">
              <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.09.99 5.77L10 14.7l-5.18 2.75.99-5.77-4.19-4.09 5.79-.84L10 1.5z" />
            </svg>
            Rated 4.9/5 by 500+ businesses
          </div>

          <h2
            className="text-[36px] font-semibold leading-[1.15] tracking-[-1.4px] text-black md:text-[48px] md:tracking-[-1.9px]"
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            Proof is in the people.
          </h2>
          <p className="text-base leading-[23px] tracking-[-0.32px] text-[#767676]">
            Our clients hire once and stay. Our talent gets placed, does great
            work, and sticks around.
          </p>
          <Button className="w-fit">Get started</Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="flex flex-col gap-5 xl:hidden"
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              style={{ backgroundColor: t.bg, color: t.text }}
              className="relative overflow-hidden rounded-2xl p-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
            >
              <StarRow light={t.text === "#ffffff"} />
              <h3
                className="mt-3 text-xl font-semibold leading-snug tracking-[-0.4px]"
                style={{ fontFamily: "var(--font-bricolage)" }}
              >
                {t.title}
              </h3>
              <p className="mt-2.5 text-[14px] leading-[21px] opacity-80">
                {t.body}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span
                  className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium"
                  style={{ backgroundColor: t.chipBg, color: t.chipText }}
                >
                  Read more
                </span>
                <p className="text-xs font-medium opacity-60">{t.name}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="relative hidden h-[560px] w-[740px] shrink-0 xl:block">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="absolute"
              style={{ top: t.top, left: t.left }}
            >
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
