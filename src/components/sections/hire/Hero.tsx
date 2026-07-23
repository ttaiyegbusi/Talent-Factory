/* Short and direct — this is a conversion page, not a marketing page,
 * so no stat row or long pitch. Static entrance, same LCP-safe pattern
 * as the other secondary pages. */
export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-4 pt-36 md:pt-44">
      <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-4 px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#767676]">
          Hire someone
        </p>
        <h1
          className="text-[36px] leading-[1.1] text-black md:text-[52px] md:leading-[1.1]"
          style={{ fontFamily: "var(--font-bricolage)" }}
        >
          Tell us what you need
        </h1>
        <p className="max-w-[480px] text-base leading-[23px] tracking-[-0.32px] text-[#767676]">
          A couple of details is all it takes. We&apos;ll come back with a
          shortlist of vetted people within 48 hours.
        </p>
      </div>
    </section>
  );
}
