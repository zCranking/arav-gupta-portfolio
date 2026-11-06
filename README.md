# Portfolio

Arav Gupta's portfolio. Next.js 16, fully static, deployed on Vercel.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # the same static build Vercel runs
npm run check-links  # fails if any external link is broken (or a repo is private)
```

## Where things live

| What | Where |
| --- | --- |
| All words on the site | `src/lib/work.ts` |
| Screenshots, logos, photos, and their captions | `src/lib/media.ts` |
| Image files (resized for the web) | `src/assets/work/`, `src/assets/photos/` |
| Full-size photo originals (not committed) | `photo-originals/` |
| Commit data behind the map and the log | `src/data/activity.json` |

To add a photo: resize it to about 1800px on the long side, put it in `src/assets/photos/`, import it in `media.ts` with alt text and a caption, and reference it from a page.

## Day and night

The site picks the day or night map from the visitor's local time (day from 7:00 to 18:59). The "Night map" / "Day map" button overrides it for that visit only.

## The map

The hero is a contour map where each hill is a project and its height is Arav's own commits in that repo (teammates' commits are excluded). `npm run snapshot` re-reads the local repos (sibling folders of this one) and rewrites `src/data/activity.json`; commit that file, since the build server doesn't have the other repos. Peak positions are hand-placed in `src/lib/terrain.ts` inside a zone that stays visible at every window size, and each peak hides below the exact width where its label would be cut off.

## Deploying

Vercel builds every push to `main`. The site's own URL is picked up automatically from Vercel; set `NEXT_PUBLIC_SITE_URL` only if you add a custom domain.

## Credits

Coffee photo by Gaia&Co on [Unsplash](https://unsplash.com/photos/byPbezNfaIs) (Unsplash License). TRN Global wordmark recreated from the header of trnglobal.com.
