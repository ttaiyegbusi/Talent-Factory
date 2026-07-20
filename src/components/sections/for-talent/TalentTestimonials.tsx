"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import TestimonialsGrid, { type Testimonial } from "@/components/ui/TestimonialsGrid";

/* Same canvas slots (position/size/z/rotation) as the homepage's
 * Testimonials, so the stack-and-scatter reads identically — only the
 * people and colors change. */
const testimonials: Testimonial[] = [
  {
    name: "Marisol T.",
    title: "Found steady work in two weeks",
    body: "I used to piece together gigs from three different job boards. Now I have one steady client who actually values what I do, and I got there in under two weeks.",
    bg: "#fdecc4",
    text: "#171717",
    chipBg: "#f6b51e",
    chipText: "#624c18",
    top: 0,
    left: 200,
    width: 270,
    height: 305,
    z: 10,
    stackRotate: -8,
  },
  {
    name: "Idris K.",
    title: "The training made the difference",
    body: "The training before I even met a client made the difference. I walked in knowing exactly what was expected instead of guessing.",
    bg: "#f2f2f2",
    text: "#171717",
    chipBg: "#e2e2e2",
    chipText: "#171717",
    top: 36,
    left: 468,
    width: 270,
    height: 288,
    z: 20,
    stackRotate: 5,
  },
  {
    name: "Priya N.",
    title: "Rematched, no awkward conversations",
    body: "My first placement wasn't the right fit, and Talent Factory rematched me within days, no awkward conversations, no penalty. That alone earned my trust.",
    bg: "#c0d5ff",
    text: "#171717",
    chipBg: "#a8c1ff",
    chipText: "#1a2e6b",
    top: 198,
    left: 0,
    width: 245,
    height: 270,
    z: 15,
    stackRotate: -4,
  },
  {
    name: "Tunde A.",
    title: "Real clients, not one-off gigs",
    body: "Every placement so far has been steady work, not a one-off task. I know what my month looks like instead of chasing the next gig.",
    bg: "#ffffff",
    text: "#171717",
    chipBg: "#f2f2f2",
    chipText: "#171717",
    top: 243,
    left: 225,
    width: 260,
    height: 270,
    z: 25,
    stackRotate: 3,
  },
  {
    name: "Grace O.",
    title: "Paid on time, every single time",
    body: "I've never had to chase an invoice. Payments land on time, every time, so I can actually plan around my income.",
    bg: "#1e1e4f",
    text: "#ffffff",
    chipBg: "#33336b",
    chipText: "#ffffff",
    top: 207,
    left: 477,
    width: 260,
    height: 306,
    z: 30,
    stackRotate: 7,
  },
];

function Intro() {
  return (
    <>
      <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#e8f6ea] px-4 py-2 text-sm font-medium text-[#1c6b2e]">
        <svg viewBox="0 0 20 20" className="size-4 fill-[#1c6b2e]">
          <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.09.99 5.77L10 14.7l-5.18 2.75.99-5.77-4.19-4.09 5.79-.84L10 1.5z" />
        </svg>
        Rated 4.9/5 by our talent
      </div>

      <h2
        className="text-[36px] font-semibold leading-[1.15] tracking-[-1.4px] text-black md:text-[48px] md:tracking-[-1.9px]"
        style={{ fontFamily: "var(--font-bricolage)" }}
      >
        Hear from people who joined.
      </h2>
      <p className="text-base leading-[23px] tracking-[-0.32px] text-[#767676]">
        Real operators, placed with real clients, still there months later.
      </p>
      <Link href="/join" className={buttonVariants({ className: "w-fit" })}>
        Apply now
      </Link>
    </>
  );
}

export default function TalentTestimonials() {
  return <TestimonialsGrid testimonials={testimonials} intro={<Intro />} />;
}
