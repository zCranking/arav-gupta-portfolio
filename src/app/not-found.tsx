import Link from "next/link";
import { H, W, levels, peaks, trace } from "@/lib/terrain";

// A fragment of the home map, zoomed into empty country.
const lines = levels(peaks).slice(0, 6).map((l) => trace(peaks, l, 14));

export default function NotFound() {
  return (
    <main id="main" className="wrap lost">
      <svg viewBox={`0 0 ${W / 2} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="lost-map">
        {lines.map((d, k) => (
          <path key={k} d={d} className="contour" />
        ))}
      </svg>
      <h1>Off the map</h1>
      <p className="lede">Nothing has been surveyed at this address. The page may have moved, or the link has a typo.</p>
      <p>
        <Link href="/">Back to the map</Link>
      </p>
    </main>
  );
}
