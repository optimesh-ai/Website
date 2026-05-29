import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Gauge,
  Network,
  Terminal,
  ShieldCheck,
  GitPullRequest,
  Boxes,
  Workflow,
  Cpu,
  Search,
  GitCompare,
  Route,
  Layers,
  Binary,
  FileCode2,
  ServerCog,
  CheckCircle2,
} from "lucide-react";
import {
  ButtonLink,
  ArrowLink,
  Container,
  Section,
  SectionHeading,
  Eyebrow,
  Stat,
  Card,
  Badge,
  CodeBlock,
} from "@/components/site/primitives";

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

const capabilityGroups: {
  icon: React.ReactNode;
  group: string;
  blurb: string;
  commands: string[];
}[] = [
  {
    icon: <Network className="h-5 w-5" />,
    group: "Parse & simulate",
    blurb:
      "Read a directory of raw configs, run protocol convergence, and build per-device routing and forwarding tables.",
    commands: ["parse", "simulate", "rib", "fib"],
  },
  {
    icon: <Search className="h-5 w-5" />,
    group: "Query",
    blurb:
      "Ask where a packet goes. Reachability, hop-by-hop traceroutes, NQE-style path joins, and IP ownership lookups.",
    commands: ["reachability", "traceroute", "nqe path joins", "find-ip"],
  },
  {
    icon: <GitCompare className="h-5 w-5" />,
    group: "Analyze",
    blurb:
      "Diff snapshots, detect loops, scan for single points of failure, measure blast radius, and audit ACLs.",
    commands: [
      "diff",
      "loops",
      "failure-analysis",
      "blast radius",
      "acl-audit",
    ],
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    group: "Verify",
    blurb:
      "Check configs against a YAML compliance DSL with ready-made CIS, PCI, and SOC 2 templates.",
    commands: ["policy-check", "CIS / PCI / SOC2 templates"],
  },
];

const protocolGroups: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}[] = [
  {
    icon: <Route className="h-5 w-5" />,
    title: "Routing protocols",
    items: [
      "OSPFv2 / v3, multi-area, stub, NSSA, virtual links",
      "BGP-4, route reflection, confederations",
      "EIGRP",
      "IS-IS L1 / L2",
      "RIPv2",
    ],
  },
  {
    icon: <Layers className="h-5 w-5" />,
    title: "Overlays & VPN",
    items: [
      "MPLS L3VPN",
      "BGP L3VPN",
      "EVPN type 2 / 3 / 5",
      "VXLAN / EVPN overlays",
      "GRE & IPSec tunnels",
    ],
  },
  {
    icon: <Boxes className="h-5 w-5" />,
    title: "Data plane & L2",
    items: [
      "NAT, static, dynamic, PAT",
      "Switchport / trunk",
      "STP",
      "Per-VLAN forwarding",
      "Symbolic BDD headerspace engine",
    ],
  },
];

