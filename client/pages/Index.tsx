import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  GitPullRequest,
  Gauge,
  ShieldCheck,
  TerminalSquare,
  Network,
  CircuitBoard,
} from "lucide-react";
import {
  ButtonLink,
  ArrowLink,
  Container,
  Section,
  SectionHeading,
  Eyebrow,
  Stat,
  Badge,
  CodeBlock,
} from "@/components/site/primitives";

const vendors = [
  "Cisco IOS",
  "NX-OS",
  "IOS-XR",
  "Cisco ASA",
  "Arista EOS",
  "Juniper Junos",
  "Cumulus / FRR",
  "FortiOS",
  "PAN-OS",
  "SONiC",
  "F5 BIG-IP",
  "A10 ACOS",
  "Check Point Gaia",
  "Linux iptables",
];

export default function Index() {
  return (
    <Layout>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-70" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

        <Container className="relative pb-20 pt-32 md:pb-28 md:pt-40">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div
                className="animate-fade-up"
                style={{ animationDelay: "0ms" }}
              >
                <Badge tone="primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Now in early access
                </Badge>
              </div>

              <h1
                className="animate-fade-up mt-6 text-balance text-[2.6rem] font-medium leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-[4.1rem]"
                style={{ animationDelay: "80ms" }}
              >
                Validate every network change before it ships.
              </h1>

              <p
                className="animate-fade-up mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
                style={{ animationDelay: "160ms" }}
              >
                Optimesh builds offline intelligence for network
                infrastructure. Simulate the forwarding plane across 14 vendors,
                find what a config change will actually do, and ship verified
                fixes — without touching a live device.
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
                  Explore the platform
                </ButtonLink>
              </div>

              <p
                className="animate-fade-up mt-8 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground"
                style={{ animationDelay: "320ms" }}
              >
                Built by infrastructure experts, for the networks that power the
                world.
              </p>
            </div>

            <div
              className="animate-fade-up lg:justify-self-end"
              style={{ animationDelay: "260ms" }}
            >
              <CodeBlock
                title="hammerhead"
                className="w-full max-w-lg"
                lines={[
                  { prompt: "$", text: "hammerhead simulate ./configs" },
                  { text: "parsed 1,280 devices · 14 vendors", muted: true },
                  { text: "built FIB · 798,720 routes · 279ms", muted: true },
                  { prompt: "$", text: "hammerhead reachability \\" },
                  { text: "    --from edge-1 --to db-core", muted: true },
                  { text: "" },
                  { text: "REACHABLE  via 4 hops  (ECMP ×2)" },
                  { text: "verified against 52 datasets · 99.93%", muted: true },
                ]}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------------- Stat band */}
      <section className="border-y border-border bg-card">
        <Container className="py-12">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            <Stat value="345×" label="Faster than Batfish" sub="1,640× at peak" />
            <Stat value="99.93%" label="Forwarding-plane parity" sub="across 52 datasets" />
            <Stat value="14" label="Network vendors" sub="auto-detected" />
            <Stat value="279ms" label="To simulate 798,720 routes" sub="single binary" />
          </div>
        </Container>
      </section>

      {/* ----------------------------------------------------------- Products */}
      <Section>
        <SectionHeading
          eyebrow="The platform"
          title="Two products. One source of truth for your network."
          description="Hammerhead is the offline simulation engine. Config Studio puts it to work — diagnosing faults and proposing fixes that are proven safe before a human ever sees them."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <ProductCard
            icon={<Gauge className="h-5 w-5" />}
            name="Hammerhead"
            tagline="Offline forwarding-plane simulator"
            description="Drop your configs in a directory and ask what a change will do. Hammerhead parses 14 vendor dialects, simulates OSPF, BGP, IS-IS and more, and answers reachability and traceroute queries in milliseconds — as a single static binary."
            points={[
              "345× faster than Batfish, 99.93% FIB parity",
              "CLI, Python SDK, REST API & GitHub Action",
              "Deterministic, no Docker or JVM, no live device",
            ]}
            to="/products/hammerhead"
          />
          <ProductCard
            icon={<ShieldCheck className="h-5 w-5" />}
            name="Config Studio"
            tagline="AI diagnosis & verified remediation"
            description="When a config breaks, Config Studio finds the fault, writes the exact CLI patch, and runs it through Hammerhead to prove it restores reachability — all before a human approves it. On your own hardware."
            points={[
              "78.2% fix rate on unseen fault classes",
              "Every patch verified before it's proposed",
              "On-prem & air-gap ready — no telemetry",
            ]}
            to="/products/config-studio"
          />
        </div>
      </Section>

      {/* --------------------------------------------------------- How it works */}
      <section className="border-t border-border bg-card">
        <Container className="py-20 md:py-28">
          <SectionHeading
            eyebrow="How it works"
            title="Simulate. Diagnose. Verify."
            description="A closed loop that turns a directory of configs into a guarantee about how your network behaves."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <StepCard
              step="01"
              icon={<Network className="h-5 w-5" />}
              title="Simulate"
              body="Hammerhead parses every device, runs protocol convergence, and builds the forwarding tables for your whole fabric in milliseconds."
            />
            <StepCard
              step="02"
              icon={<CircuitBoard className="h-5 w-5" />}
              title="Diagnose"
              body="Config Studio compares intended behavior to reality, isolates the misconfigured device, and drafts a minimal CLI patch — not a rewrite."
            />
            <StepCard
              step="03"
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Verify"
              body="Every proposed fix is re-simulated. If it doesn't restore reachability, it never reaches you. Gate it on a PR or approve it in one click."
            />
          </div>
        </Container>
      </section>

      {/* ----------------------------------------------------------- Vendors */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <SectionHeading
            eyebrow="Vendor coverage"
            title="Speaks your network's languages."
            description="One engine parses fourteen configuration dialects with automatic detection — no flags, no per-vendor adapters to maintain."
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {vendors.map((v) => (
              <div
                key={v}
                className="rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground/80 transition-colors hover:border-primary/30 hover:text-foreground"
              >
                {v}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* --------------------------------------------------------- Differentiators */}
      <section className="border-t border-border bg-card">
        <Container className="py-20 md:py-28">
          <SectionHeading
            eyebrow="Why Optimesh"
            title="Engineered for the people who keep packets moving."
            align="center"
            className="mx-auto"
          />
          <div className="mx-auto mt-14 grid max-w-5xl gap-x-10 gap-y-12 sm:grid-cols-2">
            <Feature
              icon={<Gauge className="h-5 w-5" />}
              title="Fast enough to live in CI"
              body="Whole-fabric simulation in milliseconds means change validation can run on every commit, not once a quarter."
            />
            <Feature
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Proven, not promised"
              body="Answers are validated against Batfish and live FRR ground truth, and every output is fully deterministic."
            />
            <Feature
              icon={<TerminalSquare className="h-5 w-5" />}
              title="Meets you where you work"
              body="A single binary, a Python SDK, a REST API, and a GitHub Action — drop it into the toolchain you already have."
            />
            <Feature
              icon={<GitPullRequest className="h-5 w-5" />}
              title="Yours to run"
              body="On-prem and air-gap ready. Your configs stay on your hardware; nothing phones home."
            />
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------------------- CTA */}
      <Section className="pb-28">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-foreground px-8 py-16 text-center md:px-16 md:py-20">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.07]" />
          <div className="relative mx-auto max-w-2xl">
            <Eyebrow className="!text-background/70">Early access</Eyebrow>
            <h2 className="mt-4 text-balance text-3xl font-medium tracking-tight text-background sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
              Bring certainty to your next network change.
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-background/70">
              We're working with a small group of network teams who are tired of
              guessing. If that's you, let's talk.
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
          <li key={p} className="flex items-start gap-2.5 text-sm text-foreground/80">
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

function StepCard({
  step,
  icon,
  title,
  body,
}: {
  step: string;
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="relative rounded-xl border border-border bg-background p-7">
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </span>
        <span className="font-mono text-sm text-muted-foreground">{step}</span>
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

function Feature({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-4">
      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </span>
      <div>
        <h3 className="text-base font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {body}
        </p>
      </div>
    </div>
  );
}
