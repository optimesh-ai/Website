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
import { RackScene } from "@/components/site/RackScene";
import { Reveal } from "@/components/site/Reveal";

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
    blurb: "Read raw configs. Run protocol convergence. Build the routing and forwarding tables.",
    commands: ["parse", "simulate", "rib", "fib"],
  },
  {
    icon: <Search className="h-5 w-5" />,
    group: "Query",
    blurb: "Ask where a packet goes. Reachability, traceroutes, path joins, IP ownership.",
    commands: ["reachability", "traceroute", "nqe path joins", "find-ip"],
  },
  {
    icon: <GitCompare className="h-5 w-5" />,
    group: "Analyze",
    blurb: "Diff snapshots. Detect loops. Scan for single points of failure. Audit ACLs.",
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
    blurb: "Check configs against a YAML compliance DSL. CIS, PCI, and SOC 2 templates included.",
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
    title: "800× faster on average",
    body: "Fast enough to run on every commit, not once a quarter.",
  },
  {
    icon: <Binary className="h-5 w-5" />,
    title: "A single static binary",
    body: "No Docker, no JVM, no server, no live device. Drop in the binary and point it at a directory.",
  },
  {
    icon: <CheckCircle2 className="h-5 w-5" />,
    title: "Fully deterministic output",
    body: "Same configs, same answer. Diffable, reviewable, safe to gate a merge on.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Clean, auditable codebase",
    body: "Memory-safe by construction. Continuously validated against industry-standard analysis and a live routing stack.",
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
                Point it at a directory of router configs. It builds the
                forwarding tables for every device, runs your reachability
                query, and tells you the answer — in under a second. Ships
                as a single binary. Nothing else to install.
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
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
            <Stat
              value="800×"
              label="Faster"
              sub="whole-fabric sim in milliseconds"
            />
            <Stat
              value="99.93%"
              label="FIB parity"
              sub="cross-validated against live stacks"
            />
            <Stat
              value="<1s"
              label="Full topology"
              sub="1,280 devices parsed and simulated"
            />
            <Stat
              value="100%"
              label="Deterministic"
              sub="same input, same answer, every time"
            />
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------- Capabilities — visual split */}
      <section className="border-y border-border">
        <Container className="py-24 md:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative h-[400px] sm:h-[460px] lg:h-[520px]">
              <RackScene className="absolute inset-0" />
            </div>
            <Reveal>
              <div>
                <Eyebrow>32 CLI subcommands</Eyebrow>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  One engine. The whole validation loop.
                </h2>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground">
                  Parse, simulate, query, analyze, verify — one deterministic binary.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {capabilityGroups.map((g) => (
                    <div key={g.group}>
                      <div className="flex items-center gap-2">
                        <span className="text-primary">{g.icon}</span>
                        <h3 className="text-sm font-semibold text-foreground">{g.group}</h3>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {g.commands.map((c) => (
                          <span key={c} className="rounded border border-border bg-muted px-2 py-0.5 font-mono text-[0.65rem] text-foreground/70">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------- Protocols — compact strip */}
      <section className="bg-foreground">
        <Container className="py-20 md:py-24">
          <Reveal>
            <p className="text-center font-mono text-xs font-medium uppercase tracking-[0.22em] text-primary">
              Protocols &amp; data planes
            </p>
            <h2 className="mt-4 text-center text-3xl font-semibold tracking-tight text-background sm:text-4xl">
              Models the network you actually run.
            </h2>
            <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-3">
              {protocolGroups.map((p) => (
                <div key={p.title}>
                  <h3 className="text-sm font-semibold text-background">{p.title}</h3>
                  <ul className="mt-3 space-y-1.5">
                    {p.items.map((item) => (
                      <li key={item} className="text-sm text-background/60">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ------------------------------------------------------------ Surfaces */}
      <section className="border-y border-border bg-card">
        <Container className="py-20 md:py-28">
          <SectionHeading
            eyebrow="Surfaces"
            title="Meets you where you already work."
            description="One engine, four surfaces. Pick the one that fits your workflow, or wire up all of them."
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
          description="Matches industry-standard analysis at 99.93% accuracy. Fast, portable, and reproducible enough to belong in your pipeline."
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
