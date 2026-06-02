import { Layout } from "@/components/Layout";
import { Printer } from "lucide-react";
import {
  ButtonLink,
  Button,
  Container,
  Eyebrow,
  Badge,
} from "@/components/site/primitives";

const contents = [
  { id: "abstract", label: "Abstract" },
  { id: "opportunity", label: "1. The opportunity" },
  { id: "problem", label: "2. The problem" },
  { id: "hammerhead", label: "3. Hammerhead" },
  { id: "config-studio", label: "4. Config Studio" },
  { id: "validation", label: "5. Validation and performance" },
  { id: "security", label: "6. Security and data locality" },
  { id: "moat", label: "7. Why Optimesh wins" },
  { id: "conclusion", label: "8. Conclusion" },
  { id: "references", label: "References" },
];

const references = [
  {
    n: 1,
    text: "ITIC, Hourly Cost of Downtime Survey, 2024.",
    url: "https://itic-corp.com/itic-2024-hourly-cost-of-downtime-report/",
  },
  {
    n: 2,
    text: "Uptime Institute, Annual Outage Analysis 2025 (press release).",
    url: "https://uptimeinstitute.com/about-ui/press-releases/uptime-announces-annual-outage-analysis-report-2025",
  },
  {
    n: 3,
    text: "Uptime Institute, Annual Outage Analysis 2025 (full report, reporting 2024 survey data).",
    url: "https://uptimeinstitute.com/resources/research-and-reports/annual-outage-analysis-2025",
  },
  {
    n: 4,
    text: "Meta Engineering, “More details about the October 4 outage,” 2021.",
    url: "https://engineering.fb.com/2021/10/05/networking-traffic/outage-details/",
  },
  {
    n: 5,
    text: "Fastly, “Summary of June 8 outage,” 2021.",
    url: "https://www.fastly.com/blog/summary-of-june-8-outage",
  },
  {
    n: 6,
    text: "Cloudflare, “Details of the Cloudflare outage on July 2, 2019.”",
    url: "https://blog.cloudflare.com/details-of-the-cloudflare-outage-on-july-2-2019/",
  },
  {
    n: 7,
    text: "MarketsandMarkets, Network Automation Market, 2025.",
    url: "https://www.marketsandmarkets.com/Market-Reports/network-automation-market-156261086.html",
  },
  {
    n: 8,
    text: "MarketsandMarkets, AIOps Platform Market.",
    url: "https://www.marketsandmarkets.com/Market-Reports/aiops-platform-market-251128836.html",
  },
  {
    n: 9,
    text: "MarketsandMarkets, Intent-Based Networking Market.",
    url: "https://www.marketsandmarkets.com/Market-Reports/intent-based-networking-ibn-market-16628271.html",
  },
];

