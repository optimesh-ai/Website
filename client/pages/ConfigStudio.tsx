import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  Search,
  FileDiff,
  CheckCircle2,
  XCircle,
  GitPullRequest,
  MessageSquare,
  Lock,
  Server,
  Wrench,
  Bot,
  CircleSlash,
} from "lucide-react";
import {
  ButtonLink,
  Container,
  Section,
  SectionHeading,
  Eyebrow,
  Stat,
  Badge,
  Card,
  CodeBlock,
} from "@/components/site/primitives";

const pipeline = [
  {
    step: "01",
    icon: Search,
    name: "Sanitize",
    summary:
      "22 always-on regex heuristics strip prompt-injection attempts hidden in config comments before the model ever sees them.",
    detail: "Sanitizer v2 cuts injection success 90% → 40%",
    tone: "primary" as const,
  },
  {
    step: "02",
    icon: Bot,
    name: "Diagnose",
    summary:
      "An LLM classifies against a 32-class fault taxonomy and returns the fault class, the suspect device, a confidence score, and its rationale.",
    detail: "BGP down · OSPF mismatch · route-map blackhole · VLAN · ACL · MTU",
    tone: "primary" as const,
  },
  {
    step: "03",
    icon: FileDiff,
    name: "Patch",
    summary:
      "The model emits a minimal CLI diff, the exact ~3 lines you'd actually type, never a full config rewrite.",
    detail: "Minimal diff, not a rewrite",
    tone: "primary" as const,
  },
  {
    step: "04",
    icon: ShieldCheck,
    name: "Verify",
    summary:
      "Hammerhead re-simulates the patched network offline. Any patch that drops reachability below 99% is rejected before a human ever sees it.",
    detail: "Gated behind explicit ✓ Apply / ✗ Reject",
    tone: "success" as const,
  },
];

const studioTools = [
  "list_devices",
  "show_config",
  "reachability",
  "traceroute",
  "show_fib",
  "detect_loops",
  "topology",
  "diagnose",
  "recent_changes",
  "config_diff",
  "find_ip",
  "config_grep",
  "mtu_check",
  "ospf_neighbors",
  "propose_edit",
];

const trust = [
  {
    icon: Server,
    title: "Runs on your hardware",
    body: "Configs are sent only to the operator's configured LLM, OpenAI, Anthropic, or a self-hosted vLLM / Ollama endpoint. Hammerhead runs locally. No telemetry leaves the box.",
  },
  {
    icon: Lock,
    title: "Air-gap ready",
    body: "Point Config Studio at a self-hosted OpenAI-compatible endpoint and it runs fully offline, no code change required.",
  },
  {
    icon: ShieldCheck,
    title: "0 CVEs, 304 assertions",
    body: "A 304-assertion test suite and a clean pip-audit + safety scan (0 known CVEs) ship with every build.",
  },
  {
    icon: Lock,
    title: "Hardened by default",
    body: "Hash-pinned dependencies, HMAC-verified webhooks, and zip-bomb caps close the supply-chain and ingest attack surface.",
  },
  {
    icon: ShieldAlert,
    title: "Anti-injection sanitizer",
    body: "22 always-on heuristics quarantine prompt-injection payloads buried in config comments before diagnosis begins.",
  },
  {
    icon: CircleSlash,
    title: "A digital twin of your network",
    body: "Config Studio runs against a complete digital twin of your network's configured forwarding plane, built from your existing files. No agents, no live telemetry, no production risk.",
  },
];

