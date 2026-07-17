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
 * Once triggered, it keeps re-scrambling on a loop (scramble, hold,
 * scramble again) for as long as the component is mounted.
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
    const holdBetweenCycles = 3200;
    let cancelled = false;
    let raf = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const runCycle = (startDelay: number) => {
      const start = performance.now() + startDelay;
      let last = 0;

      const loop = (now: number) => {
        if (cancelled) return;
        const t = now - start;
        if (t < 0) {
          raf = requestAnimationFrame(loop);
          return;
        }
        if (t >= duration) {
          setDisplay(target);
          timeout = setTimeout(() => runCycle(0), holdBetweenCycles);
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
    };

    runCycle(delay * 1000);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [play, target, delay]);

  return <span>{display}</span>;
}

/*
 * Same right-to-left fill treatment as TrustFeatures: cards start bunched
 * past the right edge (offset in % of card width) and settle into place,
 * leftmost card traveling farthest so it leads the motion.
 */
const enterOffset = (i: number) => `${(stats.length - i) * 108}%`;

function StatCardContent({
  stat,
  play,
  delay,
}: {
  stat: Stat;
  play: boolean;
  delay: number;
}) {
  return (
    <div className="flex h-full min-h-[160px] w-full flex-col gap-3 rounded-2xl bg-white p-7">
      <span
        className="text-[40px] leading-none tracking-[-1px] text-black md:text-[48px]"
        style={{ fontFamily: "var(--font-geist-mono)" }}
      >
        <GlitchText target={stat.value} play={play} delay={delay} />
      </span>
      <p className="text-[14px] leading-[21px] text-[#4a4a4a]">{stat.body}</p>
    </div>
  );
}

export default function Stats() {
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, amount: 0.4 });

  return (
    <section className="overflow-hidden bg-[#f2f2f2] py-24">
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

        <div ref={gridRef}>
          <div className="mt-12 hidden md:grid md:grid-cols-4 md:gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.value}
                initial={{ x: enterOffset(i), opacity: 0 }}
                animate={isInView ? { x: "0%", opacity: 1 } : undefined}
                transition={{
                  duration: 0.9,
                  delay: i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                  opacity: { duration: 0.35, delay: i * 0.12 },
                }}
              >
                <StatCardContent stat={stat} play={isInView} delay={i * 0.12} />
              </motion.div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 md:hidden">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.value}
                initial={{ opacity: 0, scale: 0.85, y: 16 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : undefined}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: i * 0.1,
                }}
              >
                <StatCardContent stat={stat} play={isInView} delay={i * 0.12} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
