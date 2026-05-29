import { useState } from "react";
import { Layout } from "@/components/Layout";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Users,
  Map,
  Wrench,
  Tag,
  LifeBuoy,
} from "lucide-react";
import {
  Container,
  Section,
  SectionHeading,
  Eyebrow,
  Badge,
  Button,
} from "@/components/site/primitives";

type Status = "idle" | "loading" | "success" | "error";

const partnerBenefits = [
  {
    icon: <Users className="h-5 w-5" />,
    title: "Direct access to the founding team",
    body: "Talk to the people building Optimesh Technologies — no support queue, no account layers between you and the engineers.",
  },
  {
    icon: <Map className="h-5 w-5" />,
    title: "Influence over the roadmap",
    body: "Tell us what your network actually needs. Early partners help decide what we build next.",
  },
  {
    icon: <Wrench className="h-5 w-5" />,
    title: "Hands-on onboarding",
    body: "We set Optimesh Technologies up against your environment and your configs, so it's useful on day one.",
  },
  {
    icon: <Tag className="h-5 w-5" />,
    title: "Early-adopter pricing",
    body: "Favorable terms for the teams who partner with us before general availability.",
  },
  {
    icon: <LifeBuoy className="h-5 w-5" />,
    title: "Priority support",
    body: "Questions and issues from early partners go to the front of the line.",
  },
];

const faqs = [
  {
    question: "What is Optimesh Technologies?",
    answer:
      "Offline network intelligence. Hammerhead simulates your forwarding plane from a directory of device configurations, and Config Studio diagnoses faults and generates verified fixes — all without touching a live device.",
  },
  {
    question: "Do I have to change my infrastructure or install agents?",
    answer:
      "No. Optimesh Technologies works from your existing device configurations. It does not require agents on your devices and does not replace your current tooling.",
  },
  {
    question: "Which vendors are supported?",
    answer:
      "14 vendor config dialects, including Cisco (IOS, NX-OS, IOS-XR, ASA), Arista EOS, Juniper Junos, Cumulus/FRR, and more — with automatic detection, so there are no per-vendor flags to manage.",
  },
  {
    question: "Does my config data leave my network?",
    answer:
      "No. Hammerhead runs locally. Config Studio sends configurations only to the LLM you configure — including a self-hosted model — and is air-gap capable with no telemetry.",
  },
  {
    question: "Is it a real-time digital twin?",
    answer:
      "No. Optimesh Technologies analyzes your configurations — the control and forwarding plane — rather than streaming live device telemetry. It's fast, deterministic offline simulation you can run on every change.",
  },
  {
    question: "What does the early-access partnership involve?",
    answer:
      "We work directly with your network team to deploy Optimesh Technologies in your environment, validate it against your infrastructure, and refine the product together.",
  },
];

export default function EarlyAccess() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = email.trim();
    if (!trimmed) {
      setStatus("error");
      setError("Please enter your email address.");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      if (!res.ok) {
        let message = "Something went wrong. Please try again.";
        try {
          const data = (await res.json()) as { error?: string };
          if (data?.error) message = data.error;
        } catch {
          /* response had no JSON body */
        }
        setStatus("error");
        setError(message);
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setError(
        "We couldn't reach the server. Please check your connection and try again.",
      );
    }
  };

  return (
    <Layout>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-70" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[56rem] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

        <Container className="relative pb-20 pt-32 md:pb-24 md:pt-40">
          <div className="mx-auto max-w-2xl text-center">
            <div className="animate-fade-up flex justify-center">
              <Badge tone="primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Early access
              </Badge>
            </div>

            <h1
              className="animate-fade-up mt-6 text-balance text-[2.6rem] font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl"
              style={{ animationDelay: "80ms" }}
            >
              Get early access to Optimesh Technologies.
            </h1>

            <p
              className="animate-fade-up mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
              style={{ animationDelay: "160ms" }}
            >
              We're working hands-on with a small group of network teams who are
              tired of guessing about what a config change will do. Leave your
              email and we'll be in touch about partnering early.
            </p>

            {/* --------------------------------------------------------- Form */}
            <div
              className="animate-fade-up mx-auto mt-10 max-w-md"
              style={{ animationDelay: "240ms" }}
            >
              {status === "success" ? (
                <div className="flex items-start gap-3 rounded-xl border border-success/20 bg-success/10 p-6 text-left">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-success" />
                  <div>
                    <p className="font-medium text-foreground">
                      Thanks — you're on the list.
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      We'll reach out shortly to talk about getting Optimesh Technologies
                      running in your environment.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <label htmlFor="early-access-email" className="sr-only">
                      Work email
                    </label>
                    <input
                      id="early-access-email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@yourcompany.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") {
                          setStatus("idle");
                          setError("");
                        }
                      }}
                      disabled={status === "loading"}
                      aria-invalid={status === "error"}
                      className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60"
                    />
                    <Button
                      type="submit"
                      size="md"
                      disabled={status === "loading"}
                      className="shrink-0"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Requesting
                        </>
                      ) : (
                        <>
                          Request access
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
                    </Button>
                  </div>
                  {status === "error" && error && (
                    <p className="mt-3 text-left text-sm text-destructive">
                      {error}
                    </p>
                  )}
                  <p className="mt-3 text-left text-xs text-muted-foreground">
                    No spam. We'll only use your email to talk about early
                    access.
                  </p>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------ What partners get */}
      <section className="border-y border-border bg-card">
        <Container className="py-20 md:py-28">
          <SectionHeading
            eyebrow="The partnership"
            title="What early partners get"
            description="Early access is a collaboration, not a waitlist. Here's what working with us looks like."
          />
          <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {partnerBenefits.map((benefit) => (
              <div key={benefit.title} className="flex gap-4">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {benefit.icon}
                </span>
                <div>
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {benefit.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ----------------------------------------------------------------- FAQ */}
      <Section className="pb-28">
        <SectionHeading
          eyebrow="Questions"
          title="Frequently asked questions"
          align="center"
          className="mx-auto"
        />
        <div className="mx-auto mt-14 max-w-3xl divide-y divide-border border-y border-border">
          {faqs.map((faq) => (
            <div key={faq.question} className="py-7">
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {faq.question}
              </h3>
              <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-2xl text-center">
          <p className="text-pretty text-muted-foreground">
            Have a question that isn't answered here?{" "}
            <a
              href="mailto:contact@optimesh.ai"
              className="font-medium text-primary transition-colors hover:text-primary/80"
            >
              Email the team
            </a>
            .
          </p>
        </div>
      </Section>
    </Layout>
  );
}
