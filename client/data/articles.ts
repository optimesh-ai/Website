/**
 * Optimesh Insights — thought-leadership articles by the founders.
 * Body is structured as blocks so the renderer stays consistent with the design system.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "ul"; items: string[] };

export type AuthorKey = "chandler" | "vedu";

export interface Author {
  name: string;
  role: string;
  initials: string;
  linkedin: string;
  bio: string;
}

export const authors: Record<AuthorKey, Author> = {
  chandler: {
    name: "Chandler W. Stevenson",
    role: "CEO & Co-Founder · Princeton ECE PhD candidate",
    initials: "CS",
    linkedin: "https://www.linkedin.com/in/chandler-stevenson-717436202/",
    bio: "Chandler is a PhD candidate at Princeton (ECE) and an NSF GRFP Fellow whose research focuses on fast, sound verification of network forwarding behavior. He previously worked at SpaceX and Blue Origin.",
  },
  vedu: {
    name: "Vedu Mallela",
    role: "CTO & Co-Founder · formerly TikTok",
    initials: "VM",
    linkedin: "https://www.linkedin.com/in/vedu-mallela/",
    bio: "Vedu studied CS at Georgia Tech, did NLP research with MIT and Harvard collaborators, and built and operated systems at TikTok scale before co-founding Optimesh.",
  },
};

export interface Article {
  slug: string;
  title: string;
  deck: string;
  author: AuthorKey;
  date: string; // ISO yyyy-mm-dd
  readingMinutes: number;
  tags: string[];
  body: Block[];
}

export const articles: Article[] = [
  {
    slug: "verifiable-contract-for-every-network-change",
    title: "Toward a Verifiable Contract for Every Network Change",
    deck: "Software learned to ship changes with tests and types attached. Networks deserve the same — every change carrying a machine-checkable proof that it preserves what matters.",
    author: "chandler",
    date: "2026-05-12",
    readingMinutes: 6,
    tags: ["Research", "Formal verification", "Vision"],
    body: [
      {
        type: "p",
        text: "I want to describe the future I am building toward, because it clarifies almost everything we do at Optimesh: a world of proof-carrying network changes, where no change reaches a production fabric without evidence that it preserves the properties the network is supposed to have.",
      },
      { type: "h2", text: "A change is a hypothesis" },
      {
        type: "p",
        text: "Today, a configuration diff is an assertion of intent with no attached evidence. An engineer believes the change is correct, a colleague skims the diff, and it ships. We have accepted, as an industry, that the test for a network change is production itself. In no other part of modern infrastructure would we tolerate that.",
      },
      {
        type: "p",
        text: "The reframing I find useful is to treat every change as a hypothesis that carries an obligation: prove that, after this edit, the network still satisfies a set of stated invariants. The change is not done when it is written. It is done when it is verified.",
      },
      { type: "h2", text: "Invariants as the interface" },
      {
        type: "p",
        text: "What would those invariants be? They are the things operators already care about but rarely write down formally:",
      },
      {
        type: "ul",
        items: [
          "Reachability contracts — these endpoints must reach each other; these must not.",
          "Isolation and segmentation — tenants, zones, and PCI boundaries stay separate.",
          "Absence of transient loops and blackholes under expected failures.",
          "Bounded blast radius — no single change or link failure partitions the fabric.",
          "Policy and compliance posture — the controls an auditor will ask about, checked continuously.",
        ],
      },
      {
        type: "p",
        text: "Taken together, these are something like a type system for a network. And once you have a type system, a change either type-checks or it does not.",
      },
      {
        type: "quote",
        text: "The unit of trust shouldn't be the engineer who wrote the change. It should be the proof that travels with it.",
      },
      { type: "h2", text: "Why this is suddenly possible" },
      {
        type: "p",
        text: "Two forces are converging. The first is that AI is generating more changes, faster, than human review can absorb — so the old safeguard of careful manual inspection is quietly breaking. The second is that verification has finally become fast enough to run inline, at the latency of a linter rather than a quarterly audit. The missing ingredient was never the math; it was speed. Sound verification you can run on every change is what turns a guarantee from an academic luxury into an operational habit. That is the core of my research, and it is what we built into Hammerhead.",
      },
      { type: "h2", text: "The frontier" },
      {
        type: "p",
        text: "This agenda is far from finished, which is exactly why it excites me. The open problems are real: scaling symbolic reachability to internet-scale forwarding tables, verifying stateful and dynamic behavior rather than a static snapshot, composing proofs across administrative domains that do not trust each other, and turning counterexamples into something an on-call engineer can act on at 3 a.m. These are rich academic questions with immediate industrial pull — the rare case where the research frontier and the product roadmap point in the same direction.",
      },
      {
        type: "p",
        text: "I think we will look back on push-and-pray the way we look back on writing code without version control: a phase we survived, not a practice we defend. The change that cannot prove itself will simply not ship. We are building the layer that makes that normal.",
      },
    ],
  },
  {
    slug: "real-cost-of-a-bad-push",
    title: "The Real Cost of a Bad Push",
    deck: "An outage isn't a line on a status page. It's revenue, trust, and a very long night — and the math makes network verification one of the easiest decisions in infrastructure.",
    author: "vedu",
    date: "2026-03-18",
    readingMinutes: 5,
    tags: ["Industry", "Operations", "Economics"],
    body: [
      {
        type: "p",
        text: "If you have operated a large network, you know the shape of a bad day. A routine change goes out, dashboards stay green for ninety seconds, and then a region falls off the map. The cost of that moment is not the engineering hour it takes to revert. It is everything that happens in between.",
      },
      { type: "h2", text: "The cost is nonlinear" },
      {
        type: "p",
        text: "At small scale, an outage is an annoyance. At scale, the cost curve bends sharply: lost transactions, SLA penalties, support load, and the slow, expensive erosion of trust that does not show up on any one quarter's books. When a single config push can touch traffic for hundreds of millions of people, the asymmetry between the effort to make a change and the damage it can do is staggering.",
      },
      { type: "h2", text: "You don't pay for the fix — you pay for the find" },
      {
        type: "p",
        text: "Here is the part outsiders underestimate: most of your mean-time-to-recovery is diagnosis, not repair. The change that broke things usually looks obviously fine in the diff. So the team ends up bisecting configurations across a fabric, hop by hop, under pressure, while the clock runs. The fix is one line. Finding the line is the night.",
      },
      {
        type: "quote",
        text: "Nobody budgets for the outage they didn't have. That's exactly why verification has been underfunded — and exactly why that's about to flip.",
      },
      { type: "h2", text: "Prevention is absurdly cheap by comparison" },
      {
        type: "p",
        text: "Catching a bad change before it merges costs milliseconds of compute. Catching it in production costs an incident bridge, a postmortem, and a dent in customer trust. Framed as a trade, it is not close — you are exchanging a rare, catastrophic, unbudgeted cost for a constant, tiny, predictable one. Finance teams understand that trade instantly once you put it in those terms.",
      },
      { type: "h2", text: "CI for networks is the unlock" },
      {
        type: "p",
        text: "The reason we never did this before is that verification used to be slow and heavy, so it lived outside the workflow. When it becomes fast and scriptable, it moves into the pipeline: every proposed change to the network gets a reachability and segmentation check before a human approves it, the same way every code change gets a test run. That is the whole game.",
      },
      {
        type: "p",
        text: "I increasingly think the push for this will not come only from network engineering. It will come from finance and security, who are tired of writing checks for preventable downtime and signing off on changes nobody could prove were safe. Verifiable change is quietly becoming an uptime and compliance requirement, not a nice-to-have.",
      },
    ],
  },
  {
    slug: "ai-is-about-to-write-your-network",
    title: "AI Is About to Write Your Network. Who Checks Its Work?",
    deck: "Every infra team I talk to is piloting an LLM to draft configs and triage incidents. Almost none of them have an answer for what happens when it's confidently wrong.",
    author: "vedu",
    date: "2026-01-15",
    readingMinutes: 5,
    tags: ["Industry", "AI", "Product"],
    body: [
      {
        type: "p",
        text: "Spend a week talking to enterprise infrastructure teams right now and you will hear the same thing over and over: they are wiring a language model into their network operations. Drafting configs, summarizing diffs, explaining why a route disappeared. The pilots are everywhere, and the productivity is genuinely real.",
      },
      { type: "h2", text: "The upside is not the question" },
      {
        type: "p",
        text: "I am not here to be a skeptic about AI in netops. A model that can draft a BGP policy from a plain-English description, or explain a tangle of route-maps to a junior engineer, removes real friction. Adoption will be fast precisely because the pain it addresses is so familiar. That part is settled.",
      },
      { type: "h2", text: "Plausibility is not correctness" },
      {
        type: "p",
        text: "The failure mode is what keeps me up. A language model will happily produce a configuration that is fluent, well-commented, confident — and subtly wrong in a way that breaks segmentation or blackholes a prefix three hops away. It will then explain its reasoning persuasively. The output looks exactly as trustworthy when it is right as when it is catastrophically wrong. Human reviewers are not calibrated to catch that, because the mistake is not in the line that changed.",
      },
      {
        type: "quote",
        text: "In two years, did a model verify this change? will be a line item in every change-management process and every audit.",
      },
      { type: "h2", text: "You don't slow the model down — you verify it" },
      {
        type: "p",
        text: "The enterprise answer is not to ban the copilot. It is the same pattern software already learned: let the model generate freely, but gate its output behind an automated check that does not care how confident the author was. For code, that gate is tests and types. For networks, it is a forwarding-plane verifier that can prove the change preserves reachability and isolation before anyone applies it.",
      },
      { type: "h2", text: "What buyers will actually demand" },
      {
        type: "p",
        text: "From the conversations I am having, three requirements are hardening into table stakes:",
      },
      {
        type: "ul",
        items: [
          "Provenance and verification — who or what proposed this change, and what proved it safe.",
          "On-prem execution — configurations are crown-jewel data and are not leaving the building.",
          "Determinism — auditors and incident reviewers do not accept the AI said so as a control.",
        ],
      },
      {
        type: "p",
        text: "The winners in AI-driven network operations will not be whoever ships the biggest model. They will be whoever pairs generation with a verifier the enterprise can actually trust. That is the bet we are making.",
      },
    ],
  },
  {
    slug: "simulate-the-forwarding-plane",
    title: "Why We Simulate the Forwarding Plane Instead of Probing It",
    deck: "Monitoring tells you what your network is doing right now. Verification tells you what it will do for every packet you haven't sent yet. The difference is everything.",
    author: "chandler",
    date: "2025-12-04",
    readingMinutes: 6,
    tags: ["Research", "Verification", "Technical"],
    body: [
      {
        type: "p",
        text: "There is a distinction at the heart of our approach that is easy to miss and, once seen, is hard to unsee: the difference between observing a network and reasoning about it. Most of the tooling our industry has built does the former. We are investing in the latter.",
      },
      { type: "h2", text: "Probing samples; verification covers" },
      {
        type: "p",
        text: "Pings, traceroutes, and synthetic probes test the specific paths you happen to try. But the space of possible packets — every source, destination, port, and header combination — is astronomically large. Sampling cannot cover it. And the failures that matter, whether a misconfiguration or an adversary, tend to live in exactly the part of that space you did not think to sample. Testing the paths you imagined is not the same as knowing the network is correct.",
      },
      { type: "h2", text: "The configuration already contains the answer" },
      {
        type: "p",
        text: "You do not actually need a live device to know how it will forward a packet. The configuration, together with the topology and the protocols in play, determines the routing and forwarding tables. If you faithfully reconstruct the forwarding plane from those inputs, you can answer reachability questions for all packets at once — analytically, rather than one probe at a time.",
      },
      { type: "h2", text: "Reasoning about sets of packets" },
      {
        type: "p",
        text: "This is where formal methods meet networking, and where my research sits. Instead of reasoning about individual packets, we reason about equivalence classes of them — sets of headers that the network treats identically — using symbolic representations such as binary decision diagrams. That lets us compute reachability over the entire packet space and answer questions like whether any packet can cross from one zone into another, not merely whether the ten we tested could.",
      },
      {
        type: "quote",
        text: "If you can only check the packets you thought to send, you're testing your imagination, not your network.",
      },
      { type: "h2", text: "Offline, deterministic, repeatable" },
      {
        type: "p",
        text: "Working from a model rather than a live device buys you three things that live probing cannot: determinism, so the same input always yields the same answer; differential analysis, so you can diff two snapshots and see exactly what a change did to the forwarding plane; and the ability to ask about hypotheticals — what happens if this link fails — without breaking anything to find out.",
      },
      {
        type: "p",
        text: "None of this is an argument against monitoring. Monitoring watches the present and is irreplaceable for it. Verification guarantees the future. They are complements, and our industry has spent twenty years building one of them and skipping the other. We are building the half that got skipped.",
      },
    ],
  },
  {
    slug: "holding-my-breath",
    title: "I Spent Years Pushing Config Changes and Holding My Breath",
    deck: "Every network engineer knows the feeling: you hit enter on a change you're 95% sure about, and you watch the dashboards. We've quietly normalized something insane.",
    author: "vedu",
    date: "2025-11-06",
    readingMinutes: 5,
    tags: ["Industry", "Operations", "Culture"],
    body: [
      {
        type: "p",
        text: "It is 2 a.m. The maintenance window opened ten minutes ago. The change is one line — a BGP neighbor adjustment you have made a hundred times. You stage it, take a breath, and hit enter. Then you sit and watch the dashboards, because the truth is you do not actually know what just happened. If you have run a large network, you know exactly the feeling I am describing.",
      },
      { type: "h2", text: "The dirty secret of network operations" },
      {
        type: "p",
        text: "We test software relentlessly. Unit tests, integration tests, CI that blocks a merge over a failing assertion on a button color. And then we ship changes to the network those applications run on based on intuition and a peer skimming a diff. The test plan for the most critical system in the building is, functionally, production traffic.",
      },
      { type: "h2", text: "Why we under-verify" },
      {
        type: "p",
        text: "It is not that network engineers are reckless. It is that the tools meant to give us confidence were too slow and too heavy to fit into the moment when we needed them. Nobody is going to spin up a model and wait several minutes to validate a routine change during a narrow window at 2 a.m. So we leaned on runbooks, muscle memory, and hope.",
      },
      { type: "h2", text: "Review doesn't catch what matters" },
      {
        type: "p",
        text: "And peer review, the safeguard we lean on hardest, is weakest exactly where it counts. A human reading a CLI diff cannot trace reachability across a fabric in their head. The change looks fine because the bug is not in the line you changed — it is an emergent consequence three hops away, in the interaction between this edit and a policy someone wrote two years ago.",
      },
      {
        type: "quote",
        text: "We had better CI for our website's CSS than for the network the entire product ran on.",
      },
      { type: "h2", text: "What changed my mind" },
      {
        type: "p",
        text: "The thing that flipped my thinking was watching what happens when verification gets fast enough to run on every change — seconds, not a meeting. The culture changes with it. A change earns a green check before it merges instead of a postmortem after it breaks. The dread goes away, not because you got braver, but because you finally have a real answer to what will this do.",
      },
      {
        type: "p",
        text: "This is the same transition software went through fifteen years ago, when continuous integration stopped being exotic and became table stakes. Networks are one of the last critical systems still operated without that safety net. Having lived the 2 a.m. version, I am very motivated to be part of ending it.",
      },
    ],
  },
  {
    slug: "verification-missing-layer-ai-native-network",
    title: "Verification Is the Missing Layer in the AI-Native Network",
    deck: "As AI moves from suggesting network changes to making them, the question is no longer whether a model is clever enough. It's whether we can prove it's safe.",
    author: "chandler",
    date: "2025-10-09",
    readingMinutes: 5,
    tags: ["Research", "AI", "Vision"],
    body: [
      {
        type: "p",
        text: "Networks have always been governed by human judgment, encoded into configuration one line at a time. We are now entering an era in which models propose those changes, and increasingly execute them. This is genuinely exciting. It is also arriving faster than the trust model we have to govern it.",
      },
      { type: "h2", text: "We automated the wrong half first" },
      {
        type: "p",
        text: "For a decade, automation in networking has mostly meant pushing changes faster — controllers, infrastructure-as-code, orchestration. We optimized the actuator. We did not, to nearly the same degree, optimize the check. The result is a system that can now make mistakes at machine speed and machine scale, which is not obviously progress.",
      },
      { type: "h2", text: "Usually right is not a guarantee" },
      {
        type: "p",
        text: "Machine-learning approaches to network operations optimize for average-case correctness. But networks fail in the tail. A change that is fine ninety-nine percent of the time can still blackhole a region or breach an isolation boundary the other one percent. Probabilistic confidence from a model is simply a different kind of object than a guarantee about reachability, and conflating the two is how you get confident outages.",
      },
      { type: "h2", text: "Verification as the trust substrate" },
      {
        type: "p",
        text: "The discipline I borrow from is formal methods and programming languages, where there is a well-worn principle: do not trust the generator, check the artifact. A compiler can be wildly sophisticated; the type checker that vets its output does not have to trust any of that sophistication. A verifier that can deterministically answer whether a configuration preserves a set of invariants is what lets us safely hand more authority to automation.",
      },
      {
        type: "quote",
        text: "Autonomy in networking will be bounded by what we can verify, not by what we can generate.",
      },
      { type: "h2", text: "The research bet" },
      {
        type: "p",
        text: "My work at Princeton is on making this verification both sound and fast enough to sit directly in the path of change. The distinction matters enormously. If verification is slow, it degrades into a quarterly audit that catches problems long after they ship. If it runs in milliseconds, it becomes a guardrail on every single change — and that, I am convinced, is the actual unlock for AI-native networking.",
      },
      {
        type: "p",
        text: "So we are not really building a smarter autopilot. Plenty of people are building that. We are building the instrument that tells the autopilot the truth — the layer that makes it safe to let the rest of the stack get as autonomous as it wants to be.",
      },
    ],
  },
];

export function getSortedArticles(): Article[] {
  return [...articles].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${months[m - 1]} ${d}, ${y}`;
}
