import { Layout } from "@/components/Layout";
import { Mail, ArrowRight, BookOpen, Rocket } from "lucide-react";
import {
  Container,
  Section,
  Eyebrow,
  ButtonLink,
  ArrowLink,
  Badge,
} from "@/components/site/primitives";

export default function Contact() {
  return (
    <Layout>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-70" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[56rem] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

        <Container className="relative pb-16 pt-32 md:pb-20 md:pt-40">
          <div className="mx-auto max-w-2xl text-center">
            <div className="animate-fade-up flex justify-center">
              <Badge tone="primary">Contact</Badge>
            </div>
            <h1
              className="animate-fade-up mt-6 text-balance text-[2.6rem] font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl"
              style={{ animationDelay: "80ms" }}
            >
              Get in touch
            </h1>
            <p
              className="animate-fade-up mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
              style={{ animationDelay: "160ms" }}
            >
              Questions about Optimesh, your network, or partnering with us?
              We'd genuinely like to hear from you — reach out and you'll get a
              real person on the founding team.
            </p>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------- Cards */}
      <Section className="pb-28 pt-4">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {/* Email */}
          <div className="flex flex-col rounded-2xl border border-border bg-card p-8 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Mail className="h-5 w-5" />
            </span>
            <h2 className="mt-6 text-xl font-semibold tracking-tight text-foreground">
              Email us
            </h2>
            <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
              The fastest way to reach the team. We read every message and
              usually reply within a business day.
            </p>
            <div className="mt-6">
              <ArrowLink href="mailto:contact@optimesh.ai">
                contact@optimesh.ai
              </ArrowLink>
            </div>
          </div>

          {/* Early access */}
          <div className="flex flex-col rounded-2xl border border-primary/30 bg-primary/[0.04] p-8 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Rocket className="h-5 w-5" />
            </span>
            <h2 className="mt-6 text-xl font-semibold tracking-tight text-foreground">
              Want product access?
            </h2>
            <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
              We're partnering with a small group of network teams. If you'd
              like to run Optimesh against your own environment, request early
              access.
            </p>
            <div className="mt-6">
              <ButtonLink to="/early-access" variant="primary" size="md">
                Request early access
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="mx-auto mt-6 max-w-4xl">
          <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-card p-8 shadow-sm sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-muted text-foreground">
                <BookOpen className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  Read our thinking
                </h2>
                <p className="mt-1 text-pretty leading-relaxed text-muted-foreground">
                  Where we think network verification and AI-driven operations
                  are headed — from the founders.
                </p>
              </div>
            </div>
            <ButtonLink
              to="/insights"
              variant="secondary"
              size="md"
              className="shrink-0"
            >
              Browse Insights
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-4xl text-center">
          <Eyebrow>Built for the networks that power the world</Eyebrow>
        </div>
      </Section>
    </Layout>
  );
}
