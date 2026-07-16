"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";

type Stat = {
  /* Numeric target counts up from 0; `null` renders `suffix` as-is. */
  target: number | null;
  suffix: string;
  body: string;
};

const stats: Stat[] = [
  { target: 9, suffix: "", body: "Talent categories, from assistants to accountants" },
  { target: 100, suffix: "%", body: "Trained & certified by us before you meet them" },
  { target: 500, suffix: "+", body: "Operators ready to start in the pool" },
  { target: null, suffix: "Days", body: "From your brief to people worth interviewing" },
];

function CountUp({
  target,
  suffix,
  play,
  delay,
}: {
  target: number;
  suffix: string;
  play: boolean;
  delay: number;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toString());

  useEffect(() => {
    if (!play) return;
    const controls = animate(count, target, {
      duration: 1.6,
      delay,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [play, target, delay, count]);

  return (
    <>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </>
  );
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
              key={stat.suffix + stat.body}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className="flex flex-col gap-3 rounded-2xl bg-white p-7"
            >
              <span
                className="text-[40px] leading-none tracking-[-1px] text-black md:text-[48px]"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                {stat.target === null ? (
                  stat.suffix
                ) : (
                  <CountUp
                    target={stat.target}
                    suffix={stat.suffix}
                    play={isInView}
                    delay={i * 0.08}
                  />
                )}
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
