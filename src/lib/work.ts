// All site copy lives here. Facts come from Arav's essays, activities list,
// resume, READMEs, git history and published press coverage (linked in
// `sources`). The prose is a DRAFT: rewrite every sentence in your own voice
// before submitting anywhere that asks for your own writing. `fieldNotes` are
// already your own words, quoted from your essays.

export const site = {
  name: "Arav Gupta",
  // On Vercel the production domain is provided automatically; set
  // NEXT_PUBLIC_SITE_URL only if you add a custom domain.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"),
  intro:
    "Senior at Army and Navy Academy in Carlsbad, California, where I'm the Battalion Commander. I build software, mostly AI agents that have to show their work: cite the source, pass the check, or stop.",
  email: "aravgupta2019@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/zCranking" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/arav-gupta-9b581a355/" },
  ],
  now: [
    "Leading a 300+ cadet battalion, grades 7 to 12",
    "Taking Advanced C++ at MiraCosta College (dual enrollment)",
    "Working on an idea for a legal-aid tool that helps people without lawyers prepare their own court filings",
  ],
};

export type Link = { label: string; href: string };

export type Project = {
  slug: string;
  title: string;
  short?: string; // map labels and the tools matrix
  when: string;
  oneLine: string;
  stack?: string[];
  role?: string;
  links?: Link[];
  // live: has a public demo. code: public repo. private: repo isn't public.
  status?: "live" | "code" | "private";
  // Projects with no `built` get a row on the homepage but no page.
  built?: string[];
  hard?: string[];
  learned?: string[];
  results?: string[];
  team?: string[];
  log?: { when: string; title: string; detail?: string }[];
  sources?: Link[];
};

