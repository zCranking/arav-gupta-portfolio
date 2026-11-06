import Image from "next/image";
import Link from "next/link";
import { Contours } from "@/components/Contours";
import { Shot } from "@/components/Shot";
import { media, photos } from "@/lib/media";
import { fieldNotes, groups, site, type Project } from "@/lib/work";

const STATUS = { live: "Live demo", code: "Public code", private: "Private repo" } as const;

function Row({ p }: { p: Project }) {
  const thumb = media[p.slug]?.[0];
  return (
    <li className={thumb ? "entry has-thumb" : "entry"}>
      <span className="when">{p.when}</span>
      <div>
        <h3>{p.built ? <Link href={`/work/${p.slug}`}>{p.title}</Link> : p.title}</h3>
        <p>{p.oneLine}</p>
        {(p.stack || p.status) && (
          <p className="stack">
            {p.status && <span className={`chip chip-${p.status}`}>{STATUS[p.status]}</span>}
            {p.stack?.join(", ")}
          </p>
        )}
      </div>
      {thumb && (
        <Link
          href={`/work/${p.slug}`}
          className={thumb.logo ? "thumb thumb-logo" : "thumb"}
          style={thumb.logo && { background: thumb.logo.bg }}
          tabIndex={-1}
          aria-hidden="true"
        >
          <Image src={thumb.src} alt="" sizes="11rem" placeholder="blur" />
        </Link>
      )}
    </li>
  );
}

export default function Home() {
  return (
    <main id="main">
      <header className="hero">
        <Contours />
        <div className="wrap hero-text">
          <h1 className="name">{site.name}</h1>
          <p className="intro">{site.intro}</p>
          <ul className="contact">
            {site.links.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
          </ul>
        </div>
      </header>

      <div className="wrap">
        <section className="section">
          <h2>Right now</h2>
          <ul className="now">
            {site.now.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </section>

        {groups.map((g, k) => (
          <section className="section" key={g.id} id={k === 0 ? "work" : g.id}>
            <h2>{g.title}</h2>
            <ul className="entries">
              {g.items.map((p) => (
                <Row key={p.slug} p={p} />
              ))}
            </ul>
          </section>
        ))}

        <section className="section">
          <h2>Off the clock</h2>
          <div className="clock-photos">
            {[photos.trail, photos.coffee, photos.volleyball].map((ph) => (
              <Shot key={ph.alt} {...ph} />
            ))}
          </div>
          <ul className="clock">
            {fieldNotes.map((n) => (
              <li key={n.title}>
                <h3>{n.title}</h3>
                <p>
                  {/^[a-z]/.test(n.excerpt) && "…"}
                  {n.excerpt}
                </p>
              </li>
            ))}
          </ul>
          <p className="aside">
            <Link href="/about">The full versions, in my own words</Link>
          </p>
        </section>
      </div>
    </main>
  );
}
