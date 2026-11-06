// Kept dependency-free so the client readout can import it without pulling
// site content into the browser bundle.
export type Peak = { slug: string; title: string; x: number; y: number; h: number; s: number; anchor: "start" | "end" };

// Gentle ground swell so the low country isn't flat, plus one hill per peak.
export function height(ps: Peak[], x: number, y: number) {
  let h = 1.8 + 1.8 * Math.sin(x / 95) * Math.cos(y / 70);
  for (const p of ps) h += p.h * Math.exp(-((x - p.x) ** 2 + (y - p.y) ** 2) / (2 * p.s * p.s));
  return h;
}
