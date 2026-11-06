import type { Metadata } from "next";
import { PrintButton } from "@/components/PrintButton";
import { activities, bySlug, education, honors, site, toolbox } from "@/lib/work";

export const metadata: Metadata = {
  title: "Résumé",
  description: "One-page résumé. Prints cleanly or saves as a PDF.",
};

const EXPERIENCE = ["athira", "trn-global"];
const PROJECTS = ["veritas", "prediction-market", "chronologix", "signal-to-ticket", "quant-strategies", "wayfare"];
const LEADERSHIP = [
  { title: "Battalion Commander, JROTC", when: "2026 – 27", detail: "Lead 300+ cadets in grades 7 to 12 with the President, Commandant, and Senior Army Instructor." },
  { title: "First Sergeant, Charlie Company", when: "2025 – 26", detail: "40+ cadets. One of six juniors chosen." },
  { title: "Founding member and project manager, VEX team 92008A", when: "2024 – now", detail: "Regional champion, 3rd in Robot Skills at JROTC Nationals, VEX Worlds 2025 and 2026." },
];

export default function Resume() {
  return (
    <main id="main" className="wrap resume">
      <div className="resume-actions">
        <PrintButton />
      </div>
      <header className="resume-head">
        <h1>{site.name}</h1>
        <p>
          Carlsbad, California. <a href={`mailto:${site.email}`}>{site.email}</a>
          {site.links.map((l) => (
            <span key={l.href}>
              {" "}
              <a href={l.href}>{l.href.replace("https://", "").replace("www.", "")}</a>
            </span>
          ))}
        </p>
      </header>

      <section>
        <h2>Education</h2>
        {education.map((e) => (
          <div className="r-item" key={e.school}>
            <p className="r-line">
              <span><strong>{e.school}</strong>, {e.place}</span>
              <span className="r-date">{e.when}</span>
            </p>
            <p>{e.detail}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Experience</h2>
        {EXPERIENCE.map((s) => {
          const p = bySlug(s)!;
          return (
            <div className="r-item" key={s}>
              <p className="r-line">
                <strong>{p.title}</strong>
                <span className="r-date">{p.when}</span>
              </p>
              <p>{p.built?.[0]}</p>
            </div>
          );
        })}
      </section>

      <section>
        <h2>Projects</h2>
        {PROJECTS.map((s) => {
          const p = bySlug(s)!;
          return (
            <div className="r-item" key={s}>
              <p className="r-line">
                <strong>{p.title}</strong>
                <span className="r-date">{p.when}</span>
              </p>
              <p>{p.oneLine}</p>
            </div>
          );
        })}
      </section>

      <section>
        <h2>Leadership</h2>
        {LEADERSHIP.map((l) => (
          <div className="r-item" key={l.title}>
            <p className="r-line">
              <strong>{l.title}</strong>
              <span className="r-date">{l.when}</span>
            </p>
            <p>{l.detail}</p>
          </div>
        ))}
        <p>{activities.slice(0, 5).map((a) => a.title).join("; ")}.</p>
      </section>

      <section>
        <h2>Honors</h2>
        <ul>
          {honors.map((h) => (
            <li key={h.title}>
              <strong>{h.title}</strong> {h.year !== "—" && `(${h.year} grade)`}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Skills</h2>
        <p>{toolbox.map((g) => `${g.group}: ${g.tools.map((t) => t.name).join(", ")}`).join(". ")}.</p>
      </section>
    </main>
  );
}
