import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Gauge, ShieldCheck, ShieldAlert, Check, X } from "lucide-react";
import { ButtonLink, Container, Eyebrow } from "@/components/site/primitives";
import { Hero } from "@/components/site/Hero";
import { PacketFlowScene } from "@/components/site/PacketFlowScene";
import { Reveal } from "@/components/site/Reveal";
import { ParallaxLayer, ScrollBeam } from "@/components/site/ScrollFX";
import { GlobeScene } from "@/components/site/GlobeScene";

// Each blurb is grounded in a real module in the product code.
const integrations = [
  { name: "GitHub Actions", blurb: "RuleHawk and Config Studio run as a step in your workflow, failing the check with a witness packet before an unsafe change can merge." },
  { name: "GitLab CI", blurb: "Config Studio gates merge requests through a GitLab webhook, and the CLIs run as a GitLab CI job." },
  { name: "Jenkins", blurb: "The Optimesh CLIs run as a build step in any Jenkins pipeline, blocking the job on an unsafe change." },
  { name: "ArgoCD", blurb: "Verify a rendered change before ArgoCD syncs it, so a bad manifest never reaches the cluster." },
  { name: "Terraform", blurb: "Config Studio parses and lints your Terraform, proving the network change it plans is safe before apply." },
  { name: "Ansible", blurb: "Config Studio verifies the change an Ansible playbook will push, before it runs." },
  { name: "Nornir", blurb: "Verify changes orchestrated through Nornir before they reach your devices." },
  { name: "NetBox", blurb: "Config Studio pulls your intended network state from NetBox as its source of truth." },
  { name: "Nautobot", blurb: "Config Studio reads topology and intended state from Nautobot as its source of truth." },
  { name: "Cisco Meraki", blurb: "Config Studio discovers and reads Meraki networks as a source, and pushes verified changes over the Meraki API." },
  { name: "Datadog", blurb: "Config Studio streams verification verdicts and drift events to Datadog." },
  { name: "Splunk", blurb: "Config Studio ships verification results to Splunk via HTTP Event Collector for search and audit." },
  { name: "Grafana", blurb: "Verification metrics flow through Loki and Datadog into your existing Grafana dashboards." },
  { name: "PagerDuty", blurb: "When a change is blocked or drift is detected, Config Studio raises a PagerDuty alert." },
  { name: "ServiceNow", blurb: "Config Studio opens and updates ServiceNow change tickets, and can gate on the change record." },
  { name: "Okta", blurb: "Sign in to Config Studio with Okta via OIDC single sign-on and group-based access." },
];

/* ---- interactive "Where it works": hover a tile, its domain visualizes ---- */

function VizNetwork() {
  const n = [[70, 150], [195, 70], [195, 230], [330, 110], [330, 200], [430, 155]];
  const links = [[0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 5], [1, 2]];
  const path = [[0, 1], [1, 3], [3, 5]];
  const seg = (pts: number[][], cls: string, w: number) =>
    pts.map(([a, z], i) => (
      <line key={cls + i} x1={n[a][0]} y1={n[a][1]} x2={n[z][0]} y2={n[z][1]} className={cls} strokeWidth={w} />
    ));
  return (
    <svg viewBox="0 0 500 300" fill="none" className="h-full w-full">
      <g stroke="currentColor">{seg(links, "text-primary/30", 1.5)}</g>
      <g stroke="currentColor">{seg(path, "text-success", 3)}</g>
      {n.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="9" className="fill-background stroke-primary/60" strokeWidth="1.5" />
      ))}
    </svg>
  );
}

function VizK8s() {
  const pods: number[][] = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) pods.push([90 + c * 80, 90 + r * 65]);
  return (
    <svg viewBox="0 0 500 300" fill="none" className="h-full w-full">
      <g stroke="currentColor" className="text-primary/25" strokeWidth="1.5">
        <line x1="90" y1="90" x2="170" y2="155" />
        <line x1="250" y1="155" x2="330" y2="220" />
        <line x1="170" y1="220" x2="250" y2="220" />
      </g>
      <g stroke="currentColor" className="text-success" strokeWidth="3">
        <line x1="170" y1="155" x2="250" y2="90" />
      </g>
      {pods.map(([x, y], i) => (
        <rect key={i} x={x - 16} y={y - 16} width="32" height="32" rx="7" className="fill-background stroke-primary/50" strokeWidth="1.5" />
      ))}
    </svg>
  );
}

