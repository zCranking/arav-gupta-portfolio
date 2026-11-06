import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import activity from "@/data/activity.json";
import { KeyNav } from "@/components/KeyNav";
import { Shot } from "@/components/Shot";
import { media, type Media } from "@/lib/media";
import { detailed, isKeyTool, site, toolId } from "@/lib/work";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return detailed.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = detailed.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.oneLine } : {};
}

const STATUS = {
  live: "Live demo and public code",
  code: "Public code",
  private: "Private repo. Happy to walk through the code on a call.",
} as const;

const repos = activity.repos as Record<string, { commits: number; first: string; last: string; days: number }>;
const day = (d: string) => new Date(d + "T00:00:00Z").toLocaleDateString("en-US", { timeZone: "UTC", month: "short", day: "numeric", year: "numeric" });

// Logos sit whole on their brand color; screenshots and photos open full size.
function Visual({ m, priority }: { m: Media; priority?: boolean }) {
  if (!m.logo) return <Shot {...m} priority={priority} />;
  return (
    <figure className="logo-wrap">
      <div className="logo-figure" style={{ background: m.logo.bg }}>
        <Image src={m.src} alt={m.alt} sizes="22rem" priority={priority} />
      </div>
      {m.caption && <figcaption>{m.caption}</figcaption>}
    </figure>
  );
}

function Part({ heading, body }: { heading: string; body?: string[] }) {
  if (!body?.length) return null;
  return (
    <section className="part">
      <h2>{heading}</h2>
      <div>
        {body.map((para) => (
          <p key={para}>{para}</p>
        ))}
      </div>
    </section>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const i = detailed.findIndex((p) => p.slug === slug);
  if (i < 0) notFound();
  const p = detailed[i];
  const prev = detailed[i - 1];
  const next = detailed[i + 1];
  const shots = media[p.slug] ?? [];
  const git = repos[p.slug];

  return (
    <main id="main" className="wrap">
      <KeyNav prev={prev && `/work/${prev.slug}`} next={next && `/work/${next.slug}`} />
      <header className="project-head">
        <h1>{p.title}</h1>
        <p className="lede">{p.oneLine}</p>
        <dl className="facts">
          <dt>When</dt>
          <dd>{p.when}</dd>
          {p.role && (
            <>
              <dt>Role</dt>
              <dd>{p.role}</dd>
            </>
          )}
          {p.stack && (
            <>
              <dt>Built with</dt>
              <dd>
                {p.stack.map((t, k) => (
                  <span key={t}>
                    {k > 0 && ", "}
                    {isKeyTool(t) ? (
                      <Link href={`/tools#${toolId(t)}`} className="quiet">
                        {t}
                      </Link>
                    ) : (
                      t
                    )}
                  </span>
                ))}
              </dd>
            </>
          )}
          {p.status && (
            <>
              <dt>Code</dt>
              <dd>{STATUS[p.status]}</dd>
            </>
          )}
          {p.links && (
            <>
              <dt>Links</dt>
              <dd className="links">
                {p.links.map((l) => (
                  <a key={l.href} href={l.href}>
                    {l.label}
                  </a>
                ))}
              </dd>
            </>
          )}
          {git && git.commits > 1 && (
            <>
              <dt>By the numbers</dt>
              <dd>
                {git.commits} commits of mine over {git.days} working {git.days === 1 ? "day" : "days"}, {day(git.first)} to {day(git.last)}
              </dd>
            </>
          )}
        </dl>
      </header>

      {shots[0] && <Visual m={shots[0]} priority />}
      <Part heading="What I built" body={p.built} />
      {shots.length > 2 ? (
        <div className="pair">
          {shots.slice(1).map((m) => (
            <Visual key={m.alt} m={m} />
          ))}
        </div>
      ) : (
        shots[1] && <Visual m={shots[1]} />
      )}
      <Part heading="What was hard" body={p.hard} />
      <Part heading="What I learned" body={p.learned} />
      <Part heading="Results" body={p.results} />

      {p.log && (
        <section className="part">
          <h2>{p.slug === "vex-robotics" ? "Season log" : "Record"}</h2>
          <ol className="log">
            {p.log.map((e) => (
              <li key={e.when + e.title}>
                <span className="when">{e.when}</span>
                <div>
                  <strong>{e.title}</strong>
                  {e.detail && <p>{e.detail}</p>}
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {p.team && <Part heading="Team" body={p.team} />}

      {p.sources && (
        <section className="part">
          <h2>Sources</h2>
          <ul className="sources">
            {p.sources.map((s) => (
              <li key={s.href}>
                <a href={s.href}>{s.label}</a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav className="pager" aria-label="More projects">
        {prev ? <Link href={`/work/${prev.slug}`} rel="prev">Previous: {prev.title}</Link> : <Link href="/">{site.name}</Link>}
        <span className="pager-hint">Arrow keys work too</span>
        {next ? <Link href={`/work/${next.slug}`} rel="next">Next: {next.title}</Link> : <Link href="/#work">All projects</Link>}
      </nav>
    </main>
  );
}
