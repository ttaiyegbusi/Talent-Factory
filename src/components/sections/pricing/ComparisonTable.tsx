"use client";

import { motion } from "framer-motion";

type Row = {
  label: string;
  talentFactory: string;
  jobBoards: string;
  recruiters: string;
  traditional: string;
};

const rows: Row[] = [
  {
    label: "Time to first shortlist",
    talentFactory: "48 hours",
    jobBoards: "1–2 days",
    recruiters: "2–3 weeks",
    traditional: "2–4 months",
  },
  {
    label: "Vetted before you meet them",
    talentFactory: "Always",
    jobBoards: "Never",
    recruiters: "Sometimes",
    traditional: "Interview yourself",
  },
  {
    label: "Trained to a standard",
    talentFactory: "Yes, by us",
    jobBoards: "No",
    recruiters: "No",
    traditional: "On you",
  },
  {
    label: "Contract flexibility",
    talentFactory: "Month-to-month",
    jobBoards: "Varies",
    recruiters: "Varies",
    traditional: "Permanent",
  },
  {
    label: "Replacement guarantee",
    talentFactory: "Free, 30 days",
    jobBoards: "None",
    recruiters: "90–180 days",
    traditional: "None",
  },
  {
    label: "Admin & payroll handled",
    talentFactory: "Yes",
    jobBoards: "No",
    recruiters: "No",
    traditional: "You handle it",
  },
];

const columns = [
  { key: "talentFactory" as const, label: "Talent Factory", highlight: true },
  { key: "jobBoards" as const, label: "Job boards", highlight: false },
  { key: "recruiters" as const, label: "Recruiters", highlight: false },
  { key: "traditional" as const, label: "Traditional hire", highlight: false },
];

export default function ComparisonTable() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-3"
        >
          <p className="text-sm text-[#767676]">Why it&apos;s worth it</p>
          <h2
            className="text-[32px] font-semibold leading-[1.15] tracking-[-1.2px] text-black md:text-[44px] md:tracking-[-1.6px]"
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            Same budget, dramatically less risk
          </h2>
        </motion.div>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr>
                <th className="w-[220px] pb-4 text-sm font-medium text-[#767676]" />
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-4 pb-4 text-sm font-semibold ${
                      col.highlight ? "text-[#f6b51e]" : "text-black"
                    }`}
                    style={{ fontFamily: "var(--font-bricolage)" }}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-black/5">
                  <td className="py-4 pr-4 text-[14px] text-[#767676]">
                    {row.label}
                  </td>
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-4 py-4 text-[14px] ${
                        col.highlight
                          ? "font-semibold text-black"
                          : "text-[#3a3a3a]"
                      }`}
                    >
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
