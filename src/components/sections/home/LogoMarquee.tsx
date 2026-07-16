/* Native SVG dimensions (all 48px tall, widths vary) so the browser can
 * reserve layout space without distorting aspect ratio. */
const logos = [
  { file: "logo-1.svg", w: 201 },
  { file: "logo-2.svg", w: 221 },
  { file: "logo-3.svg", w: 178 },
  { file: "logo-4.svg", w: 145 },
  { file: "logo-5.svg", w: 171 },
  { file: "logo-6.svg", w: 140 },
  { file: "logo-7.svg", w: 125 },
  { file: "logo-8.svg", w: 188 },
  { file: "logo-9.svg", w: 112 },
  { file: "logo-10.svg", w: 77 },
  { file: "logo-11.svg", w: 163 },
  { file: "logo-12.svg", w: 128 },
  { file: "logo-13.svg", w: 164 },
  { file: "logo-14.svg", w: 94 },
  { file: "logo-15.svg", w: 162 },
];

function LogoRow({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center gap-16 pr-16"
    >
      {logos.map(({ file, w }, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={`/logos/${file}`}
          alt=""
          width={w}
          height={48}
          className="h-8 w-auto shrink-0 object-contain"
        />
      ))}
    </div>
  );
}

export default function LogoMarquee() {
  return (
    <section className="bg-white py-16">
      <p className="mb-10 text-center text-sm tracking-[-0.28px] text-[#767676]">
        Companies building lean, capable teams.
      </p>

      <div
        className="overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex w-max animate-[marquee_36s_linear_infinite] hover:[animation-play-state:paused]">
          <LogoRow />
          <LogoRow ariaHidden />
        </div>
      </div>
    </section>
  );
}