export const projects: Project[] = [
  {
    slug: "veritas",
    title: "Veritas Charting",
    when: "Jul 2026",
    oneLine:
      "Catches AI-written clinical notes that drift from what the patient actually said. Built at the Abridge AI Healthcare Hackathon.",
    stack: ["Python", "FastAPI", "Claude", "FHIR", "JavaScript"],
    role: "Co-built with Rajeev Sethuraman",
    status: "live",
    links: [
      { label: "Live demo", href: "https://zcranking.github.io/Veritas-Hackathon-Project/" },
      { label: "GitHub", href: "https://github.com/zCranking/Veritas-Hackathon-Project" },
    ],
    built: [
      "Ambient scribes turn a doctor visit into a SOAP note. The dangerous failure isn't a garbled note, it's a fluent one that lists a medication the patient stopped, or turns a hedged \"I don't think so\" into a clean \"denies.\" Veritas treats the note writer as a system under test: it audits every claim in the note against the patient's FHIR chart, the visit transcript, and the after-visit summary, then three independent Claude judges vote on each flag.",
      "Rajeev and I split the work. I set up the dataset and the first prompts, tuned the auditor's severity weighting and reasoning, built the three-panel interface (transcript, note, flagged discrepancies with each judge's vote), and after the hackathon cleaned up the repo and shipped a static demo that replays a real run with no API key. Rajeev fed the chart and after-visit summary into the auditor and judges and built the self-scoring that measures how many planted traps we catch.",
    ],
    hard: [
      "Deciding which source wins. The chart is authoritative for measured facts, the clinician for judgment, and the patient for their own body and whether they took their meds. We wrote that authority model down once and gave the same text to the auditor and all three judges, then enforced it in code: a contradiction against an authoritative source gets bumped one severity level, and the finding keeps a record of why.",
      "Judges disagree. Averaging their votes hid the interesting cases, so a split vote is shown as a split.",
    ],
    learned: [
      "When it caught a note listing a medication the patient never took, I realized AI fails quietly. A working prototype isn't the same as a tool people trust.",
      "The hardest questions at the hackathon weren't technical. They were about who would use the tool and why they would trust it.",
    ],
    results: [
      "On the demo case, a COVID-19 admission, it audited 72 claims, flagged 12, and the judges confirmed 5 drifts, one of them high severity.",
      "Public demo anyone can click through. Every reasoning step returns strict JSON through tool use, so nothing in the pipeline parses free text.",
    ],
  },
  {
    slug: "prediction-market",
    title: "AI Simulation Prediction Market",
    short: "Prediction Market",
    when: "Jun – Jul 2026",
    oneLine:
      "A points-based prediction market where the crowd sets the odds and an AI analyst forecasts on its own, then both get scored.",
    stack: ["Next.js", "TypeScript", "Supabase", "Postgres", "Claude", "Vultr"],
    role: "Solo",
    status: "code",
    links: [{ label: "GitHub", href: "https://github.com/zCranking/AI-Simulation-Prediction-Market" }],
    built: [
      "It started after California Boys State as a quick app that predicted our mock election from delegate survey data: Governor, Lieutenant Governor, Secretary of State, Treasurer. I built the first version in two days.",
      "Then I rebuilt it in a week as a multi-market exchange. Users stake points, odds move in real time, and an AI analyst reads each market's state on a schedule and posts its own probability and rationale next to the crowd's. When a market resolves, humans and the AI are scored with the same Brier score on one leaderboard.",
    ],
    hard: [
      "Two bets placed at the same moment could overdraw a balance. I moved staking into a single atomic Postgres function and wrote a test that fires 20 stakes at once against the live database.",
      "LLM probabilities don't always add up to 100%. Every forecast goes through the same validation and renormalization step no matter which model produced it.",
      "Locking down row-level security so guests can bet but can't touch anyone else's balance or the admin functions.",
    ],
    learned: [
      "Scoring the AI the same way as people keeps you honest. It's easy to say a model is good at forecasting; it's harder when it sits on a leaderboard under real users.",
    ],
    results: [
      "Delegates at Boys State used it to see how the races could turn out and what everyone else was thinking.",
      "The 20-concurrent-stake test passes with zero overdrafts.",
      "Demo data was reset before the repo went public. The live deployment is currently down; the code is public.",
    ],
  },
  {
    slug: "signal-to-ticket",
    title: "Signal-to-Ticket",
    when: "Jul 2026",
    oneLine:
      "Reads a company's SEC 8-K filing and turns it into a sized trade ticket, or kills the trade and names the rule it broke.",
    stack: ["Python", "SEC EDGAR", "ChromaDB", "sentence-transformers", "Claude", "GitHub Actions"],
    role: "Solo",
    status: "code",
    links: [{ label: "GitHub", href: "https://github.com/zCranking/Signal-to-Ticket-Agent" }],
    built: [
      "When a company files an 8-K, the stock can move 5 to 20% before a person finishes reading it. This agent classifies the event, finds the five most similar past events and how the stock reacted, sizes a position with half-Kelly scaled down for volatility, checks the idea against a fund mandate, checks the thesis against the latest 10-Q, and writes a ticket with a confidence score and citations.",
    ],
    hard: [
      "Not every rule needs a model. A restricted ticker is a set lookup, so it's checked instantly and a kill there never reaches the LLM. The model only handles judgment calls a lookup can't, like sector caps against a free-text thesis. Splitting those two gates made the agent cheaper and made each kill easier to explain.",
    ],
    learned: [
      "A demo pipeline isn't a strategy. The README says plainly that the analogue set was chosen for variety, not tested for survivorship bias, and lays out what a real backtest would take.",
    ],
    results: ["Unit tests run in GitHub Actions on every push."],
  },
  {
    slug: "quant-strategies",
    title: "Quant trading backtests",
    short: "Quant backtests",
    when: "Jun – Jul 2026",
    oneLine:
      "Two trading strategies backtested from 2021 to 2026, through the 2022 bear market, for the Harvard Venture Tech Summer Program.",
    stack: ["Python", "pandas", "matplotlib"],
    role: "Solo",
    status: "code",
    links: [{ label: "GitHub", href: "https://github.com/zCranking/Quant-Trading-Strategy-2026" }],
    built: [
      "A momentum strategy that only holds when four conditions agree (market regime, trend, rate of change, and volatility), and an earnings strategy that goes long on beats and short on misses after the announcement.",
      "I kept both purely numeric on purpose: no model calls, fully reproducible from cached data. I wanted the backtest engine and look-ahead safety right before adding AI on top.",
    ],
    hard: [
      "Look-ahead bias. It's easy to accidentally trade on information you wouldn't have had yet, and it makes every result look better than it is.",
      "Extending the window from 2023 back to 2021 changed both stories, which was a lesson in how much the test period decides the conclusion.",
    ],
    learned: [
      "The earnings strategy went from +14% to +138% between versions, and almost none of that came from a better signal. It came from portfolio construction: concentrating capital in live trades and parking idle cash in SPY.",
    ],
    results: [
      "Momentum: +52.4%, Sharpe 1.02 versus SPY's 0.94, max drawdown -10.7% versus SPY's -24.5%.",
      "Earnings (v2): +137.9%, beating SPY's roughly +120% on return, Sharpe, and drawdown.",
    ],
  },
  {
    slug: "chronologix",
    title: "Chronologix",
    when: "Jul 2026",
    oneLine:
      "Turns a box of case records into a date-ordered chronology where every fact cites the page it came from.",
    stack: ["FastAPI", "Next.js", "TypeScript", "Supabase", "pgvector", "Claude", "Voyage", "Deepgram", "Tesseract"],
    role: "Solo",
    status: "code",
    links: [{ label: "GitHub", href: "https://github.com/zCranking/chronologix-ai-starter-kit" }],
    built: [
      "For personal-injury and civil litigation: upload medical records, depositions and recordings, and it builds a timeline of events, flags where sources contradict each other, and lets an attorney edit and sign off before drafting a demand letter. Nothing is final until a person approves it.",
    ],
    hard: [
      "In a legal chronology, a made-up fact is the worst possible bug. I treated hallucinations as high severity and added a separate verification step that checks the output against the source documents.",
      "Mocked tests all passed, then the first live run broke four ways. Claude wrapped JSON in code fences even when told not to, and regenerating a chronology could insert duplicate entries. None of it showed up until real documents went through.",
    ],
    learned: ["Unit tests against a fake model tell you your code works with a fake model."],
    results: [
      "Passed verification on a held-out case with known ground truth: zero hallucinated facts, correct ordering, every entry traceable to its source.",
    ],
  },
  {
    slug: "wayfare",
    title: "Wayfare",
    when: "Jul 2026",
    oneLine:
      "A corporate travel booking assistant: state your meetings, get itineraries that satisfy every hard constraint, and book with policy checks and manager approval.",
    stack: ["FastAPI", "LangGraph", "Next.js", "TypeScript", "Supabase", "pgvector", "Claude", "Duffel"],
    role: "Solo",
    status: "code",
    links: [{ label: "GitHub", href: "https://github.com/zCranking/Travel-Agency" }],
    built: [
      "You type your meetings, or paste them as prose and confirm the draft. A constraint planner enumerates every itinerary that satisfies the hard constraints, then AI layers rank them and assess risk. Booking re-searches every leg against live flight data before anything is ticketed, and out-of-policy trips route to a manager.",
    ],
    hard: [
      "An empty result is useless. If no itinerary is feasible, the planner returns the constraint that blocked it and the smallest change that would fix it.",
      "Money and time. Prices are stored as integer cents and every time is timezone-aware, because a flight that crosses midnight in another timezone is exactly where bugs hide.",
    ],
    learned: [
      "Each AI layer has a deterministic fallback, so the planner still works when the model is down. The model makes it better, it isn't holding it up.",
    ],
    results: [
      "Flight search and booking run against Duffel's test environment. A live token is refused outright, so it can never buy a real ticket by accident.",
      "Policy answers are grounded in the company's policy document, not the model's memory.",
    ],
  },
  {
    slug: "corporate-travel-agent",
    title: "Corporate Travel Agent",
    short: "Travel Agent",
    when: "Jul 2026",
    oneLine:
      "Plans a business trip, checks it against company travel policy, and re-plans until it complies, citing the policy clause behind every choice.",
    stack: ["Python", "FastAPI", "Claude"],
    role: "Solo",
    status: "code",
    links: [{ label: "GitHub", href: "https://github.com/zCranking/Corporate-Travel-Agent" }],
    built: [
      "You type something like \"I need to be in São Paulo for the client QBR, Mar 3-5.\" The agent drafts an itinerary, pulls the relevant policy clauses, negotiated hotel rates, visa rules, and travel advisories, finds the conflicts, and re-plans. The trace shows every round. It ends with an approval memo and a safety brief for the traveler.",
      "It uses real data where it exists: State Department advisories, visa rules, an airport directory, and live exchange rates. It runs with no API key using a rule-based parser, or with Claude when a key is set.",
    ],
    hard: [
      "Some conflicts can't be planned away. If a visa takes longer than the time before the trip, no itinerary fixes that, so the agent escalates to a person instead of looping.",
      "There's no free flight-price API, so fares are modeled. I'd rather say that than fake it.",
    ],
    learned: [
      "I'd already built travel tools at TRN Global. The part that mattered this time wasn't booking travel, it was proving every choice followed the rules.",
    ],
    results: ["68 automated tests. Works offline end to end."],
  },
  {
    slug: "vex-robotics",
    title: "Warrior Robotics, VEX team 92008A",
    short: "VEX 92008A",
    when: "2024 – now",
    oneLine:
      "Founding member of my school's first VEX V5 team. I program the robot, coach the drive team, scout, and run the schedule.",
    stack: ["C++", "VEX V5"],
    role: "Founding member, programmer, drive coach, lead scout, project manager",
    links: [{ label: "VEX team page", href: "https://events.vex.com/teams/V5RC/92008A" }],
    built: [
      "Army and Navy Academy didn't have a robotics program before 2024. A few of us started one, and in its second season we won a regional outright.",
      "I write and test the code for our competition robot, both the autonomous routines and driver control, then coach the drive team from behind the field during matches. I scout other teams for alliance selection. As project manager I run weekly meetings, keep a master schedule, and track what the build, code, and drive groups owe each other before every competition.",
      "At JROTC events the robot is only part of it. Judges inspect the robot, read our engineering notebook, interview cadets on our reasoning, and run a skills challenge that scores autonomous programming and driver control separately.",
    ],
    hard: [
      "Latency. Even small delays in the code changed how the robot drove, and you feel it most in a close match.",
      "Making the final call under pressure: when a part fails between matches, someone has to decide what gets fixed, what gets cut, and still pass inspection.",
    ],
    learned: [
      "How much timing matters in anything that reacts to the real world. It's why I now read about faster vision models for robots.",
      "Running a team of cadets is a lot like running a battalion staff: most problems are coordination problems.",
    ],
    results: [
      "Undefeated at the 2026 Army JROTC San Diego Regional: Tournament Champion, Robot Skills Champion, and the Innovate Award.",
      "3rd in Robot Skills at the 2026 JROTC National Championship in Sandusky, Ohio.",
      "Competed at the VEX Robotics World Championship in 2025 (Dallas) and 2026 (St. Louis).",
    ],
    log: [
      { when: "2024–25", title: "Season one: High Stakes", detail: "Program founded. First robot, first notebook, first competitions." },
      {
        when: "May 2025",
        title: "JROTC National Championship at VEX Worlds, Dallas",
        detail: "Held inside the VEX Robotics World Championship at the Kay Bailey Hutchison Convention Center.",
      },
      { when: "2025–26", title: "Season two: Push Back" },
      {
        when: "Jan 2026",
        title: "Army JROTC San Diego Regional",
        detail:
          "Hosted by the 8th Brigade Army ROTC, 23 teams from across the Pacific. 7-0 in qualifying, swept the finals 4-0. Tournament Champion, Robot Skills Champion, and the Innovate Award, which recognizes design process, engineering documentation, and technical performance.",
      },
      { when: "Jan 2026", title: "JROTC National Championship, Sandusky, Ohio", detail: "3rd place in Robot Skills." },
      { when: "Apr 2026", title: "VEX Robotics World Championship, St. Louis" },
      { when: "2026–27", title: "Season three", detail: "In progress." },
    ],
    team: [
      "Coach: Col. Erick Kunak",
      "2025–26 roster: Cohen Lu (captain), Tyler Hansen, Ottmar Hung, Jincheng Wang, Nicolas Chestnut, Ziteng Chen, and me",
    ],
    sources: [
      {
        label: "Army and Navy Academy: Robotics team goes undefeated (Jan 2026)",
        href: "https://www.armyandnavyacademy.org/blog/army-and-navy-academy-robotics-team-goes-undefeated-earns-national-qualification-with-three-top-awards-at-san-diego-regional-jrotc-competition/",
      },
      { label: "North County Daily Star coverage", href: "https://northcountydailystar.com/?p=113154" },
      { label: "VEX Events: team 92008A", href: "https://events.vex.com/teams/V5RC/92008A" },
    ],
  },
  {
    slug: "battalion-commander",
    title: "Battalion Commander",
    when: "2026 – 27",
    oneLine: "Lead the Army and Navy Academy's JROTC battalion: 300+ cadets in grades 7 to 12.",
    role: "Cadet Battalion Commander",
    built: [
      "I work with the President, Commandant, and Senior Army Instructor, evaluate company commanders, run after-action reviews, and set the battalion's goals for the year.",
      "When our staff meetings kept ending without clear next steps, I redesigned how we run them and built a task tracker so every officer knew what they owned.",
    ],
    hard: [
      "I came in at fourteen as one of very few Indian students and some cadets made fun of me for it. Now I'm responsible for every new cadet who feels like they don't fit in.",
    ],
    learned: [
      "Noticing a problem doesn't fix it. Someone has to get people working on it. My job isn't to do everything myself, it's to help my cadets do their jobs well.",
    ],
    results: [
      "Silver A Award, the Academy's highest honor (one of four seniors).",
      "Before this: Charlie Company First Sergeant (one of six juniors chosen), Platoon Sergeant, and Color Guard Commander.",
    ],
    log: [
      { when: "9th grade", title: "Department of the Army Superior Cadet Decoration", detail: "Top junior cadet in the JROTC unit, awarded once a year per class." },
      { when: "10th grade", title: "Bronze Patrick Henry Medal", detail: "Military Order of the World Wars, for patriotic leadership." },
      { when: "11th grade", title: "First Sergeant, Charlie Company", detail: "One of six juniors chosen. 40+ cadets, morning PT and room inspections before school." },
      { when: "12th grade", title: "Battalion Commander", detail: "300+ cadets, grades 7 to 12." },
      { when: "12th grade", title: "Silver A Award", detail: "The Academy's highest honor, one of four seniors." },
    ],
  },
  {
    slug: "trn-global",
    title: "TRN Global, software engineering intern",
    short: "TRN Global",
    when: "Jul – Oct 2025",
    oneLine: "Built AI travel tools at a San Francisco travel company with 50+ employees.",
    stack: ["Python", "React", "TypeScript", "FastAPI", "OpenAI"],
    role: "Intern",
    built: [
      "Wrote scrapers that pulled flight, hotel, and activity data and turned it into itineraries, plus a React and TypeScript front end for an AI itinerary planner with a travel-personality quiz. I tested the code before handing it off for validation and use.",
    ],
    learned: [
      "My first time shipping code someone else depended on. It's also where my interest in travel agents started.",
    ],
  },
  {
    slug: "athira",
    title: "Athira, web development intern",
    short: "Athira",
    when: "Oct 2025 – Jan 2026",
    oneLine: "Front-end work at a remote AI startup building real-time avatars.",
    stack: ["React", "Next.js", "Vite", "Tailwind", "Stripe"],
    role: "Intern",
    built: [
      "Built interactive, multi-layered pages from Figma designs, including login and Stripe subscription flows and a hiring site with an admin dashboard for reviewing applicants, and worked between the backend and design teams through implementation and deployment.",
    ],
    learned: [
      "Matching a designer's Figma exactly is its own skill. So is being the person who makes sure backend and design mean the same thing.",
    ],
  },
];