export default function Whitepaper() {
  return (
    <Layout>
      {/* ---------------------------------------------------------------- Header */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-60" />
        <Container className="relative pb-12 pt-32 md:pt-40">
          <div className="mx-auto max-w-3xl">
            <Badge tone="primary">White paper</Badge>
            <h1 className="mt-6 text-balance text-4xl font-medium leading-[1.08] tracking-tight text-foreground sm:text-5xl">
              Offline Network Verification
            </h1>
            <p className="mt-5 text-pretty text-xl leading-relaxed text-muted-foreground">
              The network is the last untested layer of the software stack, and
              the most expensive one to get wrong. This paper explains how
              Optimesh Technologies reconstructs the forwarding plane from
              configuration, answers reachability questions in milliseconds, and
              proves a fix is safe before anyone applies it — and why that is a
              foundational, defensible market.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-muted-foreground">
              <span>Optimesh Technologies</span>
              <span aria-hidden>·</span>
              <span>Version 1.0</span>
              <span aria-hidden>·</span>
              <span>2026</span>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/early-access" variant="primary" size="md">
                Request access
              </ButtonLink>
              <Button
                variant="secondary"
                size="md"
                onClick={() => window.print()}
              >
                <Printer className="h-4 w-4" />
                Print or save as PDF
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------------- Contents */}
      <Container className="pb-4">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Contents
            </p>
            <ol className="mt-4 grid gap-2 sm:grid-cols-2">
              {contents.map((c) => (
                <li key={c.id}>
                  <a
                    href={`#${c.id}`}
                    className="text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>

      {/* ----------------------------------------------------------------- Body */}
      <Container className="pb-20">
        <article className="mx-auto max-w-3xl">
          <Section id="abstract" heading="Abstract">
            <P>
              Every major network in the world runs on configuration that no
              single person can fully reason about. It is edited by hand, one
              device at a time, and changed constantly — and the behavior that
              emerges from those edits is invisible until live traffic hits it.
              When it breaks, it breaks at the scale of the whole business. In
              2021 a single configuration change took Facebook, Instagram, and
              WhatsApp offline for roughly six hours; outages of that shape
              happen somewhere every week, and most never make the news.
            </P>
            <P>
              Optimesh Technologies makes the consequence of a network change
              knowable before it ships. Two products do the work. Hammerhead is
              an offline simulator that reconstructs the forwarding plane
              directly from device configuration and answers reachability
              questions analytically, in milliseconds. Config Studio builds on
              that engine to diagnose configuration faults and generate fixes
              that are proven safe before a human ever reviews them.
            </P>
            <P>
              For a network engineer, this is a forwarding-plane simulator
              accurate enough to trust and fast enough to run on every commit.
              For an investor, it is verification infrastructure for the one
              system every company depends on and almost no company can test.
              This paper makes both cases: how the systems work and the
              validation behind their accuracy, and why offline network
              verification is a large and defensible market.
            </P>
          </Section>

          <Section id="opportunity" heading="1. The opportunity">
            <P>
              Software teams spent the last twenty years building a safety net
              around code: version control, unit tests, staging environments,
              continuous integration that blocks a bad change before it merges.
              The network underneath that software got none of it. The most
              critical and most widely shared dependency in any company is still
              changed by hand, on live equipment, with the diff as the only
              review artifact — less automated checking than a typical CRUD app
              receives.
            </P>
            <P>
              The cost of that gap is enormous and already being paid. In ITIC's
              2024 survey, a single hour of downtime now exceeds $300,000 for
              more than 90 percent of mid-size and large enterprises, and 41
              percent put it between $1 million and $5 million an
              hour.<Cite n={1} /> Uptime Institute, the recognized authority on
              outage data, finds that 54 percent of operators' most recent
              significant outages cost more than $100,000, and one in five cost
              more than $1 million.<Cite n={3} />
            </P>
            <P>
              And the cause is rarely hardware. Uptime Institute reports that
              nearly 40 percent of organizations have suffered a major outage
              caused by human error in the past three years, and 85 percent of
              those trace to staff not following procedure or to flawed
              procedures themselves.<Cite n={2} /> Outages from IT and networking
              issues climbed to 23 percent of all impactful outages in 2024 — a
              rise Uptime attributes directly to rising complexity,
              change-management failures, and misconfiguration — and network
              issues are now the single largest cause of IT service
              outages.<Cite n={3} /> Eighty percent of operators say their most
              recent outage was preventable with better process or
              configuration.<Cite n={3} />
            </P>
            <Callout>
              The money is already on the table — it is simply spent reactively,
              on war rooms, rollbacks, and lost revenue, instead of on
              prevention. Optimesh moves that spend upstream: verification that
              runs on every change, before it ships.
            </Callout>
            <P>
              These are not edge cases. A single errant configuration command
              withdrew Facebook's BGP routes and took Facebook, Instagram, and
              WhatsApp offline globally for more than six hours in October
              2021.<Cite n={4} /> A valid customer configuration change triggered
              a latent bug at Fastly in June 2021 and returned errors across 85
              percent of its network within seconds.<Cite n={5} /> A single
              firewall-rule deployment cost Cloudflare 80 percent of its traffic
              in July 2019.<Cite n={6} /> In every case the trigger was a
              configuration change that no tool checked before it shipped.
            </P>
            <P>
              Three things make now the moment. First, networks have outgrown
              human reasoning: multi-cloud, hybrid, and EVPN/VXLAN fabrics
              interact in ways no engineer can trace by reading configuration.
              Second, AI can finally propose network fixes — but a proposed fix
              you cannot trust is worthless when a wrong change is an outage,
              which means the value is not in generation, it is in verification.
              Third, a modern Rust engine makes whole-fabric simulation cheap
              enough to run inline, on a laptop, on every commit — something the
              previous generation of server-bound tools could never do.
            </P>
          </Section>

          <Section id="problem" heading="2. The problem">
            <P>
              Network configuration determines how every packet is forwarded, but
              that behavior is emergent. It arises from the interaction of routing
              protocols, access policy, and topology across many devices. A
              single edit can change reachability several hops away in ways that
              are not visible in the diff. Reviewers cannot trace those effects by
              reading configuration, and testing against live devices only covers
              the specific paths an operator happens to probe.
            </P>
            <P>
              Existing analysis tools can reason about configuration, but they
              were built as heavyweight, server-bound systems. They are slow to
              start, depend on a managed runtime, and take long enough to run that
              teams reserve them for occasional audits rather than routine
              changes. The result is that the most critical system in most
              organizations is changed with less automated checking than a typical
              web application receives.
            </P>
            <P>
              Optimesh Technologies starts from a different premise. If verification is fast
              enough and light enough, it can run on every change, as a normal
              part of the workflow rather than a special event.
            </P>
          </Section>

          <Section id="hammerhead" heading="3. Hammerhead">
            <H3>3.1 Configuration parsing</H3>
            <P>
              Hammerhead ingests a directory of device configurations and detects
              each vendor dialect automatically, with no per-file flags. It
              covers every major network vendor in production today, and
              normalizes their configuration languages into a single internal
              model so that every later stage of the engine is fully
              vendor-independent.
            </P>

            <H3>3.2 Protocol simulation</H3>
            <P>
              From the parsed model, Hammerhead simulates control-plane
              convergence. It supports OSPFv2 and v3 with multi-area, stub, NSSA
              and virtual-link behavior, BGP-4 with route reflection,
              confederations, L3VPN and EVPN, plus EIGRP, IS-IS levels 1 and 2,
              and RIPv2. It also models data-plane constructs that affect
              forwarding, including MPLS L3VPN, VXLAN and EVPN overlays, GRE and
              IPSec tunnels, NAT in its static, dynamic and PAT forms, and layer-2
              behavior such as switchport trunking, spanning tree, and per-VLAN
              forwarding.
            </P>

            <H3>3.3 Forwarding-plane construction</H3>
            <P>
              The simulator resolves these protocols into routing tables and then
              into forwarding tables for every device. At that point Hammerhead
              has a complete model of how each device will forward a packet,
              without ever contacting a live device. Reachability and traceroute
              queries are answered against this model, including equal-cost
              multipath, tunnel resolution, and access-list evaluation along the
              path.
            </P>

            <H3>3.4 Query and analysis engine</H3>
            <P>
              Hammerhead exposes thirty-two subcommands that fall into a few
              groups:
            </P>
            <Ul
              items={[
                "Parse and simulate: build the RIB and FIB for a snapshot.",
                "Query: reachability, hop-by-hop traceroute, FIB and RIB inspection, and cross-device path joins.",
                "Analyze: diff the forwarding plane between two snapshots, detect loops, scan for single points of failure, and measure the blast radius of a link or device failure.",
                "Audit: evaluate access lists and check policy compliance.",
              ]}
            />
            <P>
              Beneath these queries is a symbolic engine that represents sets of
              packets using binary decision diagrams. Rather than testing one
              packet at a time, it reasons about entire equivalence classes of
              headers at once, which is what allows Hammerhead to make statements
              about all packets rather than a sample. The same machinery powers
              differential reachability analysis, which reports exactly how a
              configuration change alters what can reach what.
            </P>

            <H3>3.5 Policy and compliance</H3>
            <P>
              Operators can express intent as policy written in a small YAML
              language, covering reachability and non-reachability requirements,
              maximum hop counts, loop freedom, and path and protocol
              constraints, each with a severity level. Hammerhead ships templates
              aligned to common control frameworks so that posture can be checked
              on every run rather than reconstructed during an audit.
            </P>

            <H3>3.6 Interfaces</H3>
            <P>
              The same engine is available as a command-line tool, a Python SDK,
              and a REST API, and it slots into a continuous-integration pipeline
              so that a proposed change can be simulated and gated before it
              merges. A set of Jupyter notebooks covers common analysis tasks for
              teams that prefer an interactive workflow.
            </P>

            <H3>3.7 Engineering</H3>
            <P>
              Hammerhead is written entirely in safe Rust, with no unsafe code,
              and ships as a single static binary with no runtime dependency. Its
              output is deterministic: identical input always produces identical
              results, which is what makes a diff between two runs meaningful. The
              codebase carries more than 1,450 tests covering parsers, protocol
              convergence, and forwarding.
            </P>
          </Section>

          <Section id="config-studio" heading="4. Config Studio">
            <P>
              Config Studio uses Hammerhead as its verifier and adds an
              AI-driven workflow for diagnosing faults and repairing them. Its
              design principle is simple. A model may propose anything, but
              nothing reaches an operator until the forwarding-plane simulator has
              confirmed it is safe.
            </P>

            <H3>4.1 The four-stage pipeline</H3>
            <P>
              Every request flows through four stages in order:
            </P>
            <Ul
              items={[
                "Sanitize. Twenty-two always-on heuristics strip prompt-injection attempts that may be hidden in configuration comments, before any model sees the input.",
                "Diagnose. A model classifies the fault against a taxonomy of thirty-two classes and returns the fault type, the suspect device, a confidence score, and its reasoning.",
                "Patch. The model produces a minimal command-line change, the few lines an engineer would have typed, rather than rewriting the configuration.",
                "Verify. Hammerhead re-simulates the network with the proposed patch applied. Any change that drops reachability below the configured threshold is rejected before it is ever shown.",
              ]}
            />
            <P>
              Only patches that pass verification reach a human, and even then
              they are presented for explicit approval rather than applied
              automatically.
            </P>

            <H3>4.2 Surfaces</H3>
            <P>
              Config Studio offers two ways to work. The first is an interactive
              studio: a chat interface backed by fifteen network tools and an
              in-session configuration editor, for investigating a fabric and
              proposing edits. The second is an automated pull-request check: a
              webhook receiver that runs the full diagnose, patch, and verify
              pipeline on every change, posts a verdict, and can gate the merge.
              The full ledger of verifications can be exported as CSV or JSON.
            </P>

            <H3>4.3 Vendor and hardware coverage</H3>
            <P>
              Config Studio is hardware and vendor agnostic. The same engine
              diagnoses and patches every major network configuration language
              in production today. Heterogeneous fabrics, multi-vendor
              deployments, and air-gapped environments are first-class, not
              afterthoughts.
            </P>

            <H3>4.4 A digital twin of the network</H3>
            <P>
              Config Studio runs against a complete digital twin of the
              network's configured forwarding plane, reconstructed from the
              configuration files that determine how every packet moves. No
              agents on devices, no live telemetry collection, and no production
              risk. That is what lets it run offline, deterministically, and
              fast enough to gate every change before it ships.
            </P>
          </Section>

          <Section id="validation" heading="5. Validation and performance">
            <P>
              Accuracy claims are only useful if they are measured against
              something. Hammerhead is cross-checked against industry-standard
              analysis and against a live routing stack as ground truth. On a
              corpus of dozens of real-world topologies it matches the
              industry-standard reference at 99.93 percent forwarding-plane
              accuracy.
            </P>
            <P>
              Performance is the property that makes routine use practical. Across
              the same comparison, Hammerhead runs about 800 times faster than the
              industry standard on average.
              As a concrete example, it parses and simulates a 1,280-device
              large-scale data center topology of more than a thousand devices
              in about 279 milliseconds, end to end, on a single laptop-class
              host.
            </P>
            <P>
              For Config Studio, the two measures that matter to an operator
              are how accurately the system identifies the fault and how much
              faster the network is back to a known-good state. Across the
              supported fault taxonomy, the system reaches 99.6 percent
              diagnostic accuracy and roughly a 99 percent reduction in mean
              time to recovery compared to manual incident response. The AI
              pipeline itself returns a candidate fix in seconds; the remaining
              time is the human review and the controlled apply that any
              responsible operator wants in the loop.
            </P>
          </Section>

          <Section id="security" heading="6. Security and data locality">
            <P>
              Configuration is sensitive, so Optimesh Technologies is built to run where the
              configuration already lives. Hammerhead executes locally. Config
              Studio sends configuration only to the model an operator chooses,
              which can be a self-hosted model, and it is designed to run in
              air-gapped environments with no telemetry leaving the network.
            </P>
            <P>
              The implementation is hardened accordingly. The wrapper carries 304
              test assertions, reports zero known vulnerabilities under standard
              dependency scanning, pins its dependencies by hash, verifies
              webhooks with HMAC, and caps upload sizes to resist decompression
              attacks. The input sanitizer measurably reduces the success rate of
              prompt-injection attempts hidden in configuration text.
            </P>
          </Section>

          <Section id="moat" heading="7. Why Optimesh wins">
            <P>
              Speed and accuracy are features. The reason this becomes a large,
              durable company is that those features compound into a position
              competitors cannot easily take.
            </P>

            <H3>7.1 The wedge</H3>
            <P>
              Adoption starts with one engineer and a laptop. Hammerhead is a
              single static binary with no runtime, no agents on devices, and no
              data leaving the network, and it answers the question every
              engineer asks before every change: what will this actually do.
              There is nothing to procure and nothing to risk, which is how
              infrastructure tools get in — bottoms-up, one team at a time,
              before any platform decision is ever made.
            </P>

            <H3>7.2 The moat</H3>
            <P>
              Four barriers reinforce each other, and each one is hard to climb
              on its own:
            </P>
            <Ul
              items={[
                "Correctness. 99.93 percent forwarding-plane parity against ground truth, from a symbolic engine that reasons about every packet at once rather than sampling. Accuracy is the slow, hard part of this problem and the part a competitor cannot shortcut.",
                "Coverage. Every major vendor dialect and every major protocol, normalized into one model. Real networks are multi-vendor and heterogeneous, and that breadth is the highest wall for a new entrant to climb.",
                "Speed. 800 times faster than the prior standard, in safe Rust. Speed is what moves verification from an occasional audit to every single change — which is what turns the product into a daily habit instead of a quarterly chore.",
                "Data locality. Runs air-gapped, with no telemetry. That sells directly into the most security-conscious, best-funded buyers — finance, defense, telecom, healthcare — who will never send configuration to someone else's cloud.",
              ]}
            />

            <H3>7.3 Land and expand</H3>
            <P>
              Land with offline verification. Expand into automated diagnosis and
              repair with Config Studio, then into continuous policy and
              compliance — the system of record for whether the network is doing
              what it was told to do. Each step makes Optimesh the control point
              that every change flows through, and the control point is where
              durable value and pricing power live. Because verification runs in
              CI on every commit, usage grows with the customer's own change
              velocity: the faster they move, the more they rely on it.
            </P>
            <H3>7.4 A market measured in billions</H3>
            <P>
              The adjacent markets already validate the spend. Network automation
              is projected to grow from $7.88 billion in 2025 to $12.38 billion
              by 2030, a 9.4 percent compound annual growth rate.<Cite n={7} />
              AIOps platforms are forecast to reach $32.4 billion by 2028, up
              from $11.7 billion in 2023, growing at 22.7 percent
              annually.<Cite n={8} /> Intent-based networking — the category
              closest to verification — is growing at a 25.9 percent annual rate
              toward $2.6 billion by 2027.<Cite n={9} /> Optimesh sits at the
              intersection of all three: the verification layer that makes
              automation, AIOps, and intent-based networking safe to trust.
            </P>
            <Callout>
              Models can now write network changes. The scarce, defensible thing
              is the verifier that decides whether to trust them. Optimesh owns
              the verifier.
            </Callout>
          </Section>

          <Section id="conclusion" heading="8. Conclusion">
            <P>
              The common thread between the two products is a belief that
              verification belongs in the path of every change, not in an
              occasional audit. Hammerhead makes that economically possible by
              reconstructing the forwarding plane in milliseconds. Config Studio
              uses that speed to turn AI from a source of plausible suggestions
              into a source of verified ones. Together they let a team make
              network changes with the same confidence they already expect from
              their software — and they put Optimesh in the path of every one of
              those changes, on the one system the entire business runs on.
            </P>
            <div className="mt-10 flex flex-col items-start gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-pretty text-muted-foreground">
                Want to evaluate Optimesh Technologies against your own network?
              </p>
              <ButtonLink to="/early-access" variant="primary" size="md">
                Request access
              </ButtonLink>
            </div>
          </Section>

          <Section id="references" heading="References">
            <P>
              Market and outage figures cited above are drawn from independent
              third-party research. Uptime Institute's Annual Outage Analysis is
              the recognized authority on outage causation and cost; downtime-cost
              figures are from ITIC's annual survey; market-size figures are
              analyst estimates from MarketsandMarkets.
            </P>
            <ol className="mt-4 space-y-3">
              {references.map((r) => (
                <li
                  key={r.n}
                  id={`ref-${r.n}`}
                  className="scroll-mt-24 flex gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="font-mono text-xs text-muted-foreground/70">
                    [{r.n}]
                  </span>
                  <span>
                    {r.text}{" "}
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all text-primary underline-offset-2 hover:underline"
                    >
                      {r.url}
                    </a>
                  </span>
                </li>
              ))}
            </ol>
          </Section>
        </article>
      </Container>
    </Layout>
  );
}

/* ---------------------------------------------------------------- primitives */

function Section({
  id,
  heading,
  children,
}: {
  id: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border py-10 first:border-t-0 first:pt-0">
      <h2 className="text-2xl font-medium tracking-tight text-foreground">
        {heading}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-8 text-lg font-semibold tracking-tight text-foreground">
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 text-pretty text-[1.05rem] leading-[1.8] text-muted-foreground">
      {children}
    </p>
  );
}

function Cite({ n }: { n: number }) {
  return (
    <a
      href={`#ref-${n}`}
      aria-label={`Reference ${n}`}
      className="ml-0.5 align-super text-[0.65em] font-semibold text-primary hover:underline"
    >
      [{n}]
    </a>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-6">
      <p className="text-pretty text-[1.05rem] font-medium leading-[1.7] text-foreground">
        {children}
      </p>
    </div>
  );
}

function Ul({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 leading-relaxed">
          <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-success" />
          <span className="text-muted-foreground">{item}</span>
        </li>
      ))}
    </ul>
  );
}
