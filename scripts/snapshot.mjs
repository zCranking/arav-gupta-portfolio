// Snapshot Arav's own git activity into src/data/activity.json.
// Run locally: `npm run snapshot` (repos live next to this project, not on
// the build server, so the site reads the committed JSON instead of git).
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.argv[2] ?? join(import.meta.dirname, "..", "..");
const ME = /aravgupta2019@gmail\.com|71561508\+zCranking@users\.noreply\.github\.com/i;

// Project slug -> repo folders. Anything else under root still counts toward
// the weekly totals, except clones of other people's code.
const REPOS = {
  veritas: ["Veritas-Hackathon-Project"],
  "prediction-market": ["AI-Simulation-Prediction-Market"],
  "signal-to-ticket": ["Signal-to-Ticket-Agent"],
  "quant-strategies": ["Quant-Trading-Strategy-2026"],
  chronologix: ["chronologix-ai-starter-kit"],
  "corporate-travel-agent": ["Corporate-Travel-Agent"],
  wayfare: ["Travel Agency"],
  "college-match": ["College-Match-AI"],
  "professor-outreach": ["professor-outreach"],
  "trn-global": ["TrivvyLite"],
  athira: ["Athira-final-frontend", "Athira-Backend-MongoDB", "Application-Site"],
};
const SKIP = new Set(["Github Clones"]);

function commits(dir) {
  if (!existsSync(join(dir, ".git"))) return [];
  try {
    const out = execFileSync("git", ["-C", dir, "log", "--all", "--format=%aE|%ad", "--date=short"], { encoding: "utf8" });
    return out.split("\n").filter((l) => ME.test(l)).map((l) => l.split("|")[1]);
  } catch {
    return [];
  }
}

// Monday of the ISO week, as YYYY-MM-DD.
function week(date) {
  const d = new Date(date + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
  return d.toISOString().slice(0, 10);
}

const repos = {};
for (const [slug, dirs] of Object.entries(REPOS)) {
  const dates = dirs.flatMap((d) => commits(join(root, d))).sort();
  if (!dates.length) continue;
  repos[slug] = { commits: dates.length, first: dates[0], last: dates.at(-1), days: new Set(dates).size };
}

const weeks = {};
for (const name of readdirSync(root, { withFileTypes: true })) {
  if (!name.isDirectory() || SKIP.has(name.name)) continue;
  for (const d of commits(join(root, name.name))) weeks[week(d)] = (weeks[week(d)] ?? 0) + 1;
}

// Fill empty weeks so the profile is continuous.
const keys = Object.keys(weeks).sort();
const weekly = [];
for (let d = new Date(keys[0] + "T00:00:00Z"); d.toISOString().slice(0, 10) <= keys.at(-1); d.setUTCDate(d.getUTCDate() + 7)) {
  const k = d.toISOString().slice(0, 10);
  weekly.push({ week: k, commits: weeks[k] ?? 0 });
}

const data = {
  generated: new Date().toISOString().slice(0, 10),
  total: weekly.reduce((s, w) => s + w.commits, 0),
  repos,
  weekly,
};
writeFileSync(join(import.meta.dirname, "..", "src", "data", "activity.json"), JSON.stringify(data, null, 2) + "\n");
console.log(`${data.total} commits across ${weekly.length} weeks; projects:`, Object.fromEntries(Object.entries(repos).map(([k, v]) => [k, v.commits])));