export default function ConfigStudio() {
  return (
    <Layout>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-70" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[58rem] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

        <Container className="relative pb-20 pt-32 md:pb-28 md:pt-40">
          <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr]">
            <div>
              <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
                <Eyebrow>Config Studio, diagnose &amp; fix</Eyebrow>
              </div>

              <h1
                className="animate-fade-up mt-5 text-balance text-[2.5rem] font-medium leading-[1.06] tracking-tight text-foreground sm:text-5xl lg:text-[3.6rem]"
                style={{ animationDelay: "80ms" }}
              >
                Diagnose router-config faults and generate verified fixes.
              </h1>

              <p
                className="animate-fade-up mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
                style={{ animationDelay: "160ms" }}
              >
                It assumes you have a broken config and a tired engineer, so it
                finds the fault, writes the exact CLI patch, and proves it
                restores reachability before you approve it. In seconds.{" "}
                <span className="font-medium text-foreground">
                  On your own hardware.
                </span>
              </p>

              <div
                className="animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row"
                style={{ animationDelay: "240ms" }}
              >
                <ButtonLink to="/early-access" variant="primary" size="lg">
                  Request access
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </ButtonLink>
                <ButtonLink
                  to="/products/hammerhead"
                  variant="secondary"
                  size="lg"
                >
                  Powered by Hammerhead
                </ButtonLink>
              </div>

              <p
                className="animate-fade-up mt-8 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground"
                style={{ animationDelay: "320ms" }}
              >
                An Optimesh Technologies product.
              </p>
            </div>

            {/* Report card visual */}
            <div
              className="animate-fade-up lg:justify-self-end"
              style={{ animationDelay: "260ms" }}
            >
              <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Diagnosis report
                  </span>
                  <Badge tone="neutral">~11s</Badge>
                </div>

                {/* Fault */}
                <div className="mt-5 rounded-lg border border-border bg-background p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                      Fault class
                    </span>
                    <Badge tone="primary">conf. 0.94</Badge>
                  </div>
                  <p className="mt-2 font-mono text-sm font-medium text-foreground">
                    BGP session down
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Suspect device{" "}
                    <span className="font-mono text-foreground">edge-2</span>.
                    Neighbor ASN mismatch on peer 10.0.4.1.
                  </p>
                </div>

                {/* Patch diff */}
                <div className="mt-3 overflow-hidden rounded-lg border border-border bg-foreground">
                  <div className="border-b border-white/10 px-4 py-2">
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-white/40">
                      Proposed patch · edge-2
                    </span>
                  </div>
                  <pre className="overflow-x-auto px-4 py-3 font-mono text-[0.78rem] leading-relaxed">
                    <code>
                      <div className="text-white/40">router bgp 65010</div>
                      <div className="text-white/40">
                        {" "}
                        neighbor 10.0.4.1
                      </div>
                      <div className="text-destructive">
                        - remote-as 65099
                      </div>
                      <div className="text-success">+ remote-as 65020</div>
                    </code>
                  </pre>
                </div>

                {/* Verdict */}
                <div className="mt-3 flex items-center gap-3 rounded-lg border border-success/30 bg-success/10 p-4">
                  <CheckCircle2 className="h-5 w-5 flex-none text-success" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      Hammerhead verified
                    </p>
                    <p className="font-mono text-xs text-muted-foreground">
                      reachability restored 99.7% · re-simulated offline
                    </p>
                  </div>
                </div>

                {/* Gate */}
                <div className="mt-4 flex gap-3">
                  <span className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-success/10 px-4 py-2.5 text-sm font-medium text-success">
                    <CheckCircle2 className="h-4 w-4" />
                    Apply
                  </span>
                  <span className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground">
                    <XCircle className="h-4 w-4" />
                    Reject
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------------- Stat band */}
      <section className="border-y border-border bg-card">
        <Container className="py-12">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-5">
            <Stat
              value="<5 min"
              label="Mean time to recovery"
              sub="incident detected to verified fix"
            />
            <Stat
              value="99.6%"
              label="Diagnosis accuracy"
              sub="across the fault taxonomy"
            />
            <Stat
              value="100%"
              label="Verified before apply"
              sub="every fix re-simulated"
            />
            <Stat
              value="Every"
              label="Major network vendor"
              sub="hardware and vendor agnostic"
            />
            <Stat
              value="0"
              label="Telemetry sent"
              sub="runs on your hardware"
            />
          </div>
        </Container>
      </section>

      {/* ----------------------------------------------------- 4-stage pipeline */}
      <Section>
        <SectionHeading
          eyebrow="The safety pipeline"
          title="Four stages between a broken config and a human."
          description="Every diagnosis flows left to right through the same gauntlet. Nothing reaches you until Hammerhead has re-simulated the fix and proved it holds."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-4">
          {pipeline.map((stage, i) => {
            const Icon = stage.icon;
            const isVerify = stage.tone === "success";
            return (
              <div key={stage.name} className="relative">
                <div
                  className={
                    "flex h-full flex-col rounded-xl border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md " +
                    (isVerify
                      ? "border-success/40"
                      : "border-border hover:border-primary/30")
                  }
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={
                        "flex h-10 w-10 items-center justify-center rounded-lg " +
                        (isVerify
                          ? "bg-success/10 text-success"
                          : "bg-primary/10 text-primary")
                      }
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-sm text-muted-foreground">
                      {stage.step}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                    {stage.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {stage.summary}
                  </p>
                  <p
                    className={
                      "mt-4 font-mono text-[0.7rem] leading-relaxed " +
                      (isVerify ? "text-success" : "text-primary")
                    }
                  >
                    {stage.detail}
                  </p>
                </div>

                {/* connector arrow between cards */}
                {i < pipeline.length - 1 && (
                  <span className="pointer-events-none absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm">
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-xl border border-success/30 bg-success/10 p-5">
          <ShieldCheck className="mt-0.5 h-5 w-5 flex-none text-success" />
          <p className="text-pretty text-sm leading-relaxed text-foreground">
            <span className="font-medium">Nothing reaches you without a proof.</span>{" "}
            Any proposed patch is re-simulated against your network's digital
            twin before a human ever sees it. If it does not preserve
            reachability, it is rejected automatically. Every fix that does
            reach you is gated behind an explicit{" "}
            <span className="font-mono text-success">✓ Apply</span> /{" "}
            <span className="font-mono text-muted-foreground">✗ Reject</span>.
          </p>
        </div>
      </Section>

      {/* ----------------------------------------------------------- Surfaces */}
      <section className="border-t border-border bg-card">
        <Container className="py-20 md:py-28">
          <SectionHeading
            eyebrow="Two surfaces"
            title="Ask it live, or gate it on every commit."
            description="The same diagnose → patch → verify engine, exposed two ways: an interactive chat for the engineer at the keyboard, and an automated PR gate for the whole team."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {/* /studio */}
            <Card className="flex flex-col">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MessageSquare className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-mono text-base font-semibold text-foreground">
                    /studio
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Chat + config editor
                  </p>
                </div>
              </div>
              <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
                A Claude-style chat wired to 15 network tools and an in-session
                config editor. Ask in plain English; it reasons over your fabric
                and proposes verified edits inline.
              </p>

              <div className="mt-6 overflow-hidden rounded-lg border border-border bg-foreground">
                <div className="space-y-3 px-4 py-4 text-sm">
                  <p className="text-white/90">
                    <span className="font-mono text-success">you </span>why
                    can&apos;t edge-2 reach db-core?
                  </p>
                  <p className="font-mono text-[0.78rem] leading-relaxed text-white/45">
                    → reachability(edge-2, db-core) = UNREACHABLE
                    <br />→ diagnose() = BGP session down · edge-2
                    <br />→ propose_edit() = 3-line CLI patch
                  </p>
                  <p className="text-white/90">
                    <span className="font-mono text-success">studio </span>
                    Found it, peer ASN mismatch. Patch verified by Hammerhead.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                  15 network tools
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {studioTools.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border bg-background px-2 py-1 font-mono text-[0.7rem] text-foreground/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Card>

            {/* /changes */}
            <Card className="flex flex-col">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <GitPullRequest className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-mono text-base font-semibold text-foreground">
                    /changes
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Pull-request gating
                  </p>
                </div>
              </div>
              <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
                A webhook receiver that runs diagnose → patch → verify on every
                commit, posts a verdict comment with a deep link, and can gate
                the merge. Export the full ledger as{" "}
                <span className="font-mono text-foreground">/changes.csv</span>{" "}
                or <span className="font-mono text-foreground">.json</span>.
              </p>

              <CodeBlock
                className="mt-6"
                title="PR #482 · check"
                lines={[
                  { prompt: "▸", text: "diagnose  route-map blackhole · core-1" },
                  { prompt: "▸", text: "patch     3-line CLI diff emitted" },
                  { prompt: "▸", text: "verify    reachability 99.4% ✓" },
                  { text: "" },
                  { text: "VERDICT  SAFE TO MERGE  →  view diagnosis" },
                  { text: "HMAC verified · re-simulated offline", muted: true },
                ]}
              />

              <div className="mt-6 flex flex-wrap gap-2">
                <Badge tone="success">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  posts verdict comment
                </Badge>
                <Badge tone="primary">deep link</Badge>
                <Badge tone="neutral">merge gate</Badge>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------- Security & sovereignty */}
      <Section>
        <SectionHeading
          eyebrow="Security &amp; sovereignty"
          title="Your configs never leave your control."
          description="Config Studio is a FastAPI web app you run yourself. It is built to be trusted with the most sensitive thing in your network, the source of truth."
        />

        <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {trust.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex gap-4">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ----------------------------------------------- Adversarial robustness */}
      <Section>
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
            <div className="p-8 md:p-12">
              <Badge tone="primary">
                <ShieldAlert className="h-3.5 w-3.5" />
                Adversarial robustness
              </Badge>
              <h3 className="mt-5 text-balance text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                Built for adversarial environments.
              </h3>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                AI-driven workflows attract attempts to hijack them through poisoned inputs. Optimesh Technologies assumes that reality and engineers around it. The result is a layered defense in which no unsafe configuration can reach production, regardless of what the model produces.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  "Two-layer defense: input sanitization plus offline verification.",
                  "Adversarial demo fabrics included for reproducible red-team testing.",
                  "Deterministic, audit-ready output at every step.",
                ].map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2.5 text-sm text-foreground/80"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-success" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-center gap-5 border-t border-border bg-background p-8 md:border-l md:border-t-0 md:p-12">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Defense in depth
              </span>
              <div className="flex items-start gap-4 rounded-lg border border-border bg-card p-4">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-md bg-primary/10 font-mono text-xs font-medium text-primary">
                  01
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Input sanitization
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Prompt-injection payloads buried in configuration are quarantined before the model ever sees them.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-lg border border-border bg-card p-4">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-md bg-primary/10 font-mono text-xs font-medium text-primary">
                  02
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Offline verification
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Any proposed patch is re-simulated against your configured forwarding plane. Anything that breaks reachability is rejected automatically.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-success/30 bg-success/10 px-4 py-3">
                <CheckCircle2 className="h-4 w-4 flex-none text-success" />
                <p className="text-sm font-medium text-foreground">
                  No unsafe configuration reaches production.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* --------------------------------------------------------------- CTA */}
      <Section className="pb-28">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-foreground px-8 py-16 text-center md:px-16 md:py-20">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.07]" />
          <div className="relative mx-auto max-w-2xl">
            <Eyebrow className="!text-background/70">Early access</Eyebrow>
            <h2 className="mt-4 text-balance text-3xl font-medium tracking-tight text-background sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
              Hand the tired engineer a verified fix.
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-background/70">
              Run Config Studio on your own hardware, point it at your fabric,
              and let it diagnose and ship a verified fix in seconds. Nothing
              goes out the door without an offline proof that it is safe.
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
                to="/products/hammerhead"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-background/25 px-6 text-[0.95rem] font-medium text-background transition-colors hover:bg-background/10"
              >
                Powered by Hammerhead
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
