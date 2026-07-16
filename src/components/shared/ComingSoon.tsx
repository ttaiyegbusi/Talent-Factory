import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";

/** Temporary stub for routes that haven't been designed yet. */
export default function ComingSoon({ title }: { title: string }) {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 pt-24 text-center">
      <h1
        className="text-[40px] font-semibold leading-[1.1] tracking-[-1.6px] text-black md:text-[56px]"
        style={{ fontFamily: "var(--font-bricolage)" }}
      >
        {title}
      </h1>
      <p className="max-w-md text-base tracking-[-0.32px] text-[#767676]">
        This page is on its way. We&apos;re building it right now.
      </p>
      <Link href="/" className={buttonVariants()}>
        Back home
      </Link>
    </section>
  );
}
