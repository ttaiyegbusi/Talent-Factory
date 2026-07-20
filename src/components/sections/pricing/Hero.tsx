/* Same static-entrance treatment as find-talent/for-talent's heroes —
 * no animation hiding the above-the-fold text behind an opacity delay. */
export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-8 pt-36 md:pt-44">
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#767676]">
          Pricing
        </p>
        <h1
          className="text-[40px] leading-[1.1] text-black md:text-[56px] md:leading-[1.1]"
          style={{ fontFamily: "var(--font-bricolage)" }}
        >
          One flat rate. No surprises.
        </h1>
        <p className="max-w-[560px] text-base leading-[23px] tracking-[-0.32px] text-[#767676]">
          One placement fee covers vetting, training, and a free re-match if
          it doesn&apos;t work out. No hidden markups, no long contracts.
        </p>
      </div>
    </section>
  );
}
