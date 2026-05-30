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
  Factory,
  Server,
  HeartPulse,
  GraduationCap,
  X,
  GitMerge,
  FileCode2,
  Activity,
  Bell,
  KeyRound,
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
import { NewsTicker } from "@/components/site/NewsTicker";
import { Reveal } from "@/components/site/Reveal";
import { CountUp } from "@/components/site/CountUp";

const principles = [
  {
    title: "Question the requirements first.",
    body: "Every constraint we accept comes from physics or the customer, not industry habit. The wrong requirement costs more than the wrong answer.",
  },
  {
    title: "The best feature is the one we deleted.",
    body: "Every flag, every option has to justify itself. Less surface, less drift, fewer surprises.",
  },
  {
    title: "Test the way it ships. Ship the way it tested.",
    body: "The system we verify against is the system that runs in production. No shortcuts between model and deployment.",
  },
  {
    title: "Cycle time is a feature.",
    body: "Make every cycle short. Parse fast, simulate fast, verify fast, learn fast, repeat.",
  },
  {
    title: "Built by the people you'll talk to.",
    body: "Founders take customer calls. Engineers ship the code. No support queue between you and the team that wrote it.",
  },
  {
    title: "Publish the science. Protect the data.",
    body: "What we learn about verification, we put back in the field. What you tell us about your network never leaves your hardware.",
  },
];