export const detailed = projects.filter((p) => p.built);
export const bySlug = (slug: string) => projects.find((p) => p.slug === slug);
const pick = (slugs: string[]) => slugs.map((s) => bySlug(s)!);

export const groups = [
  {
    id: "built",
    title: "Things I've built",
    items: pick(["veritas", "prediction-market", "signal-to-ticket", "quant-strategies", "chronologix", "wayfare", "corporate-travel-agent"]),
  },
  { id: "lead", title: "Teams I lead", items: pick(["battalion-commander", "vex-robotics"]) },
  { id: "work", title: "Internships", items: pick(["athira", "trn-global"]) },
];

export const toolId = (t: string) => t.toLowerCase().replace(/\+/g, "p").replace(/[^a-z0-9]+/g, "-");

// The whole timeline, oldest first.
export const logbook: { when: string; items: { text: string; slug?: string }[] }[] = [
  { when: "Aug 2023", items: [{ text: "Started at Army and Navy Academy as a boarding student" }] },
  { when: "2023–24", items: [{ text: "Department of the Army Superior Cadet Decoration", slug: "battalion-commander" }] },
  {
    when: "2024–25",
    items: [
      { text: "Helped found Warrior Robotics, VEX team 92008A", slug: "vex-robotics" },
      { text: "Bronze Patrick Henry Medal", slug: "battalion-commander" },
    ],
  },
  {
    when: "May 2025",
    items: [
      { text: "JROTC National Championship at VEX Worlds, Dallas", slug: "vex-robotics" },
    ],
  },
  { when: "Jul 2025", items: [{ text: "Software engineering intern at TRN Global", slug: "trn-global" }] },
  { when: "Oct 2025", items: [{ text: "Web development intern at Athira", slug: "athira" }] },
  {
    when: "Jan 2026",
    items: [
      { text: "Undefeated at the Army JROTC San Diego Regional, three awards", slug: "vex-robotics" },
      { text: "3rd in Robot Skills at the JROTC National Championship in Sandusky, Ohio", slug: "vex-robotics" },
    ],
  },
  { when: "Apr 2026", items: [{ text: "VEX Robotics World Championship, St. Louis", slug: "vex-robotics" }] },
  {
    when: "Jun 2026",
    items: [
      { text: "California Boys State, then the election predictor", slug: "prediction-market" },
      { text: "Harvard Venture Tech Summer Program: quant backtests", slug: "quant-strategies" },
      { text: "Dual enrollment at MiraCosta College begins" },
    ],
  },
  {
    when: "Jul 2026",
    items: [
      { text: "Signal-to-Ticket", slug: "signal-to-ticket" },
      { text: "Corporate Travel Agent", slug: "corporate-travel-agent" },
      { text: "Veritas at the Abridge AI Healthcare Hackathon", slug: "veritas" },
      { text: "Chronologix", slug: "chronologix" },
      { text: "Wayfare", slug: "wayfare" },
    ],
  },
  {
    when: "Fall 2026",
    items: [
      { text: "Battalion Commander", slug: "battalion-commander" },
      { text: "Silver A Award and the Rising Star Award" },
      { text: "Advanced C++ at MiraCosta" },
    ],
  },
];

