"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";

type IncludedGroup = {
  heading: string;
  items: string[];
};

const included: IncludedGroup[] = [
  {
    heading: "Guarantee & flexibility",
    items: [
      "30-day free re-match if it's not the right fit",
      "Month-to-month, cancel anytime",
    ],
  },
  {
    heading: "Vetting & training",
    items: [
      "Real skills tested before you ever meet them",
      "Trained by us to a standard we can promise",
    ],
  },
  {
    heading: "Admin, handled",
    items: [
      "Contracts and onboarding sorted for you",
      "Payment and payroll handled, no invoices to chase",
    ],
  },
  {
    heading: "Ongoing support",
    items: [
      "Regular check-ins to catch issues early",
      "A real person to talk to, not a ticket queue",
    ],
  },
];

/* Checkmark icon, same weight/style as the site's other line icons. */
function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 size-4 shrink-0 fill-[#1c6b2e]">
      <path d="M7.5 13.5L4 10l1.4-1.4 2.1 2.1 6.1-6.1L15 6z" />
    </svg>
  );
}

export default function PricingCard() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="bg-[#fffaeb] py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="overflow-hidden rounded-2xl bg-white"
        >
          <div className="flex flex-col gap-6 border-b border-black/5 p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div className="flex flex-col gap-2">
              <h2
                className="text-2xl font-semibold tracking-[-0.3px] text-black"
                style={{ fontFamily: "var(--font-bricolage)" }}
              >
                Managed Placement
              </h2>
              <p className="text-base leading-[23px] text-[#767676]">
                Rate varies by role and seniority — talk to us for an exact
                quote.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm text-[#767676]">From</span>
                <span
                  className="text-[40px] leading-none text-black"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  $2,500
                </span>
                <span className="text-sm text-[#767676]">/mo</span>
              </div>
              <Link
                href="/hire"
                className={buttonVariants({ className: "w-full md:w-auto" })}
              >
                Find your person
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 p-8 sm:grid-cols-2 md:p-10">
            {included.map((group) => (
              <div key={group.heading} className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-black/60">
                  {group.heading}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[14px] leading-[21px] text-[#3a3a3a]"
                    >
                      <CheckIcon />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
