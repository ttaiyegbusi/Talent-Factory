import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";

const stats = [
  { value: "9", label: "Talent categories" },
  { value: "100%", label: "Trained before matched" },
  { value: "500+", label: "Operators in the pool" },
];

/* Same static-entrance treatment as find-talent's Hero — no animation
 * hiding the above-the-fold text behind an opacity/blur delay. */
export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 md:pt-44">
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#767676]">
          For talent
        </p>
        <h1
          className="text-[40px] leading-[1.1] text-black md:text-[64px] md:leading-[70px]"
          style={{ fontFamily: "var(--font-bricolage)" }}
        >
          Get placed with clients
          <br />
          who actually need you
        </h1>
        <p className="max-w-[600px] text-base leading-[23px] tracking-[-0.32px] text-[#767676]">
          We train you, vet you, and match you to real work, not just another
          job board listing. Steady clients, fair pay, and the admin handled
          for you.
        </p>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <Link
            href="/join"
            className={buttonVariants({
              className: "w-full sm:w-auto sm:min-w-[190px]",
            })}
          >
            Apply now
          </Link>
          <Link
            href="#how-it-works"
            className={buttonVariants({
              variant: "secondary",
              className: "w-full sm:w-auto sm:min-w-[190px]",
            })}
          >
            See how it works
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
