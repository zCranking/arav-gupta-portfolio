"use client";

import { useSyncExternalStore } from "react";

function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}

// The head script always sets data-theme (from the visitor's local time).
const current = () => document.documentElement.dataset.theme ?? "light";

// Day map / night map. Follows the visitor's clock by default; a click
// overrides it for the rest of this visit only, so the next visit follows
// the clock again.
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, current, () => null);
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => {
        document.documentElement.dataset.theme = next;
        try {
          sessionStorage.setItem("theme", next);
        } catch {}
      }}
      aria-label={`Switch to the ${next === "dark" ? "night" : "day"} map`}
    >
      {theme === null ? "Map" : theme === "dark" ? "Day map" : "Night map"}
    </button>
  );
}
