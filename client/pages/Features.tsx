import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Network,
  Route,
  GitCompare,
  Radar,
  ShieldCheck,
  Sparkles,
  Plug,
  Lock,
  Gauge,
  TerminalSquare,
  Repeat,
  ServerCog,
} from "lucide-react";
import {
  ButtonLink,
  ArrowLink,
  Container,
  Section,
  SectionHeading,
  Eyebrow,
  Badge,
  CodeBlock,
} from "@/components/site/primitives";

const capabilities = [
  {
    icon: <Network className="h-5 w-5" />,
    title: "Forwarding-plane simulation",
    body: "Parse 14 vendor dialects, converge OSPF, BGP, IS-IS, EIGRP and RIP, and build the full FIB for your fabric in milliseconds.",
  },
  {
    icon: <Route className="h-5 w-5" />,
    title: "Reachability & path analysis",
    body: "Ask whether one host can reach another and get the exact hops back — including ECMP, MPLS, VXLAN, EVPN, GRE, IPSec and NAT.",
  },
  {
    icon: <GitCompare className="h-5 w-5" />,
    title: "Change diffing",
    body: "Compare the forwarding plane before and after a proposed config edit to see precisely what a change does — not what you hoped it would.",
  },
  {
    icon: <Radar className="h-5 w-5" />,
    title: "Failure & blast-radius analysis",
    body: "Pull a link or a device in simulation and measure the impact before it happens in production, so surprises stay offline.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Policy & compliance verification",
    body: "Express intent as checks and verify reachability and segmentation against CIS, PCI and SOC 2 controls on every run.",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "AI diagnosis & verified remediation",
    body: "Diagnose against a 32-class fault taxonomy, draft a minimal CLI patch, and re-simulate to prove it before a human approves it.",
  },
  {
    icon: <Plug className="h-5 w-5" />,
    title: "Integrations",
    body: "A CLI, a Python SDK, a REST API, a CI integration and Jupyter, so the platform drops into the toolchain your team already runs.",
  },
  {
    icon: <Lock className="h-5 w-5" />,
    title: "Security & determinism",
    body: "A single static binary with deterministic output, on-prem and air-gap ready. Memory-safe by construction, no telemetry, no servers to babysit.",
  },
];

const principles = [
  {
    icon: <TerminalSquare className="h-5 w-5" />,
    title: "Offline by design",
    body: "Everything runs against a directory of configs. No live device, no read-only credentials, no production risk to validate a change.",
  },
  {
    icon: <Gauge className="h-5 w-5" />,
    title: "Fast enough for CI",
    body: "Whole-fabric simulation in milliseconds — 345× faster than the industry standard — so validation runs on every commit, not once a quarter.",
  },
  {
    icon: <Repeat className="h-5 w-5" />,
    title: "Deterministic & proven",
    body: "Same configs, same answer, every time. Cross-validated against industry-standard analysis at 99.93% accuracy, with reproducible results across runs.",
  },
  {
    icon: <ServerCog className="h-5 w-5" />,
    title: "Yours to run",
    body: "Deploy on-prem or air-gapped. Configs stay on your hardware, zero CVEs, HMAC-signed — nothing ever phones home.",
  },
];

