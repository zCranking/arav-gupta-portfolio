"use client";

import { useEffect, useRef, useState } from "react";
import { height, type Peak } from "@/lib/height";

// A GPS-style readout that follows the pointer over the map: grid reference
// and elevation (in commits) under the cursor. Pointer devices only.
export function MapReadout({ peaks }: { peaks: Peak[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [at, setAt] = useState<{ x: number; y: number; h: number } | null>(null);

  useEffect(() => {
    const map = ref.current?.parentElement;
    const svg = map?.querySelector("svg");
    if (!map || !svg || !matchMedia("(hover: hover)").matches) return;
    const move = (e: PointerEvent) => {
      const m = svg.getScreenCTM();
      if (!m) return;
      const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
      setAt({ x: p.x, y: p.y, h: height(peaks, p.x, p.y) });
    };
    const leave = () => setAt(null);
    map.addEventListener("pointermove", move);
    map.addEventListener("pointerleave", leave);
    return () => {
      map.removeEventListener("pointermove", move);
      map.removeEventListener("pointerleave", leave);
    };
  }, [peaks]);

  const grid = (n: number) => String(Math.max(0, Math.round(n))).padStart(4, "0");
  return (
    <div ref={ref} className="readout" aria-hidden="true" data-on={at ? "" : undefined}>
      {at && (
        <>
          <span>
            E{grid(at.x)} N{grid(520 - at.y)}
          </span>
          <span>elev. {Math.round(at.h)}</span>
        </>
      )}
    </div>
  );
}
