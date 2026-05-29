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
    body: "Control networks where a configuration change can halt a production line worth millions of dollars an hour. Optimesh Technologies verifies every change against a digital twin of the plant network before it touches the floor.",
  },
  {
    icon: <Server className="h-5 w-5" />,
    name: "Datacenters",
    body: "AI fabrics, multi-tenant hosting, and multi-region failover all hinge on the forwarding plane behaving exactly as designed. We prove it on every change, in milliseconds, with no live device required.",
  },
  {
    icon: <HeartPulse className="h-5 w-5" />,
    name: "Hospitals",
    body: "Where network outages translate directly into patient impact. Optimesh Technologies gives clinical and IT teams continuous, signed evidence that segmentation and connectivity hold on every change.",
  },
  {
    icon: <GraduationCap className="h-5 w-5" />,
    name: "Universities",
    body: "Heterogeneous, multi-tenant fabrics that carry research and campus operations side by side. The verification methods academia helped pioneer, packaged for the team that runs the campus.",
  },
];

const impact = [
  {
    icon: <CheckCircle2 className="h-5 w-5" />,
    title: "Ship changes with measurable confidence.",
    body: "Pre-merge proof that a configuration change preserves reachability, segmentation, and policy. The reviewer no longer has to imagine three hops ahead.",
  },
  {
    icon: <Network className="h-5 w-5" />,
    title: "Prevent outages before they happen.",
    body: "The silent route leak, the ACL mismatch, the BGP neighbor typo. Every change is re-simulated, and anything that drops reachability is rejected before a human sees it.",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Gate AI-driven changes.",
    body: "Let copilots draft anything they like. Nothing reaches production until a forwarding-plane verifier has proved it preserves the properties the network is supposed to have.",
  },
  {
    icon: <Microscope className="h-5 w-5" />,
    title: "Prove compliance continuously.",
    body: "Evidence aligned to CIS, PCI, and SOC 2 on every change. Auditors get a signed log of what was checked, not a reconstruction from configuration after the fact.",
  },
];

const otherApproaches = [
  {
    name: "Legacy verification tools",
    does: "Reason carefully about configuration. Correct in principle.",
    misses:
      "Heavyweight and server-bound, with multi-minute analysis times. Teams reserve them for quarterly audits, so the findings arrive long after the change that broke things.",
  },
  {
    name: "Intent-based networking platforms",
    does: "Automate change. Provide a clean interface for declaring what the network should do.",
    misses:
      "Conflate orchestration with proof. They describe what you wanted; they do not prove the running configuration delivers it. Confident push is not the same as verified change.",
  },
  {
    name: "Monitoring and observability suites",
    does: "Detect, alert, and visualize what is happening on the live network.",
    misses:
      "Cannot say anything about the next change. They report breakage after it occurs, by which point the cost has already been paid.",
  },
  {
    name: "AI copilots and config assistants",
    does: "Generate plausible configurations and explanations very quickly.",
    misses:
      "Ship without a verification gate between the model and production. A persuasive explanation is not a proof of safety, and configuration files are an unusually convenient prompt-injection vector.",
  },
];

const moat = [
  {
    icon: <Gauge className="h-5 w-5" />,
    title: "Speed turns verification into a routine guardrail.",
    body: "Roughly 345 times faster than industry-standard analysis is not just a benchmark. It is the difference between a quarterly audit and a check that runs on every change.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Soundness, not vibes.",
    body: "99.93% forwarding-plane parity validated against industry-standard analysis and live routing ground truth. Determinism by construction, with reproducible results across runs.",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "AI-native by design.",
    body: "Config Studio is one of the first widely deployable systems where every AI-proposed change is proved safe by a forwarding-plane verifier before a human approves it.",
  },
  {
    icon: <Lock className="h-5 w-5" />,
    title: "Runs where customers run.",
    body: "On-prem, air-gap, no telemetry. Configuration files never leave the network. This is the only deployment model serious infrastructure buyers will accept.",
  },
  {
    icon: <Microscope className="h-5 w-5" />,
    title: "Roots in formal methods.",
    body: "Our research lineage runs through the foundational network verification work of the 2010s. We are operationalizing that lineage at production speed, not catching up to it.",
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
              Optimesh Technologies is building the platform that lets networks
              run themselves, safely. Software first, hardware next. We are
              building for the data centers powering modern AI, the carriers
              that move the world's traffic, and the orbital networks coming on
              top of them. Every layer of modern infrastructure has its safety
              net. Networks are the last system of consequence still operated
              without one. That changes here.
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
            title="Three forces are remaking how networks get changed."
            description="Each one alone would justify a new category of tooling. Arriving together, they make verification non-optional."
          />
          <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-3">
            <DriverCard
              n="01"
              title="AI workloads are reshaping the data center."
              body="GPU fabrics are being built and rebuilt at a pace that has no precedent. The cost of a single misconfiguration now cascades across thousands of accelerators and millions of dollars of training time."
            />
            <DriverCard
              n="02"
              title="AI is now writing network configurations."
              body="Copilots in network operations are spreading fast. Almost none of them ship with a verifier between the model and production. The industry is wiring an autopilot into systems it cannot yet audit."
            />
            <DriverCard
              n="03"
              title="Regulators and finance want proof."
              body="Compliance frameworks and uptime-linked contracts are increasingly demanding documented evidence that a change was verified, not just approved. The era of trust-me change management is closing."
            />
          </div>
        </Container>
      </section>

      {/* --------------------------------------------- Where others fall short */}
      <Section>
        <SectionHeading
          eyebrow="Where the existing answers fall short"
          title="What other approaches do, and what they miss."
          description="The market has tried to solve pieces of this problem for two decades. Each approach is useful, and none of them, individually or together, closes the gap."
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
          description="The first horizon is shipping today. The next two are how Optimesh Technologies becomes the durable infrastructure layer for autonomous network operations."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <RoadmapCard
            horizon="Now"
            title="Software"
            body="Hammerhead simulates the forwarding plane offline. Config Studio diagnoses configuration faults and ships verified fixes. Both run on a customer's own hardware today."
            tone="primary"
          />
          <RoadmapCard
            horizon="Next"
            title="Hardware"
            body="Purpose-built appliances and silicon co-designed with the verifier, so autonomous network operations are not bottlenecked by general-purpose hosts. The verification engine moves into the network itself."
            tone="muted"
          />
          <RoadmapCard
            horizon="Then"
            title="Orbital"
            body="Verification and remediation for satellite constellations and compute-in-space. The networks that cannot tolerate an outage are exactly the networks we are built for."
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
              value={<><CountUp to={345} />×</>}
              label="Faster verification"
              sub="vs. industry standard"
            />
            <Stat
              value={<CountUp to={99.93} decimals={2} suffix="%" />}
              label="Forwarding-plane parity"
              sub="across 52 datasets"
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
              The shift toward verifiable network change is going to happen with
              or without any one company. We intend to be the company that makes
              it happen.
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