// Only the tools worth showing, grouped by what they're for. Which projects
// used each one is derived from the project stacks, never hand-kept.
const KEY_TOOLS: Record<string, string[]> = {
  Languages: ["Python", "TypeScript", "C++", "JavaScript"],
  "Web and APIs": ["Next.js", "React", "FastAPI", "Tailwind"],
  Data: ["Supabase", "Postgres", "pgvector", "pandas"],
  AI: ["Claude", "LangGraph", "ChromaDB", "Voyage"],
};

export const toolbox = Object.entries(KEY_TOOLS).map(([group, names]) => ({
  group,
  tools: names
    .map((name) => ({ name, projects: projects.filter((p) => p.stack?.includes(name)) }))
    .filter((t) => t.projects.length > 0),
}));
export const isKeyTool = (t: string) => Object.values(KEY_TOOLS).some((names) => names.includes(t));

export const honors = [
  { year: "12th", title: "Silver A Award", detail: "The Academy's highest honor, given to one of four seniors.", level: "School" },
  {
    year: "12th",
    title: "Rising Star Award",
    detail: "Carlsbad Chamber of Commerce. Recognized by the U.S. Congress, the California Legislature, and San Diego County.",
    level: "Regional",
  },
  {
    year: "11th",
    title: "3rd in Robot Skills, JROTC National Championship",
    detail: "In Sandusky, Ohio. Plus Tournament Champion, Skills Champion, and the Innovate Award at the Army JROTC San Diego Regional.",
    level: "National",
  },
  { year: "10th", title: "Bronze Patrick Henry Medal", detail: "Military Order of the World Wars, for patriotic leadership.", level: "Regional" },
  {
    year: "9th",
    title: "Department of the Army Superior Cadet Decoration",
    detail: "Top junior cadet in the JROTC unit, awarded once a year per class.",
    level: "National",
  },
  { year: "—", title: "NCO of the Grading Period", detail: "Selected through a test and an interview.", level: "School" },
];