export default function Index() {
  return (
    <Layout>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-70" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 animate-drift rounded-full bg-primary/5 blur-3xl" />

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
                className="animate-fade-up mt-6 text-balance text-[2.8rem] font-medium leading-[1.02] tracking-[-0.03em] text-foreground sm:text-6xl lg:text-[5rem]"
                style={{ animationDelay: "80ms" }}
              >
                Validate every network change before it ships.
              </h1>

              <p
                className="animate-fade-up mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
                style={{ animationDelay: "160ms" }}
              >
                Optimesh Technologies is the network verification platform that
                prevents outages before they happen. Simulate the forwarding
                plane across every major vendor, prove exactly what a
                configuration change will do, and ship verified fixes with
                confidence. All on your own hardware.
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
                  { text: "parsed 1,280 devices · auto-detected", muted: true },
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

      {/* ---------------------------------------------------------- News ticker */}
      <div className="border-t border-border bg-card/60">
        <Container className="py-5">
          <NewsTicker />
        </Container>
      </div>

      {/* --------------------------------------------------------- Stat band */}
      <section className="border-y border-border bg-card">
        <Container className="py-12">
          <Reveal className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            <Stat
              value={<><CountUp to={800} />×</>}
              label="Fits inside a change window"
              sub="whole-fabric simulation in milliseconds"
            />
            <Stat
              value={<CountUp to={99.6} decimals={1} suffix="%" />}
              label="Caught before it ships"
              sub="diagnostic accuracy on real-world faults"
            />
            <Stat
              value={<CountUp to={99} suffix="%" />}
              label="Recovery before customers notice"
              sub="MTTR reduction vs. manual response"
            />
            <Stat
              value={<CountUp to={100} suffix="%" />}
              label="Your data stays yours"
              sub="on-prem and air-gap, no telemetry"
            />
          </Reveal>
        </Container>
      </section>

      {/* ----------------------------------------------------------- Mission */}
      <section className="relative overflow-hidden bg-foreground py-24 md:py-36">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.06]" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.24em] text-background/60">
              Our mission
            </p>
            <p className="mt-6 text-balance text-3xl font-medium tracking-[-0.025em] text-background sm:text-4xl md:text-[3.25rem] md:leading-[1.06]">
              Network outages are not a fact of life. We are building the layer
              that prevents them.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* -------------------------------------------------- What stops happening */}
      <Section>
        <SectionHeading
          eyebrow="The point"
          title="What stops happening."
          description="Verification is not a feature. It is the absence of a long list of expensive things."
        />
        <div className="mx-auto mt-12 grid max-w-4xl gap-x-10 gap-y-5 md:grid-cols-2">
          {[
            "The 2 a.m. page from a one-line change you reviewed yesterday.",
            "The BGP misconfiguration that doesn't show up until three hops downstream.",
            "The week of audit prep because nobody logged what got checked.",
            "The change window that has to wait for a quarterly verification cycle.",
            "The AI copilot suggestion you cannot actually trust to ship.",
            "The post-incident archaeology to find which change broke what.",
          ].map((item) => (
            <div key={item} className="flex items-start gap-4">
              <span className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full border border-destructive/30 bg-destructive/5 text-destructive">
                <X className="h-3.5 w-3.5" />
              </span>
              <p className="text-pretty leading-relaxed text-foreground">
                {item}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ----------------------------------------------------------- Products */}
      <Section>
        <SectionHeading
          eyebrow="The platform"
          title="Two products. One source of truth for your network."
          description="Hammerhead is the offline simulation engine. Config Studio puts it to work, diagnosing faults and proposing fixes that are proven safe before a human ever sees them."
        />

        <Reveal className="mt-14 grid gap-6 lg:grid-cols-2">
          <ProductCard
            icon={<Gauge className="h-5 w-5" />}
            name="Hammerhead"
            tagline="Offline forwarding-plane simulator"
            description="Drop your configs in a directory and ask what a change will do. Hammerhead simulates the forwarding plane across every major vendor in milliseconds."
            points={[
              "800× faster than the industry standard, 99.93% FIB parity",
              "CLI, Python SDK, REST API & CI integration",
              "Deterministic, no Docker or JVM, no live device",
            ]}
            to="/products/hammerhead"
          />
          <ProductCard
            icon={<ShieldCheck className="h-5 w-5" />}
            name="Config Studio"
            tagline="AI diagnosis & verified remediation"
            description="When a config breaks, Config Studio finds the fault, writes the fix, and proves it safe in Hammerhead before a human ever sees it. All on your own hardware."
            points={[
              "99.6% diagnostic accuracy, 99% reduction in MTTR",
              "Every patch verified before it's proposed",
              "On-prem & air-gap ready, no telemetry",
            ]}
            to="/products/config-studio"
          />
        </Reveal>
      </Section>

      {/* ------------------------------------------------------------- Day 1 */}
      <Section>
        <SectionHeading
          eyebrow="Day 1"
          title="Three steps to running on every change."
          description="No agents. No rip-and-replace. Most teams gate their first PR within a day."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              n: "01",
              title: "Point at your configs.",
              body: "A directory or a git repo. Auto-detection handles every vendor.",
              code: "$ hammerhead simulate ./configs",
            },
            {
              n: "02",
              title: "Wire into your pipeline.",
              body: "One CLI call in your CI. No rip-and-replace.",
              code: "ci: hammerhead verify --gate",
            },
            {
              n: "03",
              title: "Gate every change.",
              body: "Verdicts on every PR. Anything that breaks reachability is rejected.",
              code: "✓ verified · safe to merge",
            },
          ].map((s) => (
            <div
              key={s.n}
              className="rounded-2xl border border-border bg-card p-7 shadow-sm"
            >
              <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
                {s.n}
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </p>
              <pre className="mt-5 overflow-x-auto rounded-lg bg-foreground px-3 py-2.5 font-mono text-xs text-white/85">
                <code>{s.code}</code>
              </pre>
            </div>
          ))}
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
              body="Parse every device. Run protocol convergence. Build the whole-fabric forwarding plane in milliseconds."
            />
            <StepCard
              step="02"
              icon={<CircuitBoard className="h-5 w-5" />}
              title="Diagnose"
              body="Compare intent to reality. Isolate the misconfigured device. Draft the minimal CLI patch, not a rewrite."
            />
            <StepCard
              step="03"
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Verify"
              body="Re-simulate every fix. Reject anything that breaks reachability. Gate on a PR, or approve in one click."
            />
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------- Integrations */}
      <Section>
        <SectionHeading
          eyebrow="Fits your stack"
          title="Drops into the tools you already run."
          description="No agents. No rip-and-replace. Optimesh Technologies plugs in through the surfaces every infrastructure team already lives in."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <GitMerge className="h-5 w-5" />,
              name: "CI / CD",
              body: "Verify every config change inside the pipeline. Block the merge that breaks reachability.",
              tools: ["GitHub Actions", "GitLab CI", "Jenkins", "CircleCI", "ArgoCD"],
            },
            {
              icon: <FileCode2 className="h-5 w-5" />,
              name: "Infrastructure as code",
              body: "Plug into the configuration sources you already manage. Apply verification to every plan.",
              tools: ["Terraform", "Ansible", "Nornir", "Salt"],
            },
            {
              icon: <Network className="h-5 w-5" />,
              name: "Network management",
              body: "Pull device inventory and topology from the tools your team already trusts.",
              tools: ["NetBox", "Nautobot", "Cisco DNAC", "Aruba Central"],
            },
            {
              icon: <Activity className="h-5 w-5" />,
              name: "Observability",
              body: "Push verification verdicts into the dashboards your on-call already watches.",
              tools: ["Datadog", "Splunk", "Grafana", "Prometheus", "OpenTelemetry"],
            },
            {
              icon: <Bell className="h-5 w-5" />,
              name: "ITSM & incident response",
              body: "Open tickets, attach verdicts, page on-call. Optimesh respects your incident process.",
              tools: ["ServiceNow", "Jira Service Mgmt", "PagerDuty", "Opsgenie"],
            },
            {
              icon: <KeyRound className="h-5 w-5" />,
              name: "Identity & secrets",
              body: "SSO and secrets management that fits your security posture from day one.",
              tools: ["OIDC / SAML SSO", "HashiCorp Vault", "AWS Secrets", "Okta"],
            },
          ].map((cat) => (
            <div
              key={cat.name}
              className="rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {cat.icon}
              </span>
              <h3 className="mt-5 text-base font-semibold tracking-tight text-foreground">
                {cat.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {cat.body}
              </p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {cat.tools.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[0.7rem] text-foreground/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-muted-foreground">
          One CLI, one Python SDK, one REST API. Wire Optimesh Technologies into anywhere a script or a pipeline runs.
        </p>
      </Section>

      {/* --------------------------------------------------------- Verticals */}
      <Section>
        <SectionHeading
          eyebrow="Built for"
          title="The networks that matter most."
          description="Vendor- and topology-agnostic. The problem looks different in each market we serve."
        />
        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          <Vertical
            icon={<Factory className="h-5 w-5" />}
            name="Manufacturing"
            body="Where a config change to the control network can halt a production line worth millions of dollars an hour."
          />
          <Vertical
            icon={<Server className="h-5 w-5" />}
            name="Datacenters"
            body="AI fabrics, multi-tenant hosting, and multi-region failover that depend on the forwarding plane behaving exactly as designed."
          />
          <Vertical
            icon={<HeartPulse className="h-5 w-5" />}
            name="Hospitals"
            body="Networks where outages translate directly into patient impact. Continuous evidence that segmentation and connectivity hold."
          />
          <Vertical
            icon={<GraduationCap className="h-5 w-5" />}
            name="Universities"
            body="Heterogeneous, multi-tenant fabrics carrying research and campus operations side by side, verified on every change."
          />
        </div>
        <div className="mt-12">
          <ArrowLink to="/why-optimesh">
            See where we fit and why we win
          </ArrowLink>
        </div>
      </Section>

      {/* ----------------------------------------------------------- How we work */}
      <section className="border-y border-border bg-card">
        <Container className="py-20 md:py-28">
          <SectionHeading
            eyebrow="How we work"
            title="How we build."
            description="A few habits we hold ourselves to. Shaped by a co-founder's time at SpaceX, where 'mostly works' is not an outcome."
          />
          <div className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2">
            {principles.map((p, i) => (
              <Principle
                key={p.title}
                n={String(i + 1).padStart(2, "0")}
                title={p.title}
                body={p.body}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------------- Differentiators */}
      <section className="border-t border-border bg-card">
        <Container className="py-20 md:py-28">
          <SectionHeading
            eyebrow="Why Optimesh Technologies"
            title="Engineered for the people who keep packets moving."
            align="center"
            className="mx-auto"
          />
          <div className="mx-auto mt-14 grid max-w-5xl gap-x-10 gap-y-12 sm:grid-cols-2">
            <Feature
              icon={<Gauge className="h-5 w-5" />}
              title="Fast enough to live in CI"
              body="Whole-fabric simulation in milliseconds. Validation runs on every commit, not once a quarter."
            />
            <Feature
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Proven, not promised"
              body="Cross-validated against industry-standard analysis and a live routing stack. Every output deterministic."
            />
            <Feature
              icon={<TerminalSquare className="h-5 w-5" />}
              title="Meets you where you work"
              body="A single binary, an SDK, a REST API, and a CI integration. Drops into the toolchain you already have."
            />
            <Feature
              icon={<GitPullRequest className="h-5 w-5" />}
              title="Yours to run"
              body="On-prem and air-gap ready. Your configs never leave your hardware."
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

function Principle({
  n,
  title,
  body,
}: {
  n: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-6">
      <span className="flex-none pt-1 font-mono text-sm font-medium tabular-nums text-primary">
        {n}
      </span>
      <div>
        <h3 className="text-xl font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}

function Vertical({
  icon,
  name,
  body,
}: {
  icon: React.ReactNode;
  name: string;
  body: string;
}) {
  return (
    <div>
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </span>
      <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
        {name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {body}
      </p>
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
