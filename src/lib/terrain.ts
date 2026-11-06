// The hero map is real data: one hill per project, height = Arav's own
// commits in that repo (src/data/activity.json). Positions are hand-placed
// so labels stay clear of the hero text. Pure functions: the server traces
// contours at build time, the client reuses `height` for the cursor readout.
import activity from "@/data/activity.json";
import { bySlug } from "@/lib/work";
import { height, type Peak } from "@/lib/height";

export { height, type Peak };
export const W = 1200;
export const H = 520;
export const INTERVAL = 4; // commits per contour line
export const INDEX_EVERY = 5; // every 5th line is a heavier index contour

// The hero is sized so the map scales to its height and is only ever cropped
// from the left, never top or bottom. Anything left of x ~820 sits at y <= 135
// so it clears the name even at the hero's 600px minimum height
// (135/520 * 600 = 156px, while the name starts ~180px down).
const PLACES: [slug: string, x: number, y: number, anchor?: "end"][] = [
  ["trn-global", 265, 115],
  ["athira", 450, 135],
  ["veritas", 630, 95],
  ["prediction-market", 800, 135],
  ["chronologix", 975, 265],
  ["signal-to-ticket", 1150, 140, "end"],
  ["wayfare", 1090, 410, "end"],
  ["quant-strategies", 880, 445],
];

const repos = activity.repos as Record<string, { commits: number; days: number }>;

export const peaks: Peak[] = PLACES.flatMap(([slug, x, y, anchor]) => {
  const r = repos[slug];
  const p = bySlug(slug);
  if (!r || !p) return [];
  // Wider hills for projects worked on across more days.
  return [{ slug, title: p.short ?? p.title, x, y, h: r.commits, s: 42 + 9 * Math.sqrt(r.days) + r.commits * 0.45, anchor: anchor ?? "start" }];
});

// Below 1154px wide the hero sits at its 600px minimum, so the visible slice
// of the map is narrower than 1000 units and starts at x = W - width * 520/600.
// Each peak hides below the exact width where its label would be cut off.
export const peakCss = peaks
  .map((p) => {
    const left = p.anchor === "end" ? p.x - 170 : p.x - 10;
    return `@media (max-width:${Math.ceil(((W - left) * 600) / H)}px){.peak-${p.slug}{display:none}}`;
  })
  .join("");

// The tallest hill gets the one red survey mark; the rest are ink.
export const summit = peaks.reduce((a, b) => (b.h > a.h ? b : a)).slug;

// Edge ids: 0 top, 1 right, 2 bottom, 3 left. Case bits: tl=8 tr=4 br=2 bl=1.
const CASES: number[][][] = [
  [], [[3, 2]], [[2, 1]], [[3, 1]], [[0, 1]], [[3, 0], [2, 1]], [[0, 2]], [[3, 0]],
  [[3, 0]], [[0, 2]], [[3, 2], [0, 1]], [[0, 1]], [[3, 1]], [[2, 1]], [[3, 2]], [],
];

type Pt = [number, number];

// Marching squares, then stitch the cell segments into polylines so the path
// data stays small and joins are clean.
export function trace(ps: Peak[], level: number, step = 10): string {
  const cols = W / step + 1;
  const rows = H / step + 1;
  const v: number[][] = [];
  for (let j = 0; j < rows; j++) {
    v.push([]);
    for (let i = 0; i < cols; i++) v[j].push(height(ps, i * step, j * step));
  }
  const segs: [Pt, Pt][] = [];
  for (let j = 0; j < rows - 1; j++) {
    for (let i = 0; i < cols - 1; i++) {
      const tl = v[j][i], tr = v[j][i + 1], br = v[j + 1][i + 1], bl = v[j + 1][i];
      const idx = (tl >= level ? 8 : 0) | (tr >= level ? 4 : 0) | (br >= level ? 2 : 0) | (bl >= level ? 1 : 0);
      if (!CASES[idx].length) continue;
      const x = i * step, y = j * step;
      const f = (a: number, b: number) => (level - a) / (b - a);
      const pt = (e: number): Pt =>
        e === 0 ? [x + step * f(tl, tr), y]
        : e === 1 ? [x + step, y + step * f(tr, br)]
        : e === 2 ? [x + step * f(bl, br), y + step]
        : [x, y + step * f(tl, bl)];
      for (const [a, b] of CASES[idx]) segs.push([pt(a), pt(b)]);
    }
  }

  const key = (p: Pt) => `${p[0].toFixed(3)},${p[1].toFixed(3)}`;
  const ends = new Map<string, number[]>();
  segs.forEach(([a, b], i) => {
    for (const k of [key(a), key(b)]) (ends.get(k) ?? ends.set(k, []).get(k)!).push(i);
  });
  const used = new Uint8Array(segs.length);
  const next = (p: Pt): Pt | null => {
    for (const i of ends.get(key(p)) ?? []) {
      if (used[i]) continue;
      used[i] = 1;
      const [a, b] = segs[i];
      return key(a) === key(p) ? b : a;
    }
    return null;
  };

  let d = "";
  for (let i = 0; i < segs.length; i++) {
    if (used[i]) continue;
    used[i] = 1;
    const line: Pt[] = [...segs[i]];
    for (let p = next(line[line.length - 1]); p; p = next(line[line.length - 1])) line.push(p);
    for (let p = next(line[0]); p; p = next(line[0])) line.unshift(p);
    d += line.map((p, k) => `${k ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join("");
  }
  return d;
}

export function levels(ps: Peak[]) {
  const max = Math.max(...ps.map((p) => height(ps, p.x, p.y)));
  return Array.from({ length: Math.floor(max / INTERVAL) }, (_, k) => (k + 1) * INTERVAL);
}