function VizCloud() {
  return (
    <svg viewBox="0 0 500 300" fill="none" className="h-full w-full">
      <rect x="70" y="80" width="240" height="150" rx="16" className="stroke-primary/40" strokeWidth="1.5" strokeDasharray="6 7" />
      <rect x="150" y="140" width="46" height="34" rx="6" className="fill-background stroke-primary/60" strokeWidth="1.5" />
      <circle cx="410" cy="120" r="34" className="stroke-primary/40" strokeWidth="1.5" />
      <g stroke="currentColor" className="text-[#F0672A]" strokeWidth="2.5">
        <line x1="310" y1="157" x2="376" y2="120" strokeDasharray="6 6" />
        <line x1="333" y1="126" x2="353" y2="146" />
        <line x1="353" y1="126" x2="333" y2="146" />
      </g>
    </svg>
  );
}

function VizCicd() {
  return (
    <svg viewBox="0 0 500 300" fill="none" className="h-full w-full">
      <line x1="90" y1="170" x2="420" y2="170" className="stroke-primary/30" strokeWidth="1.5" />
      <path d="M 210 170 C 210 110, 250 100, 300 100 L 340 100" className="stroke-primary/30" strokeWidth="1.5" fill="none" />
      <path d="M 340 100 C 390 100, 402 130, 400 168" className="stroke-[#F0672A]" strokeWidth="2.5" strokeDasharray="6 6" fill="none" />
      {[[90, 170], [210, 170], [300, 170], [420, 170], [300, 100], [340, 100]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="7" className="fill-background stroke-primary/60" strokeWidth="1.5" />
      ))}
      <g stroke="currentColor" className="text-[#F0672A]" strokeWidth="2.5">
        <line x1="390" y1="128" x2="410" y2="148" />
        <line x1="410" y1="128" x2="390" y2="148" />
      </g>
    </svg>
  );
}

const DOMAINS = [
  {
    name: "Network infrastructure",
    desc: "Push changes across routers, switches, and firewalls from 14+ vendors without fear of taking a site down.",
    query: "10.0.1.5 → 10.0.9.2",
    pass: true,
    Viz: VizNetwork,
    glow: "bg-primary/[0.06]",
  },
  {
    name: "Kubernetes",
    desc: "Change cluster networking without breaking connectivity or opening a hole between workloads.",
    query: "pod/web → pod/db",
    pass: true,
    Viz: VizK8s,
    glow: "bg-primary/[0.06]",
  },
  {
    name: "Cloud security",
    desc: "Change AWS networking knowing a bad security-group edit won't quietly expose you to the internet.",
    query: "app-sg → 0.0.0.0/0",
    pass: false,
    Viz: VizCloud,
    glow: "bg-[#F0672A]/[0.05]",
  },
  {
    name: "CI/CD pipelines",
    desc: "Catch the dangerous change in the pull request automatically, before it ever merges.",
    query: "PR #482 → merge",
    pass: false,
    Viz: VizCicd,
    glow: "bg-[#F0672A]/[0.05]",
  },
];

