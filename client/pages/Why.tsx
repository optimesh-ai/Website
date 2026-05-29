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
} from "lucide-react";
import {
  ButtonLink,
  Container,
  Section,
  SectionHeading,
  Eyebrow,
  Badge,
  Stat,
} from "@/components/site/primitives";
import { Reveal } from "@/components/site/Reveal";
import { CountUp } from "@/components/site/CountUp";

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

const otherApproaches = [
  {
    name: "Legacy verification tools",
    does: "Reason about configuration. Correct in principle.",
    misses:
      "Heavyweight and server-bound. Teams reserve them for quarterly audits, so findings arrive long after the change that broke things.",
  },
  {
    name: "Intent-based networking",
    does: "Automate change. Give you a clean interface for declaring intent.",
    misses:
      "Conflate orchestration with proof. They describe what you wanted, not whether the running configuration delivers it.",
  },
  {
    name: "Monitoring and observability",
    does: "Detect and alert on what is happening on the live network.",
    misses:
      "Cannot say anything about the next change. By the time they report breakage, the cost has been paid.",
  },
  {
    name: "AI copilots and config assistants",
    does: "Generate plausible configurations and explanations quickly.",
    misses:
      "Ship without a verifier between the model and production. A persuasive explanation is not a proof of safety.",
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

        <Container className="relative pb-20 pt-32 md:pb-24 md:pt-40">
          <div className="max-w-3xl">
            <div className="animate-fade-up">
              <Badge tone="primary">Why Optimesh Technologies</Badge>
            </div>
            <h1
              className="animate-fade-up mt-6 text-balance text-[2.6rem] font-medium leading-[1.06] tracking-tight text-foreground sm:text-6xl lg:text-[4rem]"
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
              title="AI workloads are reshaping the data center."
              body="GPU fabrics are being built and rebuilt at unprecedented speed. A single misconfiguration cascades across thousands of accelerators."
            />
            <DriverCard
              n="02"
              title="AI is now writing network configurations."
              body="Copilots are spreading fast through network operations. Almost none ship with a verifier between the model and production."
            />
            <DriverCard
              n="03"
              title="Networks are getting more complex, and harder to debug."
              body="Fabrics carry more layers, more vendors, and more dependencies every year. Connectivity gets less reliable, and the path from incident to root cause keeps getting longer."
            />
            <DriverCard
              n="04"
              title="Regulators and finance want proof."
              body="Compliance and uptime contracts increasingly demand documented evidence that a change was verified, not just approved."
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
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {otherApproaches.map((a) => (
            <div
              key={a.name}
              className="rounded-2xl border border-border bg-card p-7 shadow-sm"
            >
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {a.name}
              </h3>
              <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-primary">
                What they do
              </p>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                {a.does}
              </p>
              <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-destructive">
                What they miss
              </p>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                {a.misses}
              </p>
            </div>
          ))}
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
            body="Hammerhead simulates the forwarding plane offline. Config Studio diagnoses faults and ships verified fixes. Both run on customer hardware today."
            tone="primary"
          />
          <RoadmapCard
            horizon="Next"
            title="Hardware"
            body="Purpose-built appliances and silicon co-designed with the verifier. The verification engine moves into the network itself."
            tone="muted"
          />
          <RoadmapCard
            horizon="Then"
            title="Orbital"
            body="Verification and remediation for satellite constellations and compute-in-space. The networks that cannot tolerate an outage."
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
              value={<><span aria-hidden>&lt;</span><CountUp to={10} />s</>}
              label="Time to fix"
              sub="diagnose, patch, and verify"
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
