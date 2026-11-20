# Shubhashis Roy — Galaxy Portfolio

Next.js (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui. Built from the original design export in `design-reference/`.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Edit your content

All text lives in **`src/data/content.ts`**: profile, email, LinkedIn/GitHub, resume link,
experience, projects, skills. Anything still in `[brackets]` is a placeholder.

- Resume: put `resume.pdf` in `public/` and set `resumeUrl: '/resume.pdf'`.
- Project links: set `liveUrl` / `repoUrl`. Empty values show the disabled "View Project" button.
- Your role on a project: set `myRole` (shown in the case-study popup).

## Structure

```
src/app/            layout.tsx (metadata), page.tsx, globals.css (Tailwind theme + design tokens)
src/components/     page sections; Galaxy.tsx + Projects.tsx/CaseStudyModal.tsx are client components
src/components/primitives.tsx   shared building blocks (Container, Section, Eyebrow, Tags, …)
src/components/ui/  shadcn/ui components (Button, Badge, Card, Dialog), restyled to the design
src/components/mockups/   decorative concept mockups for each project
src/galaxy/GalaxyRenderer.ts   canvas starfield, scroll-driven black hole, astronaut and shooting stars
public/earth.jpg               Earth horizon photo at the bottom of Contact
public/fonts/       self-hosted Inter, JetBrains Mono, Space Grotesk
```

## Styling

- **Tailwind CSS v4** for all styling. Design tokens live in `src/app/globals.css` under `@theme`:
  colours `ink`, `panel`, `gold`, `gold-soft`, `ember`; fonts `font-sans`, `font-display`, `font-mono`;
  breakpoints `md` = 860px and `lg` = 1080px (e.g. `max-md:hidden`).
- **shadcn/ui** components in `src/components/ui/`. Add more with `npx shadcn@latest add <name>`,
  then restyle them to the palette.
- Plain CSS remains only for the self-hosted fonts and the scroll-linked reveal animations
  (`reveal`, `reveal-text`, `reveal-media`, `parallax`), which Tailwind has no utilities for.

## Deploy

Push to GitHub and import the repo on Vercel. No extra configuration is needed.

## Themes

Two themes, switched from the toggle in the nav (choice is saved in `localStorage`):

- **Normal** — black + gold (the original design)
- **Dark** — deep indigo + violet glow

Brand colours are CSS variables (`--ink-rgb`, `--panel-rgb`, `--gold-rgb`, `--gold-soft-rgb`, `--ember-rgb`) set in `src/app/globals.css` under `:root` and `[data-theme="dark"]`; Tailwind classes such as `text-gold` / `bg-ink` follow the active theme. The canvas maps its colours in `src/galaxy/palette.ts`. Use the `theme-dark:` variant for one-off dark-theme styles.

