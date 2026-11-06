import Link from "next/link";
import activity from "@/data/activity.json";
import { H, INDEX_EVERY, INTERVAL, W, levels, peakCss, peaks, summit, trace } from "@/lib/terrain";
import { MapReadout } from "./MapReadout";

// Traced once at build time; the page ships plain SVG paths.
const lines = levels(peaks).map((level, k) => ({ level, k, d: trace(peaks, level), index: (k + 1) % INDEX_EVERY === 0 }));

export function Contours() {
  return (
    <div className="map">
      <style>{peakCss}</style>
      <svg className="contours" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMaxYMid slice" role="img" aria-labelledby="map-title">
        <title id="map-title">
          {`A contour map of my projects. Each hill is a project; its height is my commits in that repo. Tallest: ${peaks
            .slice()
            .sort((a, b) => b.h - a.h)
            .slice(0, 3)
            .map((p) => `${p.title} (${p.h})`)
            .join(", ")}.`}
        </title>
        {lines.map((l) => (
          <path key={l.level} d={l.d} className={l.index ? "contour contour-index" : "contour"} style={{ "--k": l.k } as React.CSSProperties} />
        ))}
        {peaks.map((p, i) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            className={`peak peak-${p.slug}${p.slug === summit ? " peak-top" : ""}`}
            style={{ "--k": i } as React.CSSProperties}
            aria-label={`${p.title}: ${p.h} commits`}
          >
            <path d={`M${p.x} ${p.y - 6}L${p.x + 5} ${p.y + 3}L${p.x - 5} ${p.y + 3}Z`} className="summit" />
            <text x={p.x + (p.anchor === "end" ? -12 : 12)} y={p.y + 4} textAnchor={p.anchor}>
              <tspan className="peak-name">{p.title}</tspan>
              <tspan className="peak-height" dx="6">{p.h}</tspan>
            </text>
          </Link>
        ))}
      </svg>
      <MapReadout peaks={peaks} />
      <p className="legend">
        Each hill is a project. Spot heights are my commits, contour interval {INTERVAL}. Surveyed {activity.generated}.
      </p>
    </div>
  );
}
