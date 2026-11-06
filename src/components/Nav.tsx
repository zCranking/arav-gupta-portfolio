"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { href: "/#work", label: "Work", match: "/work" },
  { href: "/about", label: "About" },
  { href: "/log", label: "Log" },
  { href: "/tools", label: "Tools" },
  { href: "/resume", label: "Résumé" },
];

export function Nav({ name }: { name: string }) {
  const path = usePathname();
  return (
    <nav className="nav wrap" aria-label="Site">
      {path === "/" ? <span /> : <Link href="/" className="nav-name">{name}</Link>}
      <ul>
        {LINKS.map((l) => {
          const current = path === l.href || (l.match && path.startsWith(l.match));
          return (
            <li key={l.href}>
              <Link href={l.href} aria-current={current ? "page" : undefined}>
                {l.label}
              </Link>
            </li>
          );
        })}
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </nav>
  );
}
