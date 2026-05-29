import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Gauge,
  Lock,
  TerminalSquare,
  ShieldCheck,
  Linkedin,
} from "lucide-react";
import {
  ButtonLink,
  Container,
  Section,
  SectionHeading,
  Eyebrow,
  Stat,
  Badge,
} from "@/components/site/primitives";

const values = [
  {
    icon: <BadgeCheck className="h-5 w-5" />,
    title: "Proof over promises",
    body: "Every answer is validated against industry-standard analysis and a live routing stack, and every output is fully deterministic. If the data doesn't support a claim, we don't make it.",
  },
  {
    icon: <Gauge className="h-5 w-5" />,
    title: "Fast enough to live in CI",
    body: "Whole-fabric simulation in milliseconds means change validation can run on every commit, not once a quarter. Certainty shouldn't cost you a maintenance window.",
  },
  {
    icon: <Lock className="h-5 w-5" />,
    title: "Your network stays yours",
    body: "Optimesh Technologies runs entirely on your own hardware, on-prem and air-gap ready. Your configs never leave your infrastructure, and nothing phones home.",
  },
  {
    icon: <TerminalSquare className="h-5 w-5" />,
    title: "Built for engineers",
    body: "A single static binary that fits the toolchain you already have: CLI, Python SDK, REST API, and a CI integration. No Docker, no JVM, no servers to babysit.",
  },
];

const founders = [
  {
    name: "Chandler W. Stevenson",
    title: "CEO & Co-Founder",
    initials: "CS",
    credentials: [
      "Princeton ECE PhD candidate",
      "NSF GRFP Fellow",
      "Formerly SpaceX & Blue Origin",
    ],
    linkedin: "https://www.linkedin.com/in/chandler-stevenson-717436202/",
  },
  {
    name: "Vedu Mallela",
    title: "CTO & Co-Founder",
    initials: "VM",
    credentials: [
      "Georgia Tech CS",
      "MIT / Harvard NLP research",
      "Currently at TikTok",
    ],
    linkedin: "https://www.linkedin.com/in/vedu-mallela/",
  },
];

const products = [
  {
    icon: <Gauge className="h-5 w-5" />,
    name: "Hammerhead",
    tagline: "Offline forwarding-plane simulator",
    body: "Simulate your entire forwarding plane from a directory of configs in milliseconds, 800× faster than the industry standard at 99.93% parity, fully deterministic, with no live device required.",
    to: "/products/hammerhead",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    name: "Config Studio",
    tagline: "AI diagnosis & verified remediation",
    body: "Uses the Hammerhead engine to diagnose faults and propose fixes that are proven safe before a human ever sees them. 99.6% diagnostic accuracy, with a typical time to fix of under 10 seconds, all on your own hardware.",
    to: "/products/config-studio",
  },
];

