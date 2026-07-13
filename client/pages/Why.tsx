import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Factory,
  Server,
  HeartPulse,
  GraduationCap,
  Sparkles,
  Network,
  Gauge,
  ShieldCheck,
  Lock,
  Microscope,
  CheckCircle2,
  Check,
  X,
  Minus,
} from "lucide-react";
import {
  ButtonLink,
  Container,
  Section,
  SectionHeading,
  Eyebrow,
  Stat,
} from "@/components/site/primitives";
import { Reveal } from "@/components/site/Reveal";
import { CountUp } from "@/components/site/CountUp";
import { MeshFieldScene } from "@/components/site/MeshFieldScene";

const verticals = [
  {
    icon: <Factory className="h-5 w-5" />,
    name: "Manufacturing",
    body: "Control networks where a config change can halt a production line worth millions an hour. Verified against a digital twin before it touches the floor.",
  },
  {
    icon: <Server className="h-5 w-5" />,
    name: "Datacenters",
    body: "AI fabrics, multi-tenant hosting, multi-region failover. Every change proven against the forwarding plane in milliseconds.",
  },
  {
    icon: <HeartPulse className="h-5 w-5" />,
    name: "Hospitals",
    body: "Where outages translate directly into patient impact. Continuous, signed evidence that segmentation and connectivity hold.",
  },
  {
    icon: <GraduationCap className="h-5 w-5" />,
    name: "Universities",
    body: "Heterogeneous, multi-tenant fabrics carrying research and campus operations side by side. Verification, packaged for the team that runs the campus.",
  },
];

const impact = [
  {
    icon: <CheckCircle2 className="h-5 w-5" />,
    title: "Ship changes with confidence.",
    body: "Pre-merge proof that a change preserves reachability, segmentation, and policy. Reviewers stop guessing three hops out.",
  },
  {
    icon: <Network className="h-5 w-5" />,
    title: "Prevent outages before they happen.",
    body: "Every proposed change is re-simulated. Anything that drops reachability is rejected before a human sees it.",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Gate AI-driven changes.",
    body: "Let copilots draft anything. Nothing reaches production until a forwarding-plane verifier has proved it safe.",
  },
  {
    icon: <Microscope className="h-5 w-5" />,
    title: "Prove compliance continuously.",
    body: "Signed, continuous evidence for CIS, PCI, and SOC 2. Auditors get a log of what was checked, not a reconstruction.",
  },
];

const compareCriteria = [
  "Prevents the bad change",
  "Runs at CI speed",
  "Verifies AI output",
  "Runs on your hardware",
] as const;

const compareRows: {
  name: string;
  cells: ("yes" | "partial" | "no")[];
  highlight?: boolean;
}[] = [
  { name: "Monitoring & observability", cells: ["no", "no", "no", "partial"] },
  { name: "Legacy verification tools", cells: ["partial", "no", "no", "partial"] },
  { name: "Intent-based networking", cells: ["partial", "partial", "no", "partial"] },
  { name: "AI copilots & config assistants", cells: ["no", "partial", "no", "no"] },
  {
    name: "Optimesh Technologies",
    cells: ["yes", "yes", "yes", "yes"],
    highlight: true,
  },
];

const moat = [
  {
    icon: <Gauge className="h-5 w-5" />,
    title: "Speed turns verification into a routine.",
    body: "800× faster than industry-standard analysis. The difference between a quarterly audit and a check on every change.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Soundness, not vibes.",
    body: "99.93% cross-validated accuracy. Determinism by construction.",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "AI-native by design.",
    body: "Every AI-proposed change is proved safe by a forwarding-plane verifier before a human ever approves it.",
  },
  {
    icon: <Lock className="h-5 w-5" />,
    title: "Runs where customers run.",
    body: "On-prem, air-gap, no telemetry. The only deployment model serious infrastructure buyers will accept.",
  },
  {
    icon: <Microscope className="h-5 w-5" />,
    title: "Roots in formal methods.",
    body: "A research lineage built on the foundational network verification work of the 2010s, operationalized at production speed.",
  },
];

