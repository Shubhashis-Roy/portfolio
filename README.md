# Shubhashis Roy — Galaxy Portfolio

Next.js (App Router) + TypeScript. Built from the original design export in `design-reference/`.

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
src/app/            layout.tsx (metadata), page.tsx, globals.css (original design CSS)
src/components/     page sections; Galaxy.tsx + Projects.tsx/CaseStudyModal.tsx are client components
src/components/mockups/   decorative concept mockups for each project
src/galaxy/GalaxyRenderer.ts   canvas starfield, black hole and galaxy animation
public/fonts/       self-hosted Inter, JetBrains Mono, Space Grotesk
```

## Deploy

Push to GitHub and import the repo on Vercel. No extra configuration is needed.
