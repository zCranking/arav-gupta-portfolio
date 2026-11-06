import type { Metadata } from "next";
import Link from "next/link";
import { detailed, toolbox, toolId } from "@/lib/work";

export const metadata: Metadata = {
  title: "Tools",
  description: "The languages, frameworks, and AI tools I build with, and which projects used each one.",
};

// Columns: every project page that lists a stack.
const cols = detailed.filter((p) => p.stack?.length);

export default function Tools() {
  return (
    <main id="main" className="wrap">
      <header className="page-head">
        <h1>Tools</h1>
        <p className="lede">What I reach for, grouped by what it&apos;s for. The grid below shows which project used what.</p>
      </header>

      <section className="toolbox" aria-label="Tools by category">
        {toolbox.map((g) => (
          <div key={g.group} className="toolgroup">
            <h2>{g.group}</h2>
            <ul>
              {g.tools.map((t) => (
                <li key={t.name}>
                  <a href={`#${toolId(t.name)}`}>{t.name}</a>
                  <span className="uses" aria-label={`${t.projects.length} projects`}>
                    {Array.from({ length: t.projects.length }, (_, k) => (
                      <i key={k} />
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="section">
        <h2>Where each one shows up</h2>
        <div className="matrix-scroll">
          <table className="matrix">
            <thead>
              <tr>
                <td />
                {cols.map((p) => (
                  <th key={p.slug} scope="col">
                    <Link href={`/work/${p.slug}`}>{p.short ?? p.title}</Link>
                  </th>
                ))}
              </tr>
            </thead>
            {toolbox.map((g) => (
              <tbody key={g.group}>
                <tr className="matrix-group">
                  <th scope="rowgroup" colSpan={cols.length + 1}>
                    {g.group}
                  </th>
                </tr>
                {g.tools.map((t) => (
                  <tr key={t.name} id={toolId(t.name)}>
                    <th scope="row">{t.name}</th>
                    {cols.map((p) => (
                      <td key={p.slug}>{t.projects.includes(p) ? <span className="dot" role="img" aria-label="used" /> : null}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </section>
    </main>
  );
}
