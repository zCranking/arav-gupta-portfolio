import activity from "@/data/activity.json";
import { site } from "@/lib/work";

export function Footer() {
  return (
    <footer className="wrap footer">
      <p>
        {site.name}, Carlsbad, California. <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
      <p>
        {site.links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
        <span>Map last surveyed {activity.generated}</span>
      </p>
    </footer>
  );
}
