import { Layout } from "@/components/Layout";
import { ArrowRight, Check, Minus } from "lucide-react";
import {
  ButtonLink,
  Container,
  Section,
  SectionHeading,
  Eyebrow,
} from "@/components/site/primitives";
import { Reveal } from "@/components/site/Reveal";
import { RoiCalculator } from "@/components/site/RoiCalculator";

/* ----------------------------------------------------------------------------
 * /compare — named, side-by-side comparisons against the way the work is
 * bought today. Each block: the incumbent column, the Optimesh column
 * (highlighted), a verdict strip. Numbers trace to the GTM claim ledger.
 * -------------------------------------------------------------------------- */

type VersusRow = {
  label: string;
  theirs: React.ReactNode;
  ours: React.ReactNode;
};

function Versus({
  eyebrow,
  title,
  description,
  theirName,
  ourName,
  rows,
  verdict,
  cta,
}: {
  eyebrow: string;
  title: string;
  description: string;
  theirName: string;
  ourName: string;
  rows: VersusRow[];
  verdict: string;
  cta: { to?: string; href?: string; label: string };
}) {
  return (
    <Section>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />

      {/* Desktop / tablet: three-column table */}
      <Reveal>
        <div className="mt-12 hidden overflow-hidden rounded-2xl border border-border shadow-sm md:block">
          <div className="grid grid-cols-[1.1fr_1fr_1fr] border-b border-border bg-muted/40 text-sm font-medium">
            <div className="px-6 py-4 text-muted-foreground"> </div>
            <div className="px-6 py-4 text-muted-foreground">{theirName}</div>
            <div className="bg-primary/[0.06] px-6 py-4 text-primary">
              {ourName}
            </div>
          </div>
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[1.1fr_1fr_1fr] border-b border-border bg-card text-[0.95rem] last:border-b-0"
            >
              <div className="px-6 py-5 font-medium text-foreground">
                {row.label}
              </div>
              <div className="flex items-start gap-2.5 px-6 py-5 leading-relaxed text-muted-foreground">
                <Minus className="mt-1 h-4 w-4 shrink-0 text-muted-foreground/50" />
                <span>{row.theirs}</span>
              </div>
              <div className="flex items-start gap-2.5 bg-primary/[0.04] px-6 py-5 leading-relaxed text-foreground">
                <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
                <span>{row.ours}</span>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Mobile: stacked cards, one per row */}
      <div className="mt-10 grid gap-3 md:hidden">
        {rows.map((row) => (
          <div
            key={row.label}
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
          >
            <p className="text-sm font-semibold text-foreground">{row.label}</p>
            <div className="mt-3 flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
              <Minus className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/50" />
              <span>
                <span className="font-medium text-foreground/70">
                  {theirName}:
                </span>{" "}
                {row.theirs}
              </span>
            </div>
            <div className="mt-2 flex items-start gap-2.5 rounded-lg bg-primary/[0.05] p-3 text-sm leading-relaxed text-foreground">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>
                <span className="font-medium text-primary">{ourName}:</span>{" "}
                {row.ours}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Verdict strip */}
      <Reveal>
        <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-2xl border border-primary/25 bg-primary/[0.05] px-6 py-6 sm:flex-row sm:items-center md:px-8">
          <p className="text-pretty text-lg font-medium tracking-tight text-foreground md:text-xl">
            {verdict}
          </p>
          {cta.href ? (
            <a
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              {cta.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          ) : (
            <ButtonLink to={cta.to!} variant="primary" size="md" className="shrink-0">
              {cta.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
          )}
        </div>
      </Reveal>
    </Section>
  );
}

export default function Compare() {
  return (
    <Layout>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-70" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[58rem] -translate-x-1/2 animate-drift rounded-full bg-primary/5 blur-3xl" />

        <Container className="relative pb-16 pt-32 md:pb-20 md:pt-40">
          <div className="max-w-3xl">
            <Eyebrow className="animate-fade-up" >Head to head</Eyebrow>
            <h1
              className="animate-fade-up mt-4 text-balance text-[2.6rem] font-medium leading-[1.06] tracking-tight text-foreground sm:text-6xl lg:text-[4rem]"
              style={{ animationDelay: "80ms" }}
            >
              Ditch the ritual. Keep the rigor.
            </h1>
            <p
              className="animate-fade-up mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground"
              style={{ animationDelay: "160ms" }}
            >
              Here is how the work gets done today — the open-source pipeline,
              the five-figure audit, the six-figure platform — next to what
              Optimesh does in its place. Every number below is a published
              price or a reproducible benchmark.
            </p>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------- 1. Hammerhead vs Batfish */}
      <div className="border-y border-border bg-card/50">
        <Versus
          eyebrow="Simulation · Hammerhead vs. Batfish"
          title="Same answers. 345× sooner."
          description="We replayed 14,342 routes across 226 devices from Batfish's own shipped test corpora — and matched every single one. Their tool, their data, our speed."
          theirName="Batfish pipeline"
          ourName="Hammerhead"
          rows={[
            {
              label: "Getting to the first answer",
              theirs:
                "Java, Docker, a coordinator service, pybatfish, and a server to keep it all running.",
              ours: (
                <>
                  One 30&nbsp;MB static binary.{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em]">
                    hammerhead simulate ./configs/
                  </code>{" "}
                  is the whole install guide.
                </>
              ),
            },
            {
              label: "Speed",
              theirs: "Minutes per snapshot on real networks.",
              ours: "Milliseconds. 345× faster on average, 1,640× at peak.",
            },
            {
              label: "Accuracy",
              theirs: "The reference implementation.",
              ours:
                "14,342/14,342 routes matched on Batfish's own corpora; 99.93% FIB parity across 52 corpora; 98.5% against real routers.",
            },
            {
              label: "In your CI",
              theirs: "A service your pipeline has to reach and you have to babysit.",
              ours: "A binary your pipeline just runs. Fails the PR, annotates the line.",
            },
            {
              label: "Protocols & vendors",
              theirs: "Broad coverage, JVM-bound.",
              ours: "14 vendors. OSPF, BGP, IS-IS, EIGRP, IPv6 — plus a Python SDK and an MCP server for AI agents.",
            },
          ]}
          verdict="Ditch the JVM. Keep the answers."
          cta={{
            href: "https://github.com/optimesh-ai/hammerhead",
            label: "Get Hammerhead",
          }}
        />
      </div>

      {/* -------------------------------- 2. RuleHawk vs the firewall audit */}
      <Versus
        eyebrow="Firewall hygiene · RuleHawk vs. the audit engagement"
        title="The $46,000 audit is now a CI check."
        description="Policy-suite vendors price the human engagement openly: a technical audit lists at $9,200, a JumpStart at $23,000–$69,000, a resident engineer at up to $349,000 a year — three weeks of calendar to learn which rules are garbage."
        theirName="Policy-suite audit"
        ourName="RuleHawk"
        rows={[
          {
            label: "Price",
            theirs: "$9,200 for the audit alone; $46,000 for the mid-size JumpStart.",
            ours: "Free.",
          },
          {
            label: "Time to findings",
            theirs: "Around three weeks of scoping, deployment, and workshops.",
            ours: "One second. Paste the config, get the ranked report.",
          },
          {
            label: "What you get",
            theirs: "A PDF of findings and recommendations.",
            ours: (
              <>
                The exact packet that breaks your segmentation, pinned to the
                exact rule that permits it:{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em]">
                  10.20.0.1 → 10.10.0.1:445 via rule 8
                </code>
              </>
            ),
          },
          {
            label: "Where your config goes",
            theirs: "Into the vendor's platform, through the consultant's laptop.",
            ours: "Nowhere. Runs in your browser or your CI; the config never leaves your machine.",
          },
          {
            label: "How often",
            theirs: "Annually, when the budget clears.",
            ours: "On every pull request — a GitHub Action that fails the check and annotates the offending line.",
          },
          {
            label: "When it can't prove isolation",
            theirs: "Judgment call in the appendix.",
            ours: "Fails closed. RuleHawk never certifies isolation it could not verify.",
          },
        ]}
        verdict="Three weeks of consulting, evaporated on paste."
        cta={{
          href: "https://optimesh-ai.github.io/RuleHawk/",
          label: "Run a free audit now",
        }}
      />

      {/* --------------------------- 3. Config Studio vs the digital twin */}
      <div className="border-y border-border bg-card/50">
        <Versus
          eyebrow="Remediation · Config Studio vs. the digital twin"
          title="A map of the fire is not an extinguisher."
          description="Digital-twin platforms collect beautifully and show you your network in exquisite detail — including the exquisite detail of it breaking. The U.S. DoD just signed a $50M ceiling for one. It still doesn't write the fix."
          theirName="Digital-twin platform"
          ourName="Config Studio"
          rows={[
            {
              label: "When the network breaks",
              theirs: "Shows you where, in high resolution. The fix is still your night.",
              ours: "Diagnoses the fault, writes the patch, and proves it safe — diagnose → patch → verify.",
            },
            {
              label: "Trusting an AI-written change",
              theirs: "Not their department.",
              ours: "Every AI-proposed fix must pass a deterministic forwarding-plane verdict before a human can even click apply. No verdict, no apply — ever.",
            },
            {
              label: "Proof, not vibes",
              theirs: "Dashboards and path search.",
              ours: "Full forwarding-plane simulation — OSPF, BGP, IS-IS, EIGRP, IPv6, MPLS — plus blast-radius and what-if on your exact change.",
            },
            {
              label: "Never-seen-before failures",
              theirs: "Alerts you. Eventually.",
              ours: "78% restored autonomously in benchmark — faults from outside the training taxonomy, verified before apply.",
            },
            {
              label: "Where it runs",
              theirs: "A heavy platform with credentialed access to everything.",
              ours: "Your hardware. On-prem or air-gapped, offline, no telemetry.",
            },
            {
              label: "What it costs",
              theirs: "Six figures per year is the entry ticket; $50M is the ceiling on record.",
              ours: "$50K–$400K — and 1 in 5 serious outages costs over $1M, so one caught mistake pays for it many times over.",
            },
          ]}
          verdict="They sell you a picture of the problem. We sell you the patch."
          cta={{ to: "/products/config-studio", label: "See Config Studio" }}
        />
      </div>

      {/* ------------------------------------------------------- Calculator */}
      <Section id="savings">
        <SectionHeading
          eyebrow="Do the math on your network"
          title="How much would Optimesh save you?"
          description="Drag the sliders to your reality. The model and its assumptions are on the page — no email required to see the number."
        />
        <div className="mt-12">
          <RoiCalculator />
        </div>
      </Section>

      {/* ------------------------------------------------------------ Closer */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            align="center"
            eyebrow="The short version"
            title="Proof, not opinions. Packets, not PDFs."
            description="Nothing ships on vibes. Try the free auditor in your browser, drop the binary into CI, and bring the verifier to your next change window."
          />
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink to="/early-access" variant="primary" size="lg">
              Request access
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
            <a
              href="https://optimesh-ai.github.io/RuleHawk/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-card px-6 text-[0.95rem] font-medium text-foreground ring-1 ring-inset ring-border transition-all hover:bg-muted/60"
            >
              Try RuleHawk free
            </a>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