export default function Features() {
  return (
    <Layout>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-70" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

        <Container className="relative pb-20 pt-32 md:pb-28 md:pt-40">
          <div className="max-w-3xl">
            <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
              <Eyebrow>The platform</Eyebrow>
            </div>

            <h1
              className="animate-fade-up mt-5 text-balance text-[2.6rem] font-medium leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-[4rem]"
              style={{ animationDelay: "80ms" }}
            >
              One source of truth for how your network behaves.
            </h1>

            <p
              className="animate-fade-up mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground"
              style={{ animationDelay: "160ms" }}
            >
              Optimesh Technologies is offline network intelligence: simulate the forwarding
              plane across your whole fabric, see exactly what a config change
              will do, and ship verified fixes — all without touching a live
              device. Two products, one engine, one answer you can trust.
            </p>

            <div
              className="animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "240ms" }}
            >
              <ButtonLink to="/early-access" variant="primary" size="lg">
                Request access
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </ButtonLink>
              <ButtonLink to="/products/hammerhead" variant="secondary" size="lg">
                Explore Hammerhead
              </ButtonLink>
            </div>

            <div
              className="animate-fade-up mt-8 flex flex-wrap gap-2.5"
              style={{ animationDelay: "320ms" }}
            >
              <Badge tone="primary">14 vendor parsers</Badge>
              <Badge tone="primary">CLI · SDK · REST · CI</Badge>
              <Badge tone="success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                On-prem & air-gap ready
              </Badge>
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------- Capabilities */}
      <section className="border-y border-border bg-card">
        <Container className="py-20 md:py-28">
          <SectionHeading
            eyebrow="What the platform does"
            title="A complete picture of your forwarding plane."
            description="From low-level simulation to AI-driven remediation, every capability builds on the same deterministic engine — so the answers always agree."
          />
          <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c, i) => (
              <div
                key={c.title}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {c.icon}
                </span>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ----------------------------------------------------------- Products */}
      <Section>
        <SectionHeading
          eyebrow="Two products, one engine"
          title="Simulation you can build on. Remediation you can trust."
          description="Hammerhead is the offline simulator that models how packets move. Config Studio puts that engine to work — diagnosing faults and proving every fix safe before it ever reaches you."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <ProductCard
            icon={<Gauge className="h-5 w-5" />}
            name="Hammerhead"
            tagline="Offline forwarding-plane simulator"
            description="Drop your configs in a directory and ask what a change will do. Hammerhead parses 14 vendor dialects, simulates OSPF, BGP, IS-IS and more, and answers reachability and traceroute queries in milliseconds — as a single static binary."
            points={[
              "345× faster than the industry standard, 99.93% FIB parity",
              "Memory-safe by construction, deterministic, audit-ready",
              "CLI, Python SDK, REST API, CI integration & Jupyter",
            ]}
            to="/products/hammerhead"
          />
          <ProductCard
            icon={<ShieldCheck className="h-5 w-5" />}
            name="Config Studio"
            tagline="AI diagnosis & verified remediation"
            description="When a config breaks, Config Studio runs a four-stage pipeline — sanitize, diagnose, patch, verify — re-simulating each fix in Hammerhead and rejecting anything that drops reachability below 99%, all before a human approves it."
            points={[
              "99.6% diagnostic accuracy, time-to-fix under 10 seconds",
              "Minimal CLI diffs, verified against a 32-class taxonomy",
              "On-prem & air-gap, 0 CVEs, HMAC-signed, no telemetry",
            ]}
            to="/products/config-studio"
          />
        </div>
      </Section>

      {/* --------------------------------------------------- Integrations / loop */}
      <section className="border-t border-border bg-card">
        <Container className="py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Integrations & workflow"
                title="Meets your network where it already lives."
                description="The same engine ships as a CLI, a Python SDK, a REST API, a CI integration and a Jupyter kernel. Gate risky pull requests automatically or explore your fabric interactively, with no live device required."
              />
              <ul className="mt-8 space-y-3">
                {[
                  "Gate pull requests: simulate the diff and block merges that break reachability.",
                  "Script it: query reachability and paths from Python or any REST client.",
                  "Explore it: drive the engine from a Jupyter notebook for ad-hoc analysis.",
                ].map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2.5 text-sm text-foreground/80"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-success" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <ArrowLink to="/products/config-studio">
                  See PR gating in Config Studio
                </ArrowLink>
              </div>
            </div>

            <CodeBlock
              title="ci · pull-request gate"
              lines={[
                { prompt: "$", text: "hammerhead simulate ./configs --diff HEAD~1" },
                { text: "parsed 1,280 devices · 14 vendors", muted: true },
                { text: "reachability delta: 3 paths changed", muted: true },
                { text: "" },
                { prompt: "$", text: "config-studio verify --min-reachability 0.99" },
                { text: "patch re-simulated against Hammerhead", muted: true },
                { text: "PASS  reachability 99.4%  ·  no regressions" },
                { text: "gate: approved for review", muted: true },
              ]}
            />
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------- Where it fits */}
      <Section>
        <SectionHeading
          eyebrow="Where it fits"
          title="Built on principles network teams can stand behind."
          align="center"
          className="mx-auto"
        />
        <div className="mx-auto mt-14 grid max-w-5xl gap-x-10 gap-y-12 sm:grid-cols-2">
          {principles.map((p) => (
            <div key={p.title} className="flex gap-4">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-primary/10 text-primary">
                {p.icon}
              </span>
              <div>
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-12 max-w-2xl text-pretty text-center text-sm leading-relaxed text-muted-foreground">
          Optimesh Technologies analyzes configuration, not live telemetry — it is not a
          real-time digital twin. That is exactly what lets it run offline,
          deterministically, and fast enough to gate every change.
        </p>
      </Section>

      {/* --------------------------------------------------------------- CTA */}
      <Section className="pb-28">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-foreground px-8 py-16 text-center md:px-16 md:py-20">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.07]" />
          <div className="relative mx-auto max-w-2xl">
            <Eyebrow className="!text-background/70">Early access</Eyebrow>
            <h2 className="mt-4 text-balance text-3xl font-medium tracking-tight text-background sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
              See the whole platform on your own network.
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-background/70">
              We're working with a small group of network teams who want
              certainty before they ship. If that's you, let's talk.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink
                to="/early-access"
                size="lg"
                className="bg-background text-foreground hover:bg-background/90"
              >
                Request early access
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </ButtonLink>
              <Link
                to="/contact"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-background/25 px-6 text-[0.95rem] font-medium text-background transition-colors hover:bg-background/10"
              >
                Talk to the team
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}

function ProductCard({
  icon,
  name,
  tagline,
  description,
  points,
  to,
}: {
  icon: React.ReactNode;
  name: string;
  tagline: string;
  description: string;
  points: string[];
  to: string;
}) {
  return (
    <Link
      to={to}
      className="group flex flex-col rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </span>
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-foreground">
            {name}
          </h3>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {tagline}
          </p>
        </div>
      </div>
      <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
        {description}
      </p>
      <ul className="mt-6 space-y-2.5">
        {points.map((p) => (
          <li
            key={p}
            className="flex items-start gap-2.5 text-sm text-foreground/80"
          >
            <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-success" />
            {p}
          </li>
        ))}
      </ul>
      <span className="mt-7 inline-flex items-center gap-1.5 font-medium text-primary">
        Learn more
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
