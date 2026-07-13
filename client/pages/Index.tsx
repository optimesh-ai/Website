import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Gauge, ShieldCheck, ShieldAlert, Network, Box, Cloud, GitBranch } from "lucide-react";
import { ButtonLink, Container, Eyebrow } from "@/components/site/primitives";
import { CountUp } from "@/components/site/CountUp";
import { Hero } from "@/components/site/Hero";
import { PacketFlowScene } from "@/components/site/PacketFlowScene";
import { MeshFieldScene } from "@/components/site/MeshFieldScene";
import { Reveal } from "@/components/site/Reveal";
import { ParallaxLayer, ScrollBeam } from "@/components/site/ScrollFX";
import { GlobeScene } from "@/components/site/GlobeScene";

const integrations = [
  "GitHub Actions", "GitLab CI", "Jenkins", "ArgoCD",
  "Terraform", "Ansible", "Nornir",
  "NetBox", "Nautobot", "Cisco DNAC",
  "Datadog", "Splunk", "Grafana",
  "PagerDuty", "ServiceNow", "Okta",
];

export default function Index() {
  return (
    <Layout>
      {/* ---------------------------------------------------------------- Hero */}
      <Hero
        title="The trust layer for<br class='hidden sm:block' /> autonomous infrastructure."
        description="AI agents are changing your networks, your clusters, and your cloud. We make sure they don't break anything. Deterministic verification for every infrastructure change — before it executes."
        primaryButton={{ to: "/early-access", label: "Get started" }}
        secondaryButton={{ to: "/features", label: "See the platform" }}
        tertiaryButton={{ to: "https://optimesh-ai.github.io/RuleHawk/", label: "Audit your firewall free", external: true }}
        show3DScene={true}
      />

      {/* --------------------------------------------------------- Stat band — dark, dramatic */}
      <section className="relative overflow-hidden bg-foreground">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.04]" />
        <div className="pointer-events-none absolute inset-0 hidden opacity-40 lg:block [mask-image:radial-gradient(ellipse_at_center,transparent_28%,black_82%)]">
          <ParallaxLayer className="absolute -inset-y-10 inset-x-0" distance={30}>
            <MeshFieldScene className="absolute inset-0" seed={42} count={42} />
          </ParallaxLayer>
        </div>
        <Container className="relative py-20 md:py-24">
          <div className="grid grid-cols-2 gap-y-14 md:grid-cols-4">
            {[
              { value: <><CountUp to={800} />×</>, label: "Faster than alternatives" },
              { value: <CountUp to={99.93} decimals={2} suffix="%" />, label: "Verification accuracy" },
              { value: <CountUp to={3} />, label: "Infrastructure domains" },
              { value: <CountUp to={0} />, label: "Cloud dependencies" },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-4xl font-semibold tabular-nums tracking-tight text-background sm:text-5xl md:text-6xl">
                    {s.value}
                  </div>
                  <p className="mt-3 text-sm font-medium uppercase tracking-[0.15em] text-background/50">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
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
              One verification engine. Every infrastructure layer.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {[
              {
                icon: <Gauge className="h-6 w-6" />,
                name: "Hammerhead",
                desc: "Simulates forwarding planes, K8s policies, and cloud security groups. Answers reachability queries in milliseconds.",
                href: "/products/hammerhead",
                accent: "bg-primary/10 text-primary",
                linkText: "Learn more",
              },
              {
                icon: <ShieldCheck className="h-6 w-6" />,
                name: "Config Studio",
                desc: "Finds the fault, writes the fix, proves it safe through deterministic simulation. Nothing reaches production unverified.",
                href: "/products/config-studio",
                accent: "bg-primary/10 text-primary",
                linkText: "Learn more",
              },
              {
                icon: <ShieldAlert className="h-6 w-6" />,
                name: "RuleHawk",
                desc: "Paste your firewall rules, get an audit report. No sign-up, runs in your browser.",
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
      <section className="relative border-y border-border">
        <Container className="py-24 md:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div>
                <Eyebrow>How it works</Eyebrow>
                <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  Your agent proposes. We prove it safe.
                </h2>
                <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-muted-foreground">
                  Whether it's an AI copilot, a CI pipeline, or a human engineer — every proposed change runs through the same deterministic verification before it touches production.
                </p>
                <div className="mt-8 space-y-3">
                  {[
                    "Propose a change — AI agent, engineer, or automation",
                    "Simulate the impact — deterministic forwarding-plane analysis",
                    "Verify or reject — proven safe, or blocked with evidence",
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
            {[
              {
                icon: <Network className="h-6 w-6" />,
                name: "Network infrastructure",
                desc: "Routers, switches, firewalls across 14+ vendors. Simulate every forwarding table and verify reachability before changes deploy.",
                accent: "bg-primary/10 text-primary",
              },
              {
                icon: <Box className="h-6 w-6" />,
                name: "Kubernetes",
                desc: "NetworkPolicy, Calico, and Cilium. Verify pod-to-pod reachability and segmentation across your clusters.",
                accent: "bg-primary/10 text-primary",
              },
              {
                icon: <Cloud className="h-6 w-6" />,
                name: "Cloud security",
                desc: "AWS VPCs, security groups, NACLs, and transit gateways. Prove that infrastructure changes preserve your security posture.",
                accent: "bg-primary/10 text-primary",
              },
              {
                icon: <GitBranch className="h-6 w-6" />,
                name: "CI/CD pipelines",
                desc: "Gate every pull request with deterministic verification. Block unsafe changes before they merge — automatically.",
                accent: "bg-primary/10 text-primary",
              },
            ].map((p) => (
              <Reveal key={p.name}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${p.accent}`}>
                    {p.icon}
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">{p.name}</h3>
                  <p className="mt-2.5 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------- Integrations */}
      <section>
        <Container className="py-20 md:py-24">
          <Reveal>
            <p className="text-center text-sm font-semibold tracking-tight text-foreground">
              Works with your stack
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
              {integrations.map((name) => (
                <span
                  key={name}
                  className="text-sm font-medium text-muted-foreground/60 transition-colors hover:text-foreground"
                >
                  {name}
                </span>
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
                The verification layer for the age of AI agents. On-prem, air-gapped, zero cloud dependencies.
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
