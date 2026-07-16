"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Stat = {
  value: string;
  body: string;
};

const stats: Stat[] = [
  { value: "9", body: "Talent categories, from assistants to accountants" },
  { value: "100%", body: "Trained & certified by us before you meet them" },
  { value: "500+", body: "Operators ready to start in the pool" },
  { value: "Days", body: "From your brief to people worth interviewing" },
];

const DIGITS = "0123456789";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const SYMBOLS = "#%&@+*";

function randomFor(ch: string) {
  const set = DIGITS.includes(ch)
    ? DIGITS
    : UPPER.includes(ch)
      ? UPPER
      : LOWER.includes(ch)
        ? LOWER
        : SYMBOLS.includes(ch)
          ? SYMBOLS
          : null;
  return set ? set[Math.floor(Math.random() * set.length)] : ch;
}

/*
 * Glitch/scramble reveal: every character flickers through random
 * characters of its own kind (digit -> digits, letter -> letters,
 * symbol -> symbols) and locks into its final form left-to-right.
 * Rendered in the mono font, so the flicker never shifts layout.
 */
function GlitchText({
  target,
  play,
  delay,
}: {
  target: string;
  play: boolean;
  delay: number;
}) {
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    if (!play) return;
    const duration = 1100;
    const flickerEvery = 45;
    const start = performance.now() + delay * 1000;
    let last = 0;
    let raf: number;

    const loop = (now: number) => {
      const t = now - start;
      if (t < 0) {
        raf = requestAnimationFrame(loop);
        return;
      }
      if (t >= duration) {
        setDisplay(target);
        return;
      }
      if (now - last >= flickerEvery) {
        last = now;
        setDisplay(
          [...target]
            .map((ch, i) => {
              const lockAt = duration * ((i + 1) / target.length);
              return t >= lockAt ? ch : randomFor(ch);
            })
            .join("")
        );
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [play, target, delay]);

  return <span>{display}</span>;
}

export default function Stats() {
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, amount: 0.4 });

  return (
    <section className="bg-[#f2f2f2] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-3"
        >
          <p className="text-sm text-[#767676]">In Plain Numbers</p>
          <h2
            className="text-[32px] font-semibold leading-[1.15] tracking-[-1.2px] text-black md:text-[44px] md:tracking-[-1.6px]"
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            Hiring without the
            <br />
            headache
          </h2>
        </motion.div>

        <div ref={gridRef} className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className="flex flex-col gap-3 rounded-2xl bg-white p-7"
            >
              <span
                className="text-[40px] leading-none tracking-[-1px] text-black md:text-[48px]"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                <GlitchText target={stat.value} play={isInView} delay={i * 0.12} />
              </span>
              <p className="text-[14px] leading-[21px] text-[#4a4a4a]">
                {stat.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
