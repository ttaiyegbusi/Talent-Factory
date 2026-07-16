# Talent Factory

Marketing site for Talent Factory — "Every great company runs on people you never see."

Built with Next.js (App Router), TypeScript, Tailwind CSS v4, and Framer Motion.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
```

## Project structure

```
src/
├── app/                      # Routes only — pages stay thin and compose sections
│   ├── (marketing)/          # Public marketing site (route group, no URL segment)
│   │   ├── layout.tsx        # Navbar + Footer + grid background
│   │   ├── page.tsx          # Home
│   │   ├── find-talent/
│   │   ├── for-talent/
│   │   ├── pricing/
│   │   ├── join/             # Join as Talent
│   │   └── hire/             # Hire Someone
│   ├── layout.tsx            # Root layout: fonts, global metadata
│   └── globals.css           # Tailwind + design tokens
├── components/
│   ├── ui/                   # Primitives: Button, Logo, …
│   ├── layout/               # Navbar, Footer, GridBackground
│   ├── sections/             # Page sections, grouped by page (home/Hero, …)
│   └── shared/               # Cross-page composites (ComingSoon, …)
├── lib/
│   ├── constants.ts          # Site config: nav links, footer links, copy
│   └── utils.ts              # cn() class helper
└── types/                    # Shared TypeScript types
```

### Conventions

- **Pages compose, sections implement.** A `page.tsx` should read like a table of
  contents (`<Hero />`, `<Pricing />`); visual/interactive logic lives in
  `components/sections/<page>/`.
- **`components/ui`** holds unopinionated primitives reused anywhere. Links that
  look like buttons use `buttonVariants()` from `ui/Button`.
- **Navigation and site copy** are configured in `lib/constants.ts`, not
  hard-coded in components.
- **Fonts**: Bricolage Grotesque (display, `var(--font-bricolage)`) and Geist
  (body), loaded via `next/font` in the root layout.
- The home hero's card animation physics were measured frame-by-frame from the
  reference video — see the comment block in `components/sections/home/Hero.tsx`
  before tuning.