export const education = [
  {
    school: "Army and Navy Academy",
    place: "Carlsbad, CA",
    when: "2023 – 2027",
    detail: "Boarding school. GPA 3.89 unweighted, 4.38 weighted. 8 APs, 4 honors, 4 dual-enrollment courses. AP U.S. History 4, AP Environmental Science 4.",
  },
  { school: "MiraCosta College", place: "Oceanside, CA", when: "2026", detail: "Dual enrollment: C++ programming." },
  { school: "Tarleton State University", place: "Stephenville, TX", when: "2026 – 2027", detail: "Dual enrollment." },
];

export const activities = [
  { title: "California Boys State, County Legal Counsel", detail: "Represented the county council in a mock state government and worked on an unemployment-prevention ordinance." },
  { title: "Harvard Model Congress", detail: "District Court." },
  { title: "Harvard Venture Tech Summer Program", detail: "Wrote and tested quantitative trading strategies in Python." },
  { title: "Honor Council", detail: "One of nine members. Heard academic integrity cases and recommended outcomes to the administration." },
  { title: "Interact Club, President", detail: "Weekly meetings with the Rotary Club of Carlsbad. Assembled school supply kits for kids in underprivileged areas." },
  { title: "ASB Secretary", detail: "School-wide events and the Red Cross blood drive." },
  { title: "Warrior Virtue Committee", detail: "Videos and talks for the student body, from mess hall etiquette to anti-drug policy." },
  { title: "Four sports", detail: "Football (JV and varsity), basketball (JV), varsity lacrosse, and varsity volleyball, where I played middle and we reached the school's first CIF Division V semifinal." },
  { title: "Boy Scouts", detail: "60+ volunteer hours, 2020 to 2025: trail cleanups, wildlife restoration, Eagle projects." },
];

