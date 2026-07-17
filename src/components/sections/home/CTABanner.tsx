"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Button from "@/components/ui/Button";

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section className="relative overflow-hidden bg-[#171717] py-24">
      {/* soft glow behind the copy, echoes the yellow CTA */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#f6b51e]/20 blur-[120px]"
      />

      <div
        ref={ref}
        className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-[32px] font-semibold leading-[1.15] tracking-[-1.2px] text-white md:text-[44px] md:tracking-[-1.6px]"
          style={{ fontFamily: "var(--font-bricolage)" }}
        >
          Stop winging the hire.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="max-w-xl text-base leading-[24px] tracking-[-0.32px] text-[#b8b8b8] md:text-lg"
        >
          Whatever your business is missing, the person who fills the gap is
          probably already in our pool. Tell us, and we&apos;ll introduce you
          within a day.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, delay: 0.22, ease: "easeOut" }}
          className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
        >
          <Button className="w-full sm:w-auto sm:min-w-[190px]">
            Find your person
          </Button>
          <Button
            variant="secondary"
            className="w-full sm:w-auto sm:min-w-[190px]"
          >
            Browse the pool
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
