import type { Metadata } from "next";
import Link from "next/link";
import activity from "@/data/activity.json";
import { Profile } from "@/components/Profile";
import { bySlug, logbook } from "@/lib/work";

export const metadata: Metadata = {
  title: "Log",
  description: "Every week of commits since 2024 drawn as an elevation profile, and a dated logbook of what happened when.",
};

const weeks = activity.weekly.filter((w) => w.week >= "2024-01-01");
const total = weeks.reduce((s, w) => s + w.commits, 0);
const active = weeks.filter((w) => w.commits > 0);
const repos = activity.repos as Record<string, { first: string }>;
const fmt = (w: string) => new Date(w + "T00:00:00Z").toLocaleDateString("en-US", { timeZone: "UTC", month: "short", day: "numeric", year: "numeric" });

export default function Log() {
  return (
    <main id="main" className="wrap">
      <header className="page-head">
        <h1>Log</h1>
        <p className="lede">
          {`${total} commits of mine since January 2024, one point per week. It only counts what's in git: robot code, school work, and the battalion don't show up, which is why the school year looks flat.`}
        </p>
      </header>

      <section className="section" aria-labelledby="profile-h">
        <h2 id="profile-h">Elevation profile</h2>
        <Profile
          weeks={weeks}
          marks={[
            { week: repos["trn-global"].first, label: "TRN Global" },
            { week: repos["athira"].first, label: "Athira" },
          ]}
        />
        <details className="table-view">
          <summary>Show the {active.length} active weeks as a table</summary>
          <table>
            <thead>
              <tr>
                <th scope="col">Week of</th>
                <th scope="col">Commits</th>
              </tr>
            </thead>
            <tbody>
              {active.map((w) => (
                <tr key={w.week}>
                  <td>{fmt(w.week)}</td>
                  <td>{w.commits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      </section>

      <section className="section">
        <h2>Logbook</h2>
        <ol className="log">
          {logbook.map((e) => (
            <li key={e.when}>
              <span className="when">{e.when}</span>
              <ul>
                {e.items.map((it) => (
                  <li key={it.text}>
                    {it.slug && bySlug(it.slug)?.built ? <Link href={`/work/${it.slug}`}>{it.text}</Link> : it.text}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