export default function Why() {
  return (
    <Layout>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-70" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 animate-drift rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] lg:block [mask-image:linear-gradient(to_right,transparent,black_45%)]">
          <MeshFieldScene className="absolute inset-0" seed={19} />
        </div>

        <Container className="relative pb-20 pt-32 md:pb-24 md:pt-40">
          <div className="max-w-3xl">
            <h1
              className="animate-fade-up text-balance text-[2.6rem] font-medium leading-[1.06] tracking-tight text-foreground sm:text-6xl lg:text-[4rem]"
              style={{ animationDelay: "80ms" }}
            >
              Making network engineering safe and autonomous.
            </h1>
            <p
              className="animate-fade-up mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground"
              style={{ animationDelay: "160ms" }}
            >
              The verification platform that prevents network outages before
              they happen. Software now. Hardware next. Built for the networks
              that cannot afford to fail.
            </p>
            <div
              className="animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "240ms" }}
            >
              <ButtonLink to="/early-access" variant="primary" size="lg">
                Request access
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </ButtonLink>
              <ButtonLink to="/whitepaper" variant="secondary" size="lg">
                Read the white paper
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------------- Why now */}
      <section className="border-y border-border bg-card">
        <Container className="py-20 md:py-28">
          <SectionHeading
            eyebrow="Why now"
            title="Four forces are remaking how networks get changed."
            description="Each one alone would justify a new category of tooling. Arriving together, they make verification non-optional."
          />
          <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
            <DriverCard
              n="01"
              title="AI agents are managing production infrastructure."
              body="Cisco reports 165,000+ agentic workflow executions monthly. AI is no longer drafting suggestions — it's executing changes on live networks, clusters, and cloud environments."
            />
            <DriverCard
              n="02"
              title="Nobody is verifying what agents do."
              body="Every major AI agent ships without a deterministic verifier between the model and production. We built the only platform that proves an AI-proposed infrastructure change is safe before it executes."
            />
            <DriverCard
              n="03"
              title="Regulation now requires it."
              body="The EU AI Act, effective August 2026, mandates auditability and human oversight for high-risk AI systems. Infrastructure agents fall squarely in scope. Verification is no longer optional — it's compliance."
            />
            <DriverCard
              n="04"
              title="The trust gap is the bottleneck."
              body="Enterprises want autonomous operations. They don't trust AI to make changes unsupervised. Deterministic verification closes that gap — the agent proposes, the verifier proves, production stays safe."
            />
          </div>
        </Container>
      </section>

      {/* --------------------------------------------- Where others fall short */}
      <Section>
        <SectionHeading
          eyebrow="Where the existing answers fall short"
          title="What other approaches do, and what they miss."
          description="The market has tried for two decades. None of these approaches closes the gap, alone or together."
        />
        {/* Mobile: stacked cards (one per approach) */}
        <div className="mt-10 grid gap-3 md:hidden">
          {compareRows.map((row) => (
            <div
              key={row.name}
              className={
                row.highlight
                  ? "rounded-xl border border-primary/30 bg-primary/[0.04] p-4 shadow-sm"
                  : "rounded-xl border border-border bg-card p-4 shadow-sm"
              }
            >
              <h3
                className={
                  row.highlight
                    ? "text-sm font-semibold tracking-tight text-primary"
                    : "text-sm font-semibold tracking-tight text-foreground"
                }
              >
                {row.name}
              </h3>
              <ul className="mt-3 divide-y divide-border/60">
                {compareCriteria.map((c, i) => (
                  <li
                    key={c}
                    className="flex items-center justify-between gap-3 py-1.5 text-[0.82rem]"
                  >
                    <span className="text-muted-foreground">{c}</span>
                    <MarkSmall v={row.cells[i]} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Desktop: comparison table */}
        <div className="mt-14 hidden overflow-x-auto rounded-2xl border border-border bg-card shadow-sm md:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  Approach
                </th>
                {compareCriteria.map((h) => (
                  <th
                    key={h}
                    className="px-4 py-5 text-center font-mono text-[0.7rem] font-medium uppercase tracking-[0.16em] text-muted-foreground"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row) => (
                <tr
                  key={row.name}
                  className={
                    row.highlight
                      ? "bg-primary/[0.04] border-t border-primary/20"
                      : "border-t border-border"
                  }
                >
                  <td
                    className={
                      row.highlight
                        ? "px-6 py-5 font-semibold text-primary"
                        : "px-6 py-5 font-medium text-foreground"
                    }
                  >
                    {row.name}
                  </td>
                  {row.cells.map((cell, i) => (
                    <td key={i} className="px-4 py-5 text-center">
                      <Mark v={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Customer impact */}
      <section className="border-y border-border bg-card">
        <Container className="py-20 md:py-28">
          <SectionHeading
            eyebrow="Customer impact"
            title="What teams do with Optimesh Technologies."
            description="The product is technical. The outcomes are not."
          />
          <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {impact.map((it) => (
              <div key={it.title} className="flex gap-4">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {it.icon}
                </span>
                <div>
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {it.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {it.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- Verticals */}
      <Section>
        <SectionHeading
          eyebrow="Who we build for"
          title="Where Optimesh Technologies fits."
          description="The product is vendor- and topology-agnostic, but the operational problem looks distinct in each market we serve."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {verticals.map((v) => (
            <div
              key={v.name}
              className="rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {v.icon}
              </span>
              <h3 className="mt-5 text-base font-semibold tracking-tight text-foreground">
                {v.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ----------------------------------------------------------------- Roadmap */}
      <Section>
        <SectionHeading
          eyebrow="What we are building"
          title="A platform for autonomous networking. In horizons."
          description="The first horizon ships today. The next two are how we get to the durable infrastructure layer for autonomous network operations."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <RoadmapCard
            horizon="Now"
            title="Software"
            body="Hammerhead verifies network, Kubernetes, and cloud infrastructure changes. Config Studio adds AI-powered diagnosis and remediation. Both run on your hardware today."
            tone="primary"
          />
          <RoadmapCard
            horizon="Next"
            title="Hardware"
            body="Purpose-built appliances for air-gapped environments. Local AI inference with deterministic verification — the autonomous network engineer that never sleeps."
            tone="muted"
          />
          <RoadmapCard
            horizon="Then"
            title="Universal"
            body="Verification for every AI agent acting on any infrastructure. Terraform, databases, CI/CD, and beyond. The trust layer becomes the standard."
            tone="muted"
          />
        </div>
      </Section>

      {/* --------------------------------------------------------------- Why we win */}
      <section className="border-y border-border bg-card">
        <Container className="py-20 md:py-28">
          <SectionHeading
            eyebrow="Why we are positioned to win"
            title="The combination is the moat."
            description="Any one of these is hard. All of them in one product is what closes the gap."
          />
          <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {moat.map((m) => (
              <div key={m.title} className="flex gap-4">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {m.icon}
                </span>
                <div>
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {m.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Reveal className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-border pt-12 md:grid-cols-4">
            <Stat
              value={<><CountUp to={800} />×</>}
              label="Faster verification"
              sub="vs. industry standard"
            />
            <Stat
              value={<CountUp to={99.93} decimals={2} suffix="%" />}
              label="Forwarding-plane parity"
              sub="against industry-standard analysis"
            />
            <Stat
              value={<CountUp to={99.6} decimals={1} suffix="%" />}
              label="Diagnostic accuracy"
              sub="across the fault taxonomy"
            />
            <Stat
              value={<CountUp to={99} suffix="%" />}
              label="MTTR reduction"
              sub="vs. manual incident response"
            />
          </Reveal>
        </Container>
      </section>

      {/* ------------------------------------------------------------ Traction */}
      <Section>
        <SectionHeading
          eyebrow="Momentum"
          title="Signals from the last few months."
          description="Early proof points. More is on the way."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <TractionCard
            label="Funding"
            headline="Angel round closed"
            sub="Backed by operators and angels who have run real networks."
            href="/news/angel-round"
          />
          <TractionCard
            label="Program"
            headline="NVIDIA Inception"
            sub="Working alongside other AI-first startups in NVIDIA's startup program."
            href="/news/nvidia-inception"
          />
        </div>
      </Section>

      {/* --------------------------------------------------------------- CTA */}
      <Section className="pb-28">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-foreground px-8 py-16 text-center md:px-16 md:py-20">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.07]" />
          <div className="relative mx-auto max-w-2xl">
            <Eyebrow className="!text-background/70">Talk to us</Eyebrow>
            <h2 className="mt-4 text-balance text-3xl font-medium tracking-tight text-background sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
              If you operate, invest in, or buy network infrastructure, we should talk.
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-background/70">
              Verifiable network change is happening. We intend to be the company that makes it routine.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink
                to="/early-access"
                size="lg"
                className="bg-background text-foreground hover:bg-background/90"
              >
                Request access
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

function Mark({ v }: { v: "yes" | "partial" | "no" }) {
  if (v === "yes")
    return (
      <Check className="mx-auto h-5 w-5 text-success" strokeWidth={2.5} />
    );
  if (v === "no")
    return (
      <X className="mx-auto h-5 w-5 text-destructive/70" strokeWidth={2.5} />
    );
  return <Minus className="mx-auto h-5 w-5 text-muted-foreground/60" />;
}

function MarkSmall({ v }: { v: "yes" | "partial" | "no" }) {
  if (v === "yes")
    return <Check className="h-4 w-4 flex-none text-success" strokeWidth={2.5} />;
  if (v === "no")
    return <X className="h-4 w-4 flex-none text-destructive/70" strokeWidth={2.5} />;
  return <Minus className="h-4 w-4 flex-none text-muted-foreground/60" />;
}

function RoadmapCard({
  horizon,
  title,
  body,
  tone,
}: {
  horizon: string;
  title: string;
  body: string;
  tone: "primary" | "muted";
}) {
  const horizonClasses =
    tone === "primary"
      ? "bg-primary/10 text-primary"
      : "bg-muted text-muted-foreground";
  return (
    <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
      <span
        className={`inline-flex rounded-full px-2.5 py-0.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] ${horizonClasses}`}
      >
        {horizon}
      </span>
      <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {body}
      </p>
    </div>
  );
}

function DriverCard({
  n,
  title,
  body,
}: {
  n: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-7">
      <span className="font-mono text-xs text-muted-foreground">{n}</span>
      <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {body}
      </p>
    </div>
  );
}

function TractionCard({
  label,
  headline,
  sub,
  href,
}: {
  label: string;
  headline: string;
  sub: string;
  href: string;
}) {
  return (
    <Link
      to={href}
      className="group block rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
    >
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-primary">
        {label}
      </p>
      <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
        {headline}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {sub}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
        Read announcement
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