function WhereItWorks() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <Reveal>
          <p className="text-center font-mono text-xs font-medium uppercase tracking-[0.22em] text-primary">
            Where it works
          </p>
          <h2 className="mt-4 text-center text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            From the data center to the cloud.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DOMAINS.map((p) => {
            const Viz = p.Viz;
            return (
              <Reveal key={p.name}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
                  {/* on hover, this tile's own background becomes its domain visualization (clipped to the card) */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className={`absolute inset-0 ${p.glow}`} />
                    <div className="absolute inset-x-0 bottom-0 h-3/5 opacity-70 [mask-image:linear-gradient(to_top,#000_45%,transparent)] [-webkit-mask-image:linear-gradient(to_top,#000_45%,transparent)]">
                      <Viz />
                    </div>
                  </div>

                  <div className="relative z-10 flex h-full flex-col">
                    <div className="inline-flex items-center gap-2 self-start rounded-md border border-border bg-secondary/50 px-2.5 py-1.5 font-mono text-xs">
                      {p.pass ? (
                        <Check className="h-3.5 w-3.5 shrink-0 text-success" />
                      ) : (
                        <X className="h-3.5 w-3.5 shrink-0 text-[#F0672A]" />
                      )}
                      <span className="text-muted-foreground">{p.query}</span>
                    </div>
                    <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">{p.name}</h3>
                    <p className="mt-2.5 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default function Index() {
  return (
    <Layout>
      {/* ---------------------------------------------------------------- Hero */}
      <Hero
        title="Ship changes at full speed.<br class='hidden sm:block' /> Never cause an outage."
        description="An engineer pushes a change that quietly opens a path from your corporate network to your payment systems. Optimesh catches it before it ships. Nobody gets paged. The audit stays clean. You never even hear about it."
        primaryButton={{ to: "/early-access", label: "Get started" }}
        secondaryButton={{ to: "/features", label: "See the platform" }}
        tertiaryButton={{ to: "https://optimesh-ai.github.io/RuleHawk/", label: "Audit your firewall free", external: true }}
        show3DScene={true}
      />

      {/* --------------------------------------------------- Before / after */}
      <section className="bg-secondary/40 py-24 md:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>The difference</Eyebrow>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                Network changes shouldn't feel like a gamble.
              </h2>
            </div>
          </Reveal>

          <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-border bg-card p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Today
                </p>
                <ul className="mt-6 space-y-4">
                  {[
                    "Every change is a gamble. One bad push and you're in a 2 a.m. war room.",
                    "Change freezes before every weekend, holiday, and launch.",
                    "Only your most senior engineers are trusted near the core.",
                    "Every audit is a scramble to prove what the network actually does.",
                  ].map((t) => (
                    <li key={t} className="flex gap-3 text-[0.95rem] leading-relaxed text-muted-foreground">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/50" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl border border-primary/20 bg-primary/[0.04] p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">
                  With Optimesh
                </p>
                <ul className="mt-6 space-y-4">
                  {[
                    "Every change is proven safe before it ships. The bad one is caught first.",
                    "Ship any day. There's nothing left to freeze.",
                    "Anyone on the team can make a change with confidence.",
                    "Every change comes with evidence. The audit is already done.",
                  ].map((t) => (
                    <li key={t} className="flex gap-3 text-[0.95rem] leading-relaxed text-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---- Scroll story: a beam draws down the page through these sections */}
      <div className="relative">
        <ScrollBeam className="left-5 hidden lg:block xl:left-8" />

      {/* ----------------------------------------------------------- Products */}
      <section className="py-24 md:py-32">
        <Container>
          <Reveal>
            <p className="text-center font-mono text-xs font-medium uppercase tracking-[0.22em] text-primary">
              The platform
            </p>
            <h2 className="mt-4 text-center text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Change anything. Break nothing.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {[
              {
                icon: <Gauge className="h-6 w-6" />,
                name: "Hammerhead",
                desc: "See exactly what any change will do before you make it, across on-prem, Kubernetes, and cloud. Answers in milliseconds.",
                href: "/products/hammerhead",
                accent: "bg-primary/10 text-primary",
                linkText: "Learn more",
              },
              {
                icon: <ShieldCheck className="h-6 w-6" />,
                name: "Config Studio",
                desc: "Diagnoses the problem, proposes the fix, and proves it's safe before it ships. Resolve incidents in minutes without risking another one.",
                href: "/products/config-studio",
                accent: "bg-primary/10 text-primary",
                linkText: "Learn more",
              },
              {
                icon: <ShieldAlert className="h-6 w-6" />,
                name: "RuleHawk",
                desc: "Find the dangerous gaps in your firewall in seconds. Free, no sign-up, runs in your browser.",
                href: "https://optimesh-ai.github.io/RuleHawk/",
                accent: "bg-success/10 text-success",
                linkText: "Try it free",
                external: true,
                badge: "Free",
              },
            ].map((p) => (
              <Reveal key={p.name}>
                {p.external ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${p.accent}`}>
                      {p.icon}
                    </div>
                    <div className="mt-5 flex items-center gap-2.5">
                      <h3 className="text-xl font-semibold tracking-tight text-foreground">{p.name}</h3>
                      {p.badge && (
                        <span className="rounded-full bg-success/10 px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-success">
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-2.5 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">{p.desc}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      {p.linkText} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </a>
                ) : (
                  <Link
                    to={p.href}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${p.accent}`}>
                      {p.icon}
                    </div>
                    <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">{p.name}</h3>
                    <p className="mt-2.5 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">{p.desc}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      {p.linkText} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                )}
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------- Visual: topology */}
      <section className="relative">
        <Container className="py-24 md:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div>
                <Eyebrow>How it works</Eyebrow>
                <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  Your agent proposes. We prove it safe.
                </h2>
                <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-muted-foreground">
                  Whether a change comes from an AI copilot, a pipeline, or an engineer, you know it's safe before it reaches production. No more hoping nothing breaks.
                </p>
                <div className="mt-8 space-y-3">
                  {[
                    "A change comes in from an agent, an engineer, or a pipeline",
                    "You see exactly what it will do to your live network",
                    "It ships proven safe, or it's stopped before it can break anything",
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-bold text-primary">
                        {i + 1}
                      </span>
                      <span className="text-sm text-foreground">{step}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <ButtonLink to="/features" variant="primary" size="lg" className="group">
                    See the platform
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
            <ParallaxLayer className="relative h-[380px] sm:h-[440px] lg:h-[480px]" distance={44}>
              <PacketFlowScene className="absolute inset-0" />
            </ParallaxLayer>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------- Where it works */}
      <WhereItWorks />

      {/* --------------------------------------------------- Integrations */}
      <section className="py-24 md:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>Integrations</Eyebrow>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                Fits the stack you already run.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Optimesh drops into your pipelines, source of truth, and tooling.
                No rip-and-replace, no new console to babysit.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4">
              {integrations.map((it) => (
                <div
                  key={it.name}
                  className="group relative flex items-center justify-center rounded-xl border border-border bg-card px-6 py-8 text-center text-[0.95rem] font-medium text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:text-foreground hover:shadow-sm"
                >
                  {it.name}
                  {/* how Optimesh connects to this tool */}
                  <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 w-64 max-w-[80vw] -translate-x-1/2 rounded-lg border border-white/10 bg-foreground p-3.5 text-left opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100">
                    <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.12em] text-background/45">
                      {it.name}
                    </p>
                    <p className="mt-1.5 text-[0.8rem] leading-relaxed text-background/90">
                      {it.blurb}
                    </p>
                    <span className="absolute left-1/2 top-full h-2.5 w-2.5 -translate-x-1/2 -translate-y-1.5 rotate-45 border-b border-r border-white/10 bg-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>
      </div>

      {/* --------------------------------------------------------------- CTA */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-foreground px-8 py-20 text-center md:px-16 md:py-28">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.05]" />
          {/* Dotted-continent globe bleeding off the card's right edge */}
          <div className="pointer-events-none absolute -right-64 top-1/2 hidden h-[620px] w-[620px] -translate-y-1/2 lg:block xl:-right-48">
            <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl" />
            <GlobeScene className="absolute inset-0" />
          </div>
          <div className="relative mx-auto max-w-2xl">
            <Reveal>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-background sm:text-4xl md:text-5xl">
                Infrastructure is becoming autonomous.<br />Make it safe.
              </h2>
              <p className="mt-6 text-lg text-background/60">
                Give your team the confidence to move fast. Optimesh runs entirely inside your network, so your configs never leave it.
              </p>
              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                <ButtonLink
                  to="/early-access"
                  size="lg"
                  className="bg-background text-foreground hover:bg-background/90"
                >
                  Request Evaluation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </ButtonLink>
                <Link
                  to="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-lg border border-background/20 px-6 text-[0.95rem] font-medium text-background/80 transition-colors hover:bg-background/10 hover:text-background"
                >
                  Contact Sales
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
