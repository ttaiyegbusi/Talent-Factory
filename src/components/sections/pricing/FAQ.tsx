"use client";

import { motion } from "framer-motion";

type QA = { question: string; answer: string };

const faqs: QA[] = [
  {
    question: "How does pricing work?",
    answer:
      "You pay one flat monthly rate per placement, based on the role and seniority. It covers vetting, training, and ongoing support, not just the introduction.",
  },
  {
    question: "What's included in the fee?",
    answer:
      "Skills testing before you meet anyone, our own training program, contracts and payroll handled for you, and regular check-ins after they start.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. Engagements are month-to-month, no long-term lock-in and no cancellation fee.",
  },
  {
    question: "What if it's not a good fit?",
    answer:
      "We re-match you within 30 days at no extra cost. An early mismatch isn't your problem to carry.",
  },
  {
    question: "Do you offer contract-to-hire?",
    answer:
      "Yes. Plenty of clients start month-to-month and convert to a direct hire later. Just tell us that's the plan and we'll handle the transition.",
  },
];

function FAQItem({ qa, index }: { qa: QA; index: number }) {
  return (
    <motion.details
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
      className="group rounded-2xl bg-[#fffaeb] px-6 py-5"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
        <span
          className="text-base font-semibold text-black md:text-lg"
          style={{ fontFamily: "var(--font-bricolage)" }}
        >
          {qa.question}
        </span>
        <span
          aria-hidden
          className="shrink-0 text-xl text-black/40 transition-transform duration-200 group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <p className="mt-3 text-[14px] leading-[21px] text-[#767676]">
        {qa.answer}
      </p>
    </motion.details>
  );
}

export default function FAQ() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-3 text-center"
        >
          <p className="text-sm text-[#767676]">Questions</p>
          <h2
            className="text-[32px] font-semibold leading-[1.15] tracking-[-1.2px] text-black md:text-[40px] md:tracking-[-1.5px]"
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            Frequently asked
          </h2>
        </motion.div>

        <div className="mt-10 flex flex-col gap-3">
          {faqs.map((qa, i) => (
            <FAQItem key={qa.question} qa={qa} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
