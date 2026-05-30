import { Layout } from "@/components/Layout";
import { Printer } from "lucide-react";
import {
  ButtonLink,
  Button,
  Container,
  Eyebrow,
  Badge,
} from "@/components/site/primitives";

const contents = [
  { id: "abstract", label: "Abstract" },
  { id: "problem", label: "1. The problem" },
  { id: "hammerhead", label: "2. Hammerhead" },
  { id: "config-studio", label: "3. Config Studio" },
  { id: "validation", label: "4. Validation and performance" },
  { id: "security", label: "5. Security and data locality" },
  { id: "conclusion", label: "6. Conclusion" },
];

export default function Whitepaper() {
  return (
    <Layout>
      {/* ---------------------------------------------------------------- Header */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-60" />
        <Container className="relative pb-12 pt-32 md:pt-40">
          <div className="mx-auto max-w-3xl">
            <Badge tone="primary">White paper</Badge>
            <h1 className="mt-6 text-balance text-4xl font-medium leading-[1.08] tracking-tight text-foreground sm:text-5xl">
              Offline Network Verification
            </h1>
            <p className="mt-5 text-pretty text-xl leading-relaxed text-muted-foreground">
              A technical overview of Hammerhead and Config Studio: how Optimesh Technologies
              reconstructs the forwarding plane from configuration, answers
              reachability questions in milliseconds, and proves a fix is safe
              before anyone applies it.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-muted-foreground">
              <span>Optimesh Technologies</span>
              <span aria-hidden>·</span>
              <span>Version 1.0</span>
              <span aria-hidden>·</span>
              <span>2026</span>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/early-access" variant="primary" size="md">
                Request access
              </ButtonLink>
              <Button
                variant="secondary"
                size="md"
                onClick={() => window.print()}
              >
                <Printer className="h-4 w-4" />
                Print or save as PDF
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------------- Contents */}
      <Container className="pb-4">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Contents
            </p>
            <ol className="mt-4 grid gap-2 sm:grid-cols-2">
              {contents.map((c) => (
                <li key={c.id}>
                  <a
                    href={`#${c.id}`}
                    className="text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>

      {/* ----------------------------------------------------------------- Body */}
      <Container className="pb-20">
        <article className="mx-auto max-w-3xl">
          <Section id="abstract" heading="Abstract">
            <P>
              Modern networks are configured by hand, one device at a time, and
              changed constantly. Yet the people making those changes rarely have
              a reliable way to answer a basic question before they hit enter:
              what will this change actually do to traffic across the fabric.
              Optimesh Technologies closes that gap with two products. Hammerhead is an offline
              simulator that reconstructs the forwarding plane from device
              configuration and answers reachability questions analytically.
              Config Studio builds on that engine to diagnose configuration
              faults and generate fixes that are verified safe before a human
              reviews them.
            </P>
            <P>
              This paper describes how both systems work, the validation behind
              their accuracy claims, and the security model that lets them run
              entirely on a customer's own hardware.
            </P>
          </Section>

          <Section id="problem" heading="1. The problem">
            <P>
              Network configuration determines how every packet is forwarded, but
              that behavior is emergent. It arises from the interaction of routing
              protocols, access policy, and topology across many devices. A
              single edit can change reachability several hops away in ways that
              are not visible in the diff. Reviewers cannot trace those effects by
              reading configuration, and testing against live devices only covers
              the specific paths an operator happens to probe.
            </P>
            <P>
              Existing analysis tools can reason about configuration, but they
              were built as heavyweight, server-bound systems. They are slow to
              start, depend on a managed runtime, and take long enough to run that
              teams reserve them for occasional audits rather than routine
              changes. The result is that the most critical system in most
              organizations is changed with less automated checking than a typical
              web application receives.
            </P>
            <P>
              Optimesh Technologies starts from a different premise. If verification is fast
              enough and light enough, it can run on every change, as a normal
              part of the workflow rather than a special event.
            </P>
          </Section>

          <Section id="hammerhead" heading="2. Hammerhead">
            <H3>2.1 Configuration parsing</H3>
            <P>
              Hammerhead ingests a directory of device configurations and detects
              each vendor dialect automatically, with no per-file flags. It
              covers every major network vendor in production today, and
              normalizes their configuration languages into a single internal
              model so that every later stage of the engine is fully
              vendor-independent.
            </P>

            <H3>2.2 Protocol simulation</H3>
            <P>
              From the parsed model, Hammerhead simulates control-plane
              convergence. It supports OSPFv2 and v3 with multi-area, stub, NSSA
              and virtual-link behavior, BGP-4 with route reflection,
              confederations, L3VPN and EVPN, plus EIGRP, IS-IS levels 1 and 2,
              and RIPv2. It also models data-plane constructs that affect
              forwarding, including MPLS L3VPN, VXLAN and EVPN overlays, GRE and
              IPSec tunnels, NAT in its static, dynamic and PAT forms, and layer-2
              behavior such as switchport trunking, spanning tree, and per-VLAN
              forwarding.
            </P>

            <H3>2.3 Forwarding-plane construction</H3>
            <P>
              The simulator resolves these protocols into routing tables and then
              into forwarding tables for every device. At that point Hammerhead
              has a complete model of how each device will forward a packet,
              without ever contacting a live device. Reachability and traceroute
              queries are answered against this model, including equal-cost
              multipath, tunnel resolution, and access-list evaluation along the
              path.
            </P>

            <H3>2.4 Query and analysis engine</H3>
            <P>
              Hammerhead exposes thirty-two subcommands that fall into a few
              groups:
            </P>
            <Ul
              items={[
                "Parse and simulate: build the RIB and FIB for a snapshot.",
                "Query: reachability, hop-by-hop traceroute, FIB and RIB inspection, and cross-device path joins.",
                "Analyze: diff the forwarding plane between two snapshots, detect loops, scan for single points of failure, and measure the blast radius of a link or device failure.",
                "Audit: evaluate access lists and check policy compliance.",
              ]}
            />
            <P>
              Beneath these queries is a symbolic engine that represents sets of
              packets using binary decision diagrams. Rather than testing one
              packet at a time, it reasons about entire equivalence classes of
              headers at once, which is what allows Hammerhead to make statements
              about all packets rather than a sample. The same machinery powers
              differential reachability analysis, which reports exactly how a
              configuration change alters what can reach what.
            </P>

            <H3>2.5 Policy and compliance</H3>
            <P>
              Operators can express intent as policy written in a small YAML
              language, covering reachability and non-reachability requirements,
              maximum hop counts, loop freedom, and path and protocol
              constraints, each with a severity level. Hammerhead ships templates
              aligned to common control frameworks so that posture can be checked
              on every run rather than reconstructed during an audit.
            </P>

            <H3>2.6 Interfaces</H3>
            <P>
              The same engine is available as a command-line tool, a Python SDK,
              and a REST API, and it slots into a continuous-integration pipeline
              so that a proposed change can be simulated and gated before it
              merges. A set of Jupyter notebooks covers common analysis tasks for
              teams that prefer an interactive workflow.
            </P>

            <H3>2.7 Engineering</H3>
            <P>
              Hammerhead is written entirely in safe Rust, with no unsafe code,
              and ships as a single static binary with no runtime dependency. Its
              output is deterministic: identical input always produces identical
              results, which is what makes a diff between two runs meaningful. The
              codebase carries more than 1,450 tests covering parsers, protocol
              convergence, and forwarding.
            </P>
          </Section>

          <Section id="config-studio" heading="3. Config Studio">
            <P>
              Config Studio uses Hammerhead as its verifier and adds an
              AI-driven workflow for diagnosing faults and repairing them. Its
              design principle is simple. A model may propose anything, but
              nothing reaches an operator until the forwarding-plane simulator has
              confirmed it is safe.
            </P>

            <H3>3.1 The four-stage pipeline</H3>
            <P>
              Every request flows through four stages in order:
            </P>
            <Ul
              items={[
                "Sanitize. Twenty-two always-on heuristics strip prompt-injection attempts that may be hidden in configuration comments, before any model sees the input.",
                "Diagnose. A model classifies the fault against a taxonomy of thirty-two classes and returns the fault type, the suspect device, a confidence score, and its reasoning.",
                "Patch. The model produces a minimal command-line change, the few lines an engineer would have typed, rather than rewriting the configuration.",
                "Verify. Hammerhead re-simulates the network with the proposed patch applied. Any change that drops reachability below the configured threshold is rejected before it is ever shown.",
              ]}
            />
            <P>
              Only patches that pass verification reach a human, and even then
              they are presented for explicit approval rather than applied
              automatically.
            </P>

            <H3>3.2 Surfaces</H3>
            <P>
              Config Studio offers two ways to work. The first is an interactive
              studio: a chat interface backed by fifteen network tools and an
              in-session configuration editor, for investigating a fabric and
              proposing edits. The second is an automated pull-request check: a
              webhook receiver that runs the full diagnose, patch, and verify
              pipeline on every change, posts a verdict, and can gate the merge.
              The full ledger of verifications can be exported as CSV or JSON.
            </P>

            <H3>3.3 Vendor and hardware coverage</H3>
            <P>
              Config Studio is hardware and vendor agnostic. The same engine
              diagnoses and patches every major network configuration language
              in production today. Heterogeneous fabrics, multi-vendor
              deployments, and air-gapped environments are first-class, not
              afterthoughts.
            </P>

            <H3>3.4 A digital twin of the network</H3>
            <P>
              Config Studio runs against a complete digital twin of the
              network's configured forwarding plane, reconstructed from the
              configuration files that determine how every packet moves. No
              agents on devices, no live telemetry collection, and no production
              risk. That is what lets it run offline, deterministically, and
              fast enough to gate every change before it ships.
            </P>
          </Section>

          <Section id="validation" heading="4. Validation and performance">
            <P>
              Accuracy claims are only useful if they are measured against
              something. Hammerhead is cross-checked against industry-standard
              analysis and against a live routing stack as ground truth. On a
              corpus of dozens of real-world topologies it matches the
              industry-standard reference at 99.93 percent forwarding-plane
              accuracy.
            </P>
            <P>
              Performance is the property that makes routine use practical. Across
              the same comparison, Hammerhead runs about 800 times faster than the
              industry standard on average.
              As a concrete example, it parses and simulates a 1,280-device
              large-scale data center topology of more than a thousand devices
              in about 279 milliseconds, end to end, on a single laptop-class
              host.
            </P>
            <P>
              For Config Studio, the two measures that matter to an operator
              are how accurately the system identifies the fault and how much
              faster the network is back to a known-good state. Across the
              supported fault taxonomy, the system reaches 99.6 percent
              diagnostic accuracy and roughly a 99 percent reduction in mean
              time to recovery compared to manual incident response. The AI
              pipeline itself returns a candidate fix in seconds; the remaining
              time is the human review and the controlled apply that any
              responsible operator wants in the loop.
            </P>
          </Section>

          <Section id="security" heading="5. Security and data locality">
            <P>
              Configuration is sensitive, so Optimesh Technologies is built to run where the
              configuration already lives. Hammerhead executes locally. Config
              Studio sends configuration only to the model an operator chooses,
              which can be a self-hosted model, and it is designed to run in
              air-gapped environments with no telemetry leaving the network.
            </P>
            <P>
              The implementation is hardened accordingly. The wrapper carries 304
              test assertions, reports zero known vulnerabilities under standard
              dependency scanning, pins its dependencies by hash, verifies
              webhooks with HMAC, and caps upload sizes to resist decompression
              attacks. The input sanitizer measurably reduces the success rate of
              prompt-injection attempts hidden in configuration text.
            </P>
          </Section>

          <Section id="conclusion" heading="6. Conclusion">
            <P>
              The common thread between the two products is a belief that
              verification belongs in the path of every change, not in an
              occasional audit. Hammerhead makes that economically possible by
              reconstructing the forwarding plane in milliseconds. Config Studio
              uses that speed to turn AI from a source of plausible suggestions
              into a source of verified ones. Together they let a team make
              network changes with the same confidence they already expect from
              their software.
            </P>
            <div className="mt-10 flex flex-col items-start gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-pretty text-muted-foreground">
                Want to evaluate Optimesh Technologies against your own network?
              </p>
              <ButtonLink to="/early-access" variant="primary" size="md">
                Request access
              </ButtonLink>
            </div>
          </Section>
        </article>
      </Container>
    </Layout>
  );
}

/* ---------------------------------------------------------------- primitives */

function Section({
  id,
  heading,
  children,
}: {
  id: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border py-10 first:border-t-0 first:pt-0">
      <h2 className="text-2xl font-medium tracking-tight text-foreground">
        {heading}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-8 text-lg font-semibold tracking-tight text-foreground">
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 text-pretty text-[1.05rem] leading-[1.8] text-muted-foreground">
      {children}
    </p>
  );
}

function Ul({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 leading-relaxed">
          <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-success" />
          <span className="text-muted-foreground">{item}</span>
        </li>
      ))}
    </ul>
  );
}
