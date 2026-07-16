"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Logo from "@/components/ui/Logo";
import { buttonVariants } from "@/components/ui/Button";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";

/**
 * Transparent navbar overlaying the top of every marketing page.
 * On the home page it fades in last (1.9s), closing the hero
 * choreography; on direct loads of any other page it shows immediately.
 */
export default function Navbar() {
  const pathname = usePathname();
  const enterDelay = pathname === "/" ? 1.9 : 0;

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

        <div className="flex items-center gap-2.5">
          <Link
            href="/join"
            className={buttonVariants({ variant: "secondary", size: "sm" })}
          >
            Join as Talent
          </Link>
          <Link
            href="/hire"
            className={buttonVariants({
              variant: "secondary",
              size: "sm",
              className: "hidden sm:inline-flex",
            })}
          >
            Hire Someone
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