// Verbatim from Arav's own essays. Don't edit these into someone else's voice.
export const fieldNotes = [
  {
    title: "Coffee",
    photo: "coffee",
    excerpt: "Every morning I make a pour-over, and I'm always changing the grind size or water temperature to see how the taste changes.",
    text: "I love coffee. Every morning I make a pour-over, and I'm always changing the grind size or water temperature to see how the taste changes. Every Friday morning, I have coffee with our school chef, Albert. We talk about the school, and he's taught me a lot about coffee in general. On weekends, I try different coffee shops around Carlsbad. My favorite is Steady State Roasters because of the pride they take in their coffee and their menu of different beans.",
  },
  {
    title: "The trail",
    photo: "trail",
    excerpt: "a lot of it isn't even marked, so you have to read the map yourself.",
    text: "I got into backpacking through Scouts, and the trips I remember most are the ones where we planned our own route and figured it out together. The Haute Route Pyrénées goes from the Atlantic to the Mediterranean, and a lot of it isn't even marked, so you have to read the map yourself. Before I leave for college, I want a few weeks on the trail with just the two of us, with nowhere else to be.",
  },
  {
    title: "My brother",
    excerpt: "he's the cheese pizza and I'm the pepperoni guy, he likes cakes and I like takis.",
    text: "We are twins and yet he's the cheese pizza and I'm the pepperoni guy, he likes cakes and I like takis.",
  },
  {
    title: "6 a.m.",
    excerpt: "once the test started, everyone was cheering each other on.",
    text: "Most cadets aren't happy to be up that early, but once the test started, everyone was cheering each other on. It reminded me of my freshman year, when someone introduced me to the gym and taught me how to train. Now I'm the one helping others.",
  },
];

// Excerpts must stay word-for-word pieces of the full quote. Fails the build if not.
for (const n of fieldNotes) if (!n.text.includes(n.excerpt)) throw new Error(`fieldNotes "${n.title}": excerpt is not verbatim`);
