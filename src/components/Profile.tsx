"use client";

import { useState } from "react";

type Week = { week: string; commits: number };
type Mark = { week: string; label: string };

const VW = 1000, VH = 300, L = 44, R = 12, T = 28, B = 34;
const fmt = (w: string, opts: Intl.DateTimeFormatOptions) => new Date(w + "T00:00:00Z").toLocaleDateString("en-US", { timeZone: "UTC", ...opts });

// Weekly commits drawn as a trail elevation profile. Hover or arrow keys
// move a crosshair; the same numbers are in the table below the chart.
export function Profile({ weeks, marks }: { weeks: Week[]; marks: Mark[] }) {
  const [i, setI] = useState<number | null>(null);
  const n = weeks.length;
  const max = Math.max(...weeks.map((w) => w.commits));
  const top = Math.ceil(max / 25) * 25;
  const x = (k: number) => L + (k * (VW - L - R)) / (n - 1);
  const y = (v: number) => T + (VH - T - B) * (1 - v / top);
  const line = weeks.map((w, k) => `${k ? "L" : "M"}${x(k).toFixed(1)} ${y(w.commits).toFixed(1)}`).join("");
  const area = `${line}L${x(n - 1)} ${y(0)}L${x(0)} ${y(0)}Z`;
  const peak = weeks.findIndex((w) => w.commits === max);
  const ticks = weeks.map((w, k) => ({ w, k })).filter(({ w }) => /-(01|07)-0[1-7]$/.test(w.week));
  const at = (week: string) => weeks.findIndex((w) => w.week >= week);

  const fromPointer = (e: React.PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const vx = ((e.clientX - r.left) / r.width) * VW;
    setI(Math.max(0, Math.min(n - 1, Math.round(((vx - L) / (VW - L - R)) * (n - 1)))));
  };

  return (
    <div className="profile">
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        role="img"
        aria-label={`Weekly commits from ${fmt(weeks[0].week, { month: "short", year: "numeric" })} to ${fmt(weeks[n - 1].week, { month: "short", year: "numeric" })}. Peak: ${max} commits in the week of ${fmt(weeks[peak].week, { month: "short", day: "numeric", year: "numeric" })}.`}
        tabIndex={0}
        onPointerMove={fromPointer}
        onPointerLeave={() => setI(null)}
        onBlur={() => setI(null)}
        onKeyDown={(e) => {
          if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
          e.preventDefault();
          setI((c) => Math.max(0, Math.min(n - 1, (c ?? peak) + (e.key === "ArrowRight" ? 1 : -1))));
        }}
      >
        {[0, 0.25, 0.5, 0.75, 1].map((f) => (
          <g key={f} className="grid">
            <line x1={L} x2={VW - R} y1={y(top * f)} y2={y(top * f)} />
            <text x={L - 8} y={y(top * f) + 4} textAnchor="end">
              {top * f}
            </text>
          </g>
        ))}
        {ticks.map(({ w, k }) => (
          <text key={w.week} className="tick" x={x(k)} y={VH - 10} textAnchor="middle">
            {fmt(w.week, { month: "short", year: "numeric" })}
          </text>
        ))}
        <path d={area} className="profile-area" />
        <path d={line} className="profile-line" />
        {marks.map((m) => {
          const k = at(m.week);
          return k < 0 ? null : (
            <g key={m.week} className="waypoint">
              <line x1={x(k)} x2={x(k)} y1={y(0)} y2={T + 30} />
              <text x={x(k) + 6} y={T + 40}>{m.label}</text>
            </g>
          );
        })}
        <text className="peak-label" x={x(peak) - 10} y={y(max) + 4} textAnchor="end">
          {max} commits, week of {fmt(weeks[peak].week, { month: "short", day: "numeric" })}
        </text>
        {i !== null && (
          <g className="crosshair">
            <line x1={x(i)} x2={x(i)} y1={T} y2={y(0)} />
            <circle cx={x(i)} cy={y(weeks[i].commits)} r={5} />
          </g>
        )}
      </svg>
      {i !== null && (
        <div className="tip" style={{ left: `${(x(i) / VW) * 100}%` }} role="status">
          <strong>{weeks[i].commits} commits</strong>
          <span>Week of {fmt(weeks[i].week, { month: "short", day: "numeric", year: "numeric" })}</span>
        </div>
      )}
    </div>
  );
}
