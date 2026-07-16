/** Faint grid that fades out radially from the top of the page. */
export default function GridBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-[900px]"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        maskImage:
          "radial-gradient(ellipse 65% 55% at 50% 0%, black 30%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 65% 55% at 50% 0%, black 30%, transparent 100%)",
      }}
    />
  );
}