const differentiators: {
  icon: React.ReactNode;
  title: string;
  body: string;
}[] = [
  {
    icon: <Gauge className="h-5 w-5" />,
    title: "345× faster on average",
    body: "Up to 1,640× at peak versus the industry standard, fast enough to run on every commit instead of once a quarter.",
  },
  {
    icon: <Binary className="h-5 w-5" />,
    title: "A single static binary",
    body: "No Docker, no JVM, no running server, no live device. Drop in the binary and point it at a directory.",
  },
  {
    icon: <CheckCircle2 className="h-5 w-5" />,
    title: "Fully deterministic output",
    body: "The same configs always produce the same answer, diffable, reviewable, and safe to gate a merge on.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Clean, auditable codebase",
    body: "Engineered for trust. Memory-safe by construction, deterministic by design, and continuously validated against industry-standard analysis and a live routing stack.",
  },
];

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function Hammerhead() {
  return (
    <Layout>
      {/* --------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-70" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[58rem] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

        <Container className="relative pb-20 pt-32 md:pb-24 md:pt-40">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr]">
            <div>
              <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
                <Badge tone="primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Hammerhead, offline simulator
                </Badge>
              </div>

              <h1
                className="animate-fade-up mt-6 text-balance text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.6rem]"
                style={{ animationDelay: "80ms" }}
              >
                Know what a change will do, before you make it.
              </h1>

              <p
                className="animate-fade-up mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
                style={{ animationDelay: "160ms" }}
              >
                Drop your configs in a directory and ask questions. Hammerhead
                parses every major network vendor, simulates the forwarding plane, and
                answers reachability and traceroute queries in milliseconds, as
                a single static binary. No Docker, no JVM, no running server, no
                live device.
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

              <p
                className="animate-fade-up mt-8 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground"
                style={{ animationDelay: "320ms" }}
              >
                Memory-safe by construction · deterministic · audit-ready
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
                  { text: "" },
                  {
                    prompt: "$",
                    text: "hammerhead traceroute --from R1 \\",
                  },
                  {
                    text: "    --src 1.1.1.1 --dst 3.3.3.3 ./configs",
                    muted: true,
                  },
                  { text: "" },
                  { text: "R1 → R2 → R3   DELIVERED  (3 hops)" },
                  {
                    text: "verified against industry-standard analysis · 99.93%",
                    muted: true,
                  },
                ]}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ----------------------------------------------------------- Stat band */}
      <section className="border-y border-border bg-card">
        <Container className="py-12">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-5">
            <Stat
              value="345×"
              label="Faster than the industry standard"
              sub="whole-fabric simulation in milliseconds"
            />
            <Stat
              value="99.93%"
              label="Cross-validated accuracy"
              sub="matches the industry standard at scale"
            />
            <Stat
              value="0"
              label="Per-device flags"
              sub="automatic detection across every major network OS"
            />
            <Stat
              value="<1s"
              label="Whole-fabric simulation"
              sub="for a 1,280-device topology"
            />
            <Stat
              value="100%"
              label="Deterministic"
              sub="same input, same answer, audit-ready"
            />
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------- Capabilities */}
      <Section>
        <SectionHeading
          eyebrow="32 CLI subcommands"
          title="One engine, the whole change-validation loop."
          description="Parse and simulate your fabric, query exactly where packets flow, analyze the impact of failures, and verify compliance, all from one deterministic binary."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {capabilityGroups.map((g) => (
            <Card key={g.group} className="flex flex-col">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {g.icon}
                </span>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {g.group}
                </h3>
              </div>
              <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
                {g.blurb}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {g.commands.map((c) => (
                  <span
                    key={c}
                    className="rounded-md border border-border bg-muted px-2.5 py-1 font-mono text-xs text-foreground/75"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Plus a symbolic BDD headerspace engine for differential reachability,
          so you can prove that two snapshots forward every packet identically.
        </p>
      </Section>

      {/* --------------------------------------------------- Protocols & planes */}
      <section className="border-y border-border bg-card">
        <Container className="py-20 md:py-28">
          <SectionHeading
            eyebrow="Protocols & data planes"
            title="Models the control and forwarding plane you actually run."
            description="Hammerhead converges real routing protocols and resolves the data plane down to per-VLAN forwarding, the depth that makes its answers trustworthy."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {protocolGroups.map((p) => (
              <div
                key={p.title}
                className="rounded-xl border border-border bg-background p-7"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {p.icon}
                  </span>
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {p.title}
                  </h3>
                </div>
                <ul className="mt-5 space-y-3">
                  {p.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/80"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-primary/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------ Surfaces */}
      <section className="border-y border-border bg-card">
        <Container className="py-20 md:py-28">
          <SectionHeading
            eyebrow="Surfaces"
            title="Meets you where you already work."
            description="The same simulation engine, exposed four ways, pick the one that fits your workflow, or wire up all of them."
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:items-start">
            {/* CLI */}
            <div className="flex flex-col gap-4">
              <SurfaceHeader
                icon={<Terminal className="h-5 w-5" />}
                title="CLI"
                sub="Single static binary"
              />
              <CodeBlock
                title="cli"
                lines={[
                  { prompt: "$", text: "hammerhead simulate ./configs" },
                  { text: "FIB built · 798,720 routes · 279ms", muted: true },
                  { prompt: "$", text: "hammerhead traceroute --from R1 \\" },
                  {
                    text: "    --src 1.1.1.1 --dst 3.3.3.3 ./configs",
                    muted: true,
                  },
                  { text: "R1 → R2 → R3   DELIVERED" },
                ]}
              />
            </div>

            {/* Python SDK */}
            <div className="flex flex-col gap-4">
              <SurfaceHeader
                icon={<FileCode2 className="h-5 w-5" />}
                title="Python SDK"
                sub="Notebook-native"
              />
              <CodeBlock
                title="python"
                lines={[
                  { text: "from hammerhead import Hammerhead" },
                  { text: "" },
                  {
                    text: 'hh = Hammerhead().load_snapshot("configs/")',
                  },
                  { text: 'routes = hh.routes(device="core-1")' },
                  { text: ">>> 14,302 routes", muted: true },
                ]}
              />
            </div>

            {/* REST API */}
            <div className="flex flex-col gap-4">
              <SurfaceHeader
                icon={<ServerCog className="h-5 w-5" />}
                title="REST API"
                sub="axum server · 11 endpoints"
              />
              <CodeBlock
                title="rest"
                lines={[
                  {
                    prompt: "$",
                    text: "curl localhost:8080/reachability \\",
                  },
                  {
                    text: '  -d \'{"from":"edge-1","to":"db-core"}\'',
                    muted: true,
                  },
                  { text: "" },
                  { text: '{ "result": "REACHABLE", "hops": 4 }' },
                ]}
              />
            </div>

            {/* CI pipeline */}
            <div className="flex flex-col gap-4">
              <SurfaceHeader
                icon={<GitPullRequest className="h-5 w-5" />}
                title="CI pipeline"
                sub="Gate merges on a FIB diff"
              />
              <CodeBlock
                title="ci.yml"
                lines={[
                  { text: "on: pull_request" },
                  { text: "  paths: ['configs/**']", muted: true },
                  { text: "steps:" },
                  {
                    text: "  - run: hammerhead simulate ./configs \\",
                    muted: true,
                  },
                  { text: "      --diff origin/main --gate", muted: true },
                  { text: "  reachability preserved · merge ok" },
                ]}
              />
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4 rounded-xl border border-border bg-background px-6 py-5">
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Workflow className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">
                8 Jupyter tutorial notebooks
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Getting started, pandas, route &amp; BGP analysis, traceroute,
                change validation, config drift, and ACL / firewall walkthroughs.
              </p>
            </div>
            <ArrowLink to="/whitepaper">Read the white paper</ArrowLink>
          </div>
        </Container>
      </section>

      {/* ----------------------------------------------- Why it's different */}
      <Section>
        <SectionHeading
          eyebrow="vs. the industry standard"
          title="Why teams move off the JVM."
          description="Hammerhead matches industry-standard analysis at 99.93% accuracy, then makes it fast, portable, and reproducible enough to belong in your pipeline."
        />

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {differentiators.map((d) => (
            <div key={d.title} className="flex gap-4">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-primary/10 text-primary">
                {d.icon}
              </span>
              <div>
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {d.title}
                </h3>
                <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {d.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* --------------------------------------------------------- Trust strip */}
      <section className="border-y border-border bg-card">
        <Container className="py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <TrustItem
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Validated against ground truth"
              body="Cross-checked against industry-standard analysis and a live routing stack across dozens of real-world topologies."
            />
            <TrustItem
              icon={<CheckCircle2 className="h-5 w-5" />}
              title="Tested at every layer"
              body="A deep regression suite runs on every build, covering parsers, protocol convergence, and forwarding."
            />
            <TrustItem
              icon={<Cpu className="h-5 w-5" />}
              title="Memory-safe by construction"
              body="Built in safe Rust, so entire classes of bugs simply cannot exist in production."
            />
            <TrustItem
              icon={<Binary className="h-5 w-5" />}
              title="Fully deterministic"
              body="Identical inputs always yield identical output, so a diff means a real change."
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
              See what your next change does, in milliseconds.
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-background/70">
              Hammerhead is open and in early access. Point it at your configs,
              or talk to the team about putting it in your pipeline.
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
                to="/whitepaper"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-background/25 px-6 text-[0.95rem] font-medium text-background transition-colors hover:bg-background/10"
              >
                Read the white paper
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}

/* -------------------------------------------------------------------------- */
/* Local helpers                                                              */
/* -------------------------------------------------------------------------- */

function SurfaceHeader({
  icon,
  title,
  sub,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </span>
      <div>
        <h3 className="text-base font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          {sub}
        </p>
      </div>
    </div>
  );
}

function TrustItem({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex flex-col">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success">
        {icon}
      </span>
      <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        {body}
      </p>
    </div>
  );
}
