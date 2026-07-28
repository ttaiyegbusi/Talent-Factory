"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

export type Feature = {
  title: string;
  body: string;
  bg: string;
  icon: string;
  /* Tailwind position/size classes for the watermark icon. */
  iconClass: string;
  /* Where the title/body sit; the icon takes the opposite corner. */
  contentPosition: "top" | "bottom";
};

/*
 * Scroll-scrubbed "coming into focus": as each card scrolls up through the
 * viewport, it sharpens from blurred/desaturated to fully in focus, tied
 * directly to scroll position rather than a one-shot trigger. The icon
 * watermark and the text block drift at different rates while this
 * happens (icon moves more) for a subtle depth separation within the
 * card, on top of the focus-pull.
 */
function FeatureCard({ feature }: { feature: Feature }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.4"],
  });

  const blur = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const saturate = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const filter = useMotionTemplate`blur(${blur}px) saturate(${saturate})`;
  const opacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);
  const iconY = useTransform(scrollYProgress, [0, 1], [36, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [10, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, filter, backgroundColor: feature.bg }}
      whileHover={{ y: -4 }}
      transition={{ y: { type: "spring", stiffness: 300, damping: 22 } }}
      className="relative flex h-[300px] w-full flex-col overflow-hidden rounded-2xl p-7 md:h-[320px]"
    >
      <motion.img
        src={feature.icon}
        alt=""
        aria-hidden
        style={{ y: iconY }}
        className={`pointer-events-none absolute w-auto ${feature.iconClass}`}
      />

      <motion.div
        style={{ y: textY }}
        className={`relative flex flex-col gap-2.5 ${
          feature.contentPosition === "bottom" ? "mt-auto" : ""
        }`}
      >
        <h3
          className="text-lg font-semibold leading-tight tracking-[-0.3px] text-black"
          style={{ fontFamily: "var(--font-bricolage)" }}
        >
          {feature.title}
        </h3>
        <p className="text-[14px] leading-[21px] text-[#4a4a4a]">
          {feature.body}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function FeatureGrid({
  features,
  className,
}: {
  features: Feature[];
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="hidden md:grid md:grid-cols-4 md:gap-5">
        {features.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </div>

      <div className="flex flex-col gap-5 md:hidden">
        {features.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </div>
    </div>
  );
}
