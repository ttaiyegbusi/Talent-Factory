"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/ui/Logo";
import { buttonVariants } from "@/components/ui/Button";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";

/**
 * Transparent navbar overlaying the top of every marketing page.
 * On the home page it fades in last (1.9s), closing the hero
 * choreography; on direct loads of any other page it shows immediately.
 * Below `md`, nav links + CTAs move into a hamburger-triggered dropdown
 * instead of competing with the logo for space in the top bar.
 */
export default function Navbar() {
  const pathname = usePathname();
  const enterDelay = pathname === "/" ? 1.9 : 0;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: enterDelay, ease: "easeOut" }}
      className="absolute inset-x-0 top-0 z-20"
    >
      <nav className="flex items-center justify-between px-6 py-6 md:px-16">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo />
          <span
            className="text-xl font-semibold tracking-[-0.4px] text-black"
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            {SITE_NAME}
          </span>
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="px-5 py-1.5 text-base tracking-[-0.32px] text-[#171717]"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2.5 md:flex">
          <Link
            href="/join"
            className={buttonVariants({ variant: "secondary", size: "sm" })}
          >
            Join as Talent
          </Link>
          <Link
            href="/hire"
            className={buttonVariants({ variant: "secondary", size: "sm" })}
          >
            Hire Someone
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex size-10 items-center justify-center rounded-full bg-white md:hidden"
        >
          <span className="relative flex h-3 w-4 flex-col justify-between">
            <motion.span
              animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="h-[1.5px] w-full origin-center rounded-full bg-[#171717]"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="h-[1.5px] w-full rounded-full bg-[#171717]"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="h-[1.5px] w-full origin-center rounded-full bg-[#171717]"
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              aria-hidden
              className="fixed inset-0 bg-black/20 md:hidden"
            />
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative mx-4 mb-4 flex flex-col gap-1 rounded-2xl bg-white p-4 shadow-lg md:hidden"
            >
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-xl px-4 py-3 text-base tracking-[-0.32px] text-[#171717] transition-colors hover:bg-[#f2f2f2]"
                >
                  {label}
                </Link>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t border-black/5 pt-3">
                <Link
                  href="/join"
                  className={buttonVariants({
                    variant: "secondary",
                    className: "w-full",
                  })}
                >
                  Join as Talent
                </Link>
                <Link
                  href="/hire"
                  className={buttonVariants({ className: "w-full" })}
                >
                  Hire Someone
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