export default function About() {
  return (
    <Layout>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-70" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[58rem] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

        <Container className="relative pb-20 pt-32 md:pb-28 md:pt-40">
          <div className="max-w-3xl">
            <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
              <Badge tone="primary">Company</Badge>
            </div>

            <h1
              className="animate-fade-up mt-6 text-balance text-[2.6rem] font-medium leading-[1.06] tracking-tight text-foreground sm:text-6xl lg:text-[3.9rem]"
              style={{ animationDelay: "80ms" }}
            >
              Bring certainty to the networks that run the world.
            </h1>

            <p
              className="animate-fade-up mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground"
              style={{ animationDelay: "160ms" }}
            >
              Optimesh Technologies builds offline intelligence for network
              infrastructure, so the engineers who route the world's traffic
              can know exactly what a change will do before they make it.
            </p>

            <p
              className="animate-fade-up mt-8 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground"
              style={{ animationDelay: "240ms" }}
            >
              Built by infrastructure experts, for the networks that power the
              world.
            </p>
          </div>
        </Container>
      </section>

      {/* ----------------------------------------------------------- Why we exist */}
      <section className="border-y border-border bg-card">
        <Container className="py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <SectionHeading
              eyebrow="Why we exist"
              title="Network changes shouldn't be validated by hope."
            />
            <div className="max-w-2xl space-y-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              <p>
                Network engineers edit the configs that route the world's
                traffic, and most of the time, they can't reliably answer the
                one question that matters: <span className="text-foreground">
                  what will this change actually do?
                </span>{" "}
                The change gets pushed, and everyone hopes for the best.
              </p>
              <p>
                The tools that promise an answer are slow and heavyweight.
                Docker, JVMs, servers, minutes of waiting, so they never run
                where they're needed: on every change. And once something
                breaks, the industry offers plenty of detection but almost no
                remediation. You learn what failed, not how to fix it safely.
              </p>
              <p>
                We started Optimesh Technologies to close that gap with offline intelligence
                that is both fast and trustworthy, fast enough to run on every
                commit, and proven enough to bet a production network on.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------- Our approach */}
      <Section>
        <SectionHeading
          eyebrow="Our approach"
          title="Simulate the network. Prove the fix. Touch nothing live."
          description="Instead of probing live devices, we model them. A directory of configs is enough to reconstruct how a fabric actually forwards packets, and to verify a repair before anyone applies it."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {products.map((p, i) => (
            <Link
              key={p.name}
              to={p.to}
              className="animate-fade-up group flex flex-col rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {p.icon}
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">
                    {p.name}
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {p.tagline}
                  </p>
                </div>
              </div>
              <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
                {p.body}
              </p>
              <span className="mt-7 inline-flex items-center gap-1.5 font-medium text-primary">
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------- Stat band */}
      <section className="border-y border-border bg-card">
        <Container className="py-12">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            <Stat value="800×" label="Faster than the industry standard" sub="fully deterministic" />
            <Stat value="99.93%" label="Forwarding-plane parity" sub="vs. the industry standard & live FRR" />
            <Stat value="100%" label="On-prem and air-gap" sub="your configs never leave your network" />
            <Stat value="<10s" label="Time to fix" sub="diagnose, patch, verify" />
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------- Founders */}
      <Section>
        <SectionHeading
          eyebrow="Leadership"
          title="Built by people who've shipped at the edge."
          description="Optimesh Technologies is founded by engineers who've worked where reliability isn't optional, and who've felt how fragile network change still is."
        />
        <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
          {founders.map((f, i) => (
            <div
              key={f.name}
              className="animate-fade-up flex flex-col rounded-2xl border border-border bg-card p-8 shadow-sm"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-primary/10 font-mono text-lg font-medium text-primary">
                  {f.initials}
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {f.name}
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">
                    {f.title}
                  </p>
                </div>
              </div>
              <ul className="mt-6 space-y-2">
                {f.credentials.map((c) => (
                  <li
                    key={c}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-success" />
                    {c}
                  </li>
                ))}
              </ul>
              <a
                href={f.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                aria-label={`${f.name} on LinkedIn`}
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* --------------------------------------------------------- Our principles */}
      <Section className="border-t border-border">
        <SectionHeading
          eyebrow="What we believe"
          title="The principles behind everything we ship."
          align="center"
          className="mx-auto"
        />
        <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="animate-fade-up rounded-xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {v.icon}
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                {v.title}
              </h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------- Engineering */}
      <section className="border-t border-border bg-card">
        <Container className="py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
            <SectionHeading
              eyebrow="How we build"
              title="Trustworthy by construction."
              description="Correctness isn't a feature we test for at the end, it's the constraint we engineer toward from the start. The result is software you can put in the path of a production change."
            />
            <div className="grid gap-4 sm:grid-cols-3">
              <Stat
                value="100%"
                label="Deterministic"
                sub="same input, same answer, audit-ready"
              />
              <Stat
                value="100%"
                label="On-prem and air-gap"
                sub="your configs never leave your network"
              />
              <Stat
                value="0"
                label="Telemetry sent"
                sub="we do not collect your data"
              />
            </div>
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
              Help us build the future of network intelligence.
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-background/70">
              We're working with a small group of network teams who are tired of
              guessing. If that sounds like yours, we'd like to hear from you.
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
