import type { Metadata } from "next";
import Link from "next/link";
import { Shot } from "@/components/Shot";
import { photos } from "@/lib/media";
import { activities, bySlug, education, fieldNotes, honors } from "@/lib/work";

export const metadata: Metadata = {
  title: "About",
  description: "Cadet, builder, twin, coffee person. Background, honors, and a few things in my own words.",
};

export default function About() {
  const ladder = bySlug("battalion-commander")!.log!;
  return (
    <main id="main" className="wrap">
      <header className="page-head about-head">
        <div>
          <h1>About</h1>
          <p className="lede">
            I grew up in San Ramon, in the Bay Area, and came to Army and Navy Academy in Carlsbad at fourteen. My twin
            brother, Ansh, joined me there junior year. The notes below are in my own words, taken from things I&apos;ve
            written.
          </p>
        </div>
        <Shot {...photos.portrait} priority className="portrait" />
      </header>

      <section className="section">
        <h2>In my own words</h2>
        <div className="notes">
          {fieldNotes.map((n) => (
            <article key={n.title} className="field-note">
              {"photo" in n && n.photo && <Shot {...photos[n.photo as keyof typeof photos]} className="note-photo" />}
              <h3>{n.title}</h3>
              <blockquote className="note">
                <p>{n.text}</p>
              </blockquote>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Honors</h2>
        <div className="honors-layout">
          <ul className="cards cards-2">
            {honors.map((h) => (
              <li key={h.title}>
                <span className="when">{h.year === "—" ? h.level : `${h.year} grade, ${h.level.toLowerCase()}`}</span>
                <h3>{h.title}</h3>
                <p>{h.detail}</p>
              </li>
            ))}
          </ul>
          <Shot {...photos.risingStar} />
        </div>
      </section>

      <section className="section">
        <h2>Rank</h2>
        <ol className="ladder">
          {ladder.map((e, i) => (
            <li key={e.when + e.title} style={{ "--i": i } as React.CSSProperties}>
              <span className="when">{e.when}</span>
              <strong>{e.title}</strong>
            </li>
          ))}
        </ol>
        <p className="aside">
          What the job involves: <Link href="/work/battalion-commander">Battalion Commander</Link>.
        </p>
      </section>

      <section className="section">
        <h2>School</h2>
        <ul className="cards cards-3">
          {education.map((e) => (
            <li key={e.school}>
              <span className="when">
                {e.when}, {e.place}
              </span>
              <h3>{e.school}</h3>
              <p>{e.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2>Everything else</h2>
        <ul className="cards cards-3 cards-small">
          {activities.map((a) => (
            <li key={a.title}>
              <h3>{a.title}</h3>
              <p>{a.detail}</p>
            </li>
          ))}
        </ul>
        <div className="gallery">
          {[photos.modelCongress, photos.interact, photos.volleyball].map((ph) => (
            <Shot key={ph.alt} {...ph} />
          ))}
        </div>
      </section>
    </main>
  );
}
