"use client";

import { motion } from "framer-motion";

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

export default function Stats() {
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

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className="flex flex-col gap-3 rounded-2xl bg-white p-7"
            >
              <span
                className="text-[40px] leading-none tracking-[-1px] text-black md:text-[48px]"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                {stat.value}
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
