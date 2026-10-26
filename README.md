# Frosted Freaks Services

### [➡️ View the live site](https://mcgee2262.github.io/frosted-freaks/)

[![Deploy](https://github.com/mcgee2262/frosted-freaks/actions/workflows/deploy.yml/badge.svg)](https://github.com/mcgee2262/frosted-freaks/actions/workflows/deploy.yml)

Lead-generation site for a residential snow-shoveling business serving Reston, Herndon and Great Falls, Virginia.
React 19 + TypeScript + Tailwind CSS v4, built with Vite.

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check and production build into dist/
npm run lint     # ESLint
npm run preview  # serve the production build
```

Routes: `/` (Home), `/services`, `/service-areas`, `/quote`. The app uses client-side routing, so the host must
serve `index.html` for unknown paths (Netlify `_redirects`, Vercel rewrites, or similar). On GitHub Pages this is
handled by `.github/workflows/deploy.yml`, which copies `index.html` to `404.html` and builds with
`VITE_BASE=/frosted-freaks/`. For a root domain, build without `VITE_BASE`.

## Configuration

Almost everything a business owner would change lives in **`src/config/site.ts`**.

| What | Where | Notes |
| --- | --- | --- |
| Contact details | `CONTACT` | `phone`, `email`, `address` ship as `[PHONE]`, `[EMAIL]`, `[BUSINESS ADDRESS]`. Placeholders render as plain text; real values become `tel:` / `mailto:` links automatically. |
| Form endpoint | `FORM.endpoint` | Empty = **stub mode**: the form validates, then tells the visitor plainly that nothing was sent (payload is logged to the console). Set a URL (Formspree, Basin, your own API) and the form POSTs JSON to it. |
| Phone required? | `FORM.phoneRequired` | `false` by default (phone is optional). |
| Consent checkbox | `FORM.consent` | Off by default. Turn on only after the wording has been checked for your situation. |
| Service list | `SERVICES` | Name, short line (home page), long paragraphs (Services page). The `id` links each service to its area in the yard drawing (`src/components/YardScene.tsx`) and to the quote form checkboxes. |
| Service areas | `AREAS` | Name, blurb and photo for each town. The quote form's city list is built from this, plus "Other". The sketch map is `src/components/AreaMap.tsx`. |
| Picture credits | `CREDITS` | Shown in the footer. Remove an entry when you remove its picture. |

Colors and type sizes are tokens in `src/index.css` (`@theme`).

## Before launch

- Replace `[PHONE]`, `[EMAIL]` and `[BUSINESS ADDRESS]` in `src/config/site.ts`.
- Set `FORM.endpoint`, then send a test request and confirm it arrives.
- Decide on `FORM.phoneRequired` and the consent checkbox.
- Add photos of your own work if you have them. The current photos are credited Wikimedia Commons pictures of
  the area and of shoveling in general (a 1979 Chicago street), not of Frosted Freaks jobs.
- Set up SPA fallback on your host (see above).

## Components

`src/components/`: `Header`, `Hero`, `WinterScene` (giant snowball, snowbanks, mascot), `Snowman` (mascot and
logo), `Snowfall`, `ServicePoints`, `YardPicker` + `YardScene` (pick what needs clearing, carries the picks to the
quote form via `?services=`), `HowItWorks`, `ServiceAreaSection` + `AreaMap`, `CtaBand`, `QuoteForm`, `PageIntro`,
`Footer`.

Motion respects `prefers-reduced-motion`: snowfall, the bobbing mascot, the photo shutter and the scroll
entrances all switch off.
