import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";

const stats = [
  { value: "9", label: "Talent categories" },
  { value: "500+", label: "Vetted operators" },
  { value: "48hrs", label: "To your first shortlist" },
];

/*
 * Simpler, static-entrance hero for a secondary page — no falling-card
 * physics or scripted fades. Headline and subtitle render immediately
 * (lesson from the homepage LCP fix: don't hide above-the-fold text
 * behind animation delay on the page's largest paint candidate).
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 md:pt-44">
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#767676]">
          For businesses
        </p>
        <h1
          className="text-[40px] leading-[1.1] text-black md:text-[64px] md:leading-[70px]"
          style={{ fontFamily: "var(--font-bricolage)" }}
        >
          Hire your next operator
          <br />
          in days, not months
        </h1>
        <p className="max-w-[600px] text-base leading-[23px] tracking-[-0.32px] text-[#767676]">
          Every person in our pool is tested and trained before you ever meet
          them. Tell us what you need, get a shortlist within 48 hours, and
          pick who fits.
        </p>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <Link
            href="/hire"
            className={buttonVariants({
              className: "w-full sm:w-auto sm:min-w-[190px]",
            })}
          >
            Find your person
          </Link>
          <Link
            href="#talent"
            className={buttonVariants({
              variant: "secondary",
              className: "w-full sm:w-auto sm:min-w-[190px]",
            })}
          >
            Browse talent
          </Link>
        </div>
      </div>

      <div className="relative mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-4 px-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-1 text-center"
          >
            <span
              className="text-[32px] leading-none text-black md:text-[40px]"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              {stat.value}
            </span>
            <span className="text-sm text-[#767676]">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
