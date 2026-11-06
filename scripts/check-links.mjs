// Check every external link in the site content. `npm run check-links`.
// Private GitHub repos return 404 to visitors, so linking one is a broken link.
import { readFileSync } from "node:fs";
import { join } from "node:path";

const src = readFileSync(join(import.meta.dirname, "..", "src", "lib", "work.ts"), "utf8");
// Skip template-literal URLs like `https://${host}`; they're built at runtime.
const urls = [...new Set(src.match(/https:\/\/[^"'`\s)]+/g))].filter((u) => !u.includes("${"));

// LinkedIn and some news sites refuse bots; treat 403/405/429/999 as "alive, but guarded".
const GUARDED = new Set([403, 405, 429, 999]);
let broken = 0;
for (const url of urls) {
  let status;
  try {
    status = (await fetch(url, { method: "GET", redirect: "follow", headers: { "user-agent": "Mozilla/5.0 link-check" } })).status;
  } catch (e) {
    status = e.cause?.code ?? "ERR";
  }
  const ok = (status >= 200 && status < 400) || GUARDED.has(status);
  if (!ok) broken++;
  console.log(`${ok ? "ok  " : "FAIL"} ${status}  ${url}`);
}
console.log(broken ? `\n${broken} broken link(s).` : "\nAll links resolve.");
process.exit(broken ? 1 : 0);
