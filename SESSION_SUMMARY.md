# Talent Factory — Project Context

Paste this file into a new chat to pick up where this session left off.

## What this is

Marketing site for **Talent Factory** ("Every great company runs on people you
never see") — a talent marketplace that trains, vets, and places operators
(assistants, accountants, marketers, etc.) with businesses. Built from Figma
designs + reference screenshots/videos the user supplies, one section at a
time, each with its own animation.

## Stack

- Next.js (App Router, Turbopack), TypeScript, Tailwind CSS v4, Framer Motion
- Fonts: Bricolage Grotesque (`var(--font-bricolage)`, headings) + Geist Sans
  (body) + Geist Mono (`var(--font-geist-mono)`, stat numbers) — all via
  `next/font` in `src/app/layout.tsx`
- Deployed on Vercel, repo at `github.com/ttaiyegbusi/Talent-Factory`, `main`
  branch, auto-deploys on push
- **`engines.node: "24.x"`** is pinned in `package.json` — do not lower this,
  Vercel's own build log said Node 20.x is deprecated on their platform

## Structure

```
src/
├── app/(marketing)/          # route group: layout.tsx (Navbar+Footer+grid bg), page.tsx, stub pages
├── components/
│   ├── ui/                   # Button (variants: primary/secondary), Logo
│   ├── layout/                # Navbar, Footer, GridBackground
│   ├── sections/home/         # one file per homepage section (see below)
│   └── shared/                 # ComingSoon (stub page filler)
├── hooks/useMediaQuery.ts
└── lib/constants.ts, utils.ts (cn helper)
public/
├── logos/        # 15 real company logo SVGs (Databricks, Discord, Docker, etc.) for LogoMarquee
└── icons/        # user-supplied fill-style SVGs for TrustFeatures (team, pencil, shield-star, psychotherapy)
```

## Homepage sections, in order (`src/app/(marketing)/page.tsx`)

1. **Hero** — headline "Every great company runs on people you never see" +
   5 role cards (Product Designer, Software Engineer, Accountant, Design
   Engineer, Data Analyst) that fall in with **physics reverse-engineered
   frame-by-frame from a reference video** (color-blob tracking script) —
   underdamped spring, ~21% overshoot, entry velocity, per-card rotation.
   Headline "solidifies" via animated font-weight/skew/blur (variable font).
2. **HiringModes** — "However you want to bring them on", 3 cards
   (Hire for keeps / Hand us a function / Just get it done) that start
   stacked and scroll-scrub into a row; hover = card wiggle + decorative
   shape animation (sun/seal/ring SVGs).
3. **LogoMarquee** — infinite CSS-keyframe scroll of 15 real logos, pauses
   on hover, fade mask at edges.
4. **TrustFeatures** — "A CV tells you nothing. We tell you everything."
   4 cards (Tested/We taught/Admin/Re-match) using the user's real icon SVGs
   (`public/icons/`) as corner watermarks. **Entrance: cards are invisible
   until the row scrolls into view, then slide in from the right and settle
   left-to-right with stagger** (`useInView` + offset in `%` of card width).
   Mobile: horizontal snap-carousel with working prev/next arrow buttons
   (`scrollBy`).
5. **Stats** — "In Plain Numbers" / "Hiring without the headache", gray
   (`#f2f2f2`) background, 4 stat cards (9 / 100% / 500+ / Days) in Geist
   Mono. **Numbers do a glitch/scramble effect** on scroll-into-view: each
   character flickers through random chars of its own type (digit→digit,
   letter→letter, symbol→symbol) and locks left-to-right (`GlitchText`
   component, plain rAF loop, no layout shift since it's monospace).
6. **Testimonials** — "Proof is in the people.", scattered/overlapping card
   layout (5 testimonials, brand-colored bg per card) that **stacks as a
   single deck on load, holds ~0.5s, then unstacks/scatters on a timer**
   (not scroll-scrubbed — `useInView` once + `delay` per card by z-order).
   Cards use `line-clamp-3` + `mt-auto` footer so long testimonials truncate
   cleanly instead of the name-chip overlapping text. No box-shadow (removed
   per feedback — read as a "weird" heavy halo).
7. **HowItWorks** — "Three steps, no runaround", 3 numbered step cards
   (Tell us what you need / Meet a real shortlist / Say yes, start working)
   with staggered reveal + a one-time "ping" ring behind each number badge,
   CTA button at the bottom. Just added this session; **user hasn't reviewed
   it in the browser yet** — worth confirming it lands well and matches the
   "stand out, great animation" bar they asked for before considering it done.

## Key lessons from this session (read before touching build/animation code)

- **Never run `npm run build` while the dev server is running** — both
  processes fight over `.next`'s Turbopack cache and corrupt it (`Persisting
  failed`, `ENOENT build-manifest.json`). Stop the dev server first, `rm -rf
  .next`, then build.
- **A real Vercel deploy bug got fixed this session**: `package-lock.json`
  had two version-less stub entries for `@img/sharp-libvips-linuxmusl-x64`
  (npm on macOS won't write full metadata for a musl/linux-only package).
  npm's arborist dedupe crashed on the empty version string during a clean
  `npm ci`/`npm install`, but *not* during a normal local `npm install`
  (which silently papers over it) — that's why it only broke on Vercel.
  Fixed by hand-editing the lockfile to a complete entry matching its 10
  sibling platform packages. If a similar "Invalid Version" error resurfaces,
  check for other version-less `os`/`libc`-scoped optional deps first.
- **Browser-pane screenshot glitches**: occasionally a tab shows a stuck
  blank/white screenshot despite the DOM being correct (verified via
  `elementsFromPoint`/`get_page_text`). Fix: open a fresh tab, or make sure
  `resize_window` + `navigate` both happened on the *same* tab (a fresh tab
  starts at a default viewport width, which silently breaks any `xl:` /
  breakpoint-dependent layout the verification script assumes).
- **Verifying scroll-linked or timed animations**: don't trust screenshots
  for anything sub-2-seconds — tool round-trip latency alone can exceed
  the animation duration. Instead read live computed `transform`/`opacity`
  values via `javascript_exec`, and when timing a spring/delay, use
  `requestAnimationFrame`-based polling, not `setTimeout` loops (backgrounded
  tabs throttle `setTimeout` to ~1/sec, which corrupts sub-second timing
  measurements — this cost real debugging time twice).
- **`useScroll`+`offset` gotcha**: if a scroll-driven canvas is much taller
  than its "stacked" cluster of content (e.g. Testimonials' 560px canvas
  with content centered at y=280), track the *center* of the target, not the
  `start` edge, or the stacked state has already half-expanded by the time
  it's visible.

## User's stated preferences (apply going forward)

- Wants **measured/deliberate animation**, not arbitrary easing — has asked
  for reference videos to be frame-analyzed rather than guessed, and for
  timing to be justified.
- Dislikes heavy box-shadows on cards ("weird shadow… please remove").
- Prefers **glitch/scramble text effects over count-up** for stat numbers.
- Wants entrance animations that trigger **once, on scroll-into-view**, not
  perpetually scroll-scrubbed, for most content sections (exception:
  HiringModes and the original Testimonials draft were scroll-scrubbed;
  Testimonials was later changed to a timed reveal per explicit feedback,
  so timed-on-view is likely the preferred default now).
- Supplies real brand assets (SVG icons, company logos) to swap in for
  placeholders — always ask if a placeholder needs a real-asset swap before
  considering a section "done."
- Says "push and commit to github" often — always run `npx tsc --noEmit`
  and a clean `npm run build` (dev server stopped) before committing.

## Immediate next step

The user just asked to summarize the session — no pending code task.
`HowItWorks` **is already committed and pushed** (`97ef129`), same commit as
the Stats glitch effect. It has **not yet been visually verified in the
browser** by either the user or in this session — if resuming, pull up
`localhost:3000`, scroll to it, and confirm the stagger/ping-ring animation
actually delivers the "stand out, great animation" bar the user asked for.
Iterate if not, then re-verify (tsc + build with dev server stopped) and
commit/push per the workflow above.
