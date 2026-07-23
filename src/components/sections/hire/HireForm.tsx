"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

/* Matches the "9 talent categories" stat used across the rest of the site. */
const ROLE_CATEGORIES = [
  "Executive Assistant",
  "Accountant / Bookkeeper",
  "Marketing Specialist",
  "Customer Support",
  "Product Designer",
  "Software Engineer",
  "Design Engineer",
  "Data Analyst",
  "Operations Manager",
];

const nextSteps = [
  {
    title: "We review your brief",
    body: "A real person reads what you sent, usually within a few hours.",
  },
  {
    title: "You meet a shortlist",
    body: "2–3 vetted people matched to your needs, ready within 48 hours.",
  },
  {
    title: "You pick who fits",
    body: "We handle contracts and onboarding so work starts right away.",
  },
];

const inputClass =
  "w-full rounded-[10px] border border-black/10 bg-white px-4 py-3 text-[15px] text-black placeholder:text-[#a3a3a3] outline-none transition-colors focus:border-[#f6b51e]";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-black">{label}</span>
      {children}
    </label>
  );
}

function SuccessPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center gap-3 rounded-2xl bg-[#c8f0d9] p-10 text-center"
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-white text-2xl">
        ✓
      </span>
      <h3
        className="text-xl font-semibold text-black"
        style={{ fontFamily: "var(--font-bricolage)" }}
      >
        Got it, thank you.
      </h3>
      <p className="max-w-sm text-[14px] leading-[21px] text-[#3a3a3a]">
        We&apos;re putting your shortlist together. Expect an email from us
        within 48 hours.
      </p>
    </motion.div>
  );
}

export default function HireForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="bg-[#fffaeb] py-16 md:py-20">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 md:grid-cols-[1fr_320px] md:gap-8">
        <div className="rounded-2xl bg-white p-7 md:p-10">
          {submitted ? (
            <SuccessPanel />
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Your name">
                  <input
                    required
                    type="text"
                    name="name"
                    placeholder="Jordan Lee"
                    className={inputClass}
                  />
                </Field>
                <Field label="Work email">
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="jordan@company.com"
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Company name">
                  <input
                    required
                    type="text"
                    name="company"
                    placeholder="Acme Inc."
                    className={inputClass}
                  />
                </Field>
                <Field label="What do you need?">
                  <select required name="role" defaultValue="" className={inputClass}>
                    <option value="" disabled>
                      Select a category
                    </option>
                    {ROLE_CATEGORIES.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Tell us more (optional)">
                <textarea
                  name="details"
                  rows={4}
                  placeholder="What's the role, and what does this person need to handle day to day?"
                  className={`${inputClass} resize-none`}
                />
              </Field>

              <Button type="submit" className="mt-2 w-full sm:w-fit">
                Get my shortlist
              </Button>
            </form>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <h2
            className="text-lg font-semibold text-black"
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            What happens next
          </h2>
          <ol className="flex flex-col gap-5">
            {nextSteps.map((step, i) => (
              <li key={step.title} className="flex gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#f6b51e] text-sm font-bold text-[#171717]">
                  {i + 1}
                </span>
                <div className="flex flex-col gap-1">
                  <p className="text-[15px] font-semibold text-black">
                    {step.title}
                  </p>
                  <p className="text-[14px] leading-[21px] text-[#767676]">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
