import { Layout } from "@/components/Layout";
import {
  ArrowRight,
  AlertTriangle,
  Eye,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  ButtonLink,
  ArrowLink,
  Container,
  Section,
  Eyebrow,
  Badge,
  Stat,
} from "@/components/site/primitives";
import { PacketFlowScene } from "@/components/site/PacketFlowScene";
import { Reveal } from "@/components/site/Reveal";

export default function RuleHawk() {
  return (
    <Layout>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-70" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[58rem] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

        <Container className="relative pb-20 pt-32 md:pb-28 md:pt-40">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr]">
            <div>
              <h1
                className="animate-fade-up text-balance text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.6rem]"
                style={{ animationDelay: "80ms" }}
              >
                Audit your firewall rules in seconds.
              </h1>

              <p
                className="animate-fade-up mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
                style={{ animationDelay: "160ms" }}
              >
                Paste your config, get a full report. Shadowed rules, overly permissive
                access, compliance gaps. No sign-up, no install, runs in your browser.
              </p>

              <div
                className="animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row"
                style={{ animationDelay: "240ms" }}
              >
                <a
                  href="https://optimesh-ai.github.io/RuleHawk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-[0.95rem] font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                  Launch RuleHawk
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <ButtonLink to="/products/config-studio" variant="secondary" size="lg">
                  Fix with Config Studio
                </ButtonLink>
              </div>
            </div>

            {/* Audit preview card */}
            <div
              className="animate-fade-up lg:justify-self-end"
              style={{ animationDelay: "260ms" }}
            >
              <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    RuleHawk audit
                  </span>
                  <Badge tone="neutral">instant</Badge>
                </div>

                <div className="mt-5 rounded-lg border border-destructive/20 bg-destructive/5 p-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-destructive">
                      Shadowed rule
                    </span>
                  </div>
                  <p className="mt-2 font-mono text-sm text-foreground">
                    Rule #42 is shadowed by Rule #18
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    permit tcp 10.0.0.0/8 any eq 443 — already matched by broader rule above.
                  </p>
                </div>

                <div className="mt-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-amber-600" />
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-amber-600">
                      Overly permissive
                    </span>
                  </div>
                  <p className="mt-2 font-mono text-sm text-foreground">
                    Rule #7 allows any → any on port range 1-65535
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-lg border border-border bg-background p-3 text-center">
                    <div className="text-lg font-semibold text-destructive">3</div>
                    <div className="text-xs text-muted-foreground">Critical</div>
                  </div>
                  <div className="rounded-lg border border-border bg-background p-3 text-center">
                    <div className="text-lg font-semibold text-amber-600">7</div>
                    <div className="text-xs text-muted-foreground">Warnings</div>
                  </div>
                  <div className="rounded-lg border border-border bg-background p-3 text-center">
                    <div className="text-lg font-semibold text-success">52</div>
                    <div className="text-xs text-muted-foreground">Clean</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------- What it detects — visual split */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div>
                <Eyebrow>What it detects</Eyebrow>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  Six categories of firewall risk.
                </h2>
                <div className="mt-8 space-y-4">
                  {[
                    "Shadowed rules — rules that never fire because a broader rule matches first",
                    "Overly permissive access — wide source/destination ranges, any-any patterns",
                    "Redundant rules — duplicates that add complexity without changing policy",
                    "Ordering issues — first-match semantics producing unintended outcomes",
                    "Compliance gaps — missing deny-all defaults, logging gaps",
                    "Unused rules — zero-hit candidates for cleanup",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                      <p className="text-[0.95rem] leading-relaxed text-muted-foreground">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <div className="relative h-[380px] sm:h-[420px] lg:h-[460px]">
              <PacketFlowScene className="absolute inset-0" />
            </div>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------------------- CTA */}
      <section className="px-6 py-24 md:py-32">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border bg-card px-8 py-16 text-center md:px-16 md:py-20">
          <div className="relative mx-auto max-w-2xl">
            <Reveal>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Know what's wrong with your firewall rules.
              </h2>
              <p className="mt-5 text-lg text-muted-foreground">
                No sign-up. No install. Paste and audit.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href="https://optimesh-ai.github.io/RuleHawk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-[0.95rem] font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Launch RuleHawk
                  <ArrowRight className="h-4 w-4" />
                </a>
                <ButtonLink to="/early-access" variant="secondary" size="lg">
                  Request full platform access
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
