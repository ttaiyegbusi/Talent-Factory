import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { FOOTER_LINKS, SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-[#fffaeb]">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-14 md:flex-row md:justify-between md:px-16">
        <div className="max-w-xs">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo />
            <span
              className="text-xl font-semibold tracking-[-0.4px] text-black"
              style={{ fontFamily: "var(--font-bricolage)" }}
            >
              {SITE_NAME}
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-[#767676]">
            {SITE_DESCRIPTION}
          </p>
        </div>

        <div className="flex gap-16">
          {FOOTER_LINKS.map(({ heading, links }) => (
            <div key={heading}>
              <h3 className="text-sm font-medium text-[#171717]">{heading}</h3>
              <ul className="mt-4 space-y-3">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-[#767676] hover:text-[#171717]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-black/5 px-6 py-6 text-center text-xs text-[#767676]">
        © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
