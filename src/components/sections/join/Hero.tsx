/* Short and direct — mirrors /hire's hero treatment since this is the
 * talent-side counterpart: a conversion page, not a marketing page. */
export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-4 pt-36 md:pt-44">
      <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-4 px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#767676]">
          Join as talent
        </p>
        <h1
          className="text-[36px] leading-[1.1] text-black md:text-[52px] md:leading-[1.1]"
          style={{ fontFamily: "var(--font-bricolage)" }}
        >
          Show us what you can do
        </h1>
        <p className="max-w-[480px] text-base leading-[23px] tracking-[-0.32px] text-[#767676]">
          A couple of details is all it takes to get started. We test real
          skills, not just résumés.
        </p>
      </div>
    </section>
  );
}
