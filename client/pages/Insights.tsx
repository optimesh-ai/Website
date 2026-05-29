import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import {
  Container,
  Section,
  Badge,
} from "@/components/site/primitives";
import {
  getSortedArticles,
  authors,
  formatDate,
} from "@/data/articles";

export default function Insights() {
  const posts = getSortedArticles();

  return (
    <Layout>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-70" />
        <Container className="relative pb-16 pt-32 md:pb-20 md:pt-40">
          <div className="max-w-3xl">
            <div className="animate-fade-up">
              <Badge tone="primary">Insights</Badge>
            </div>
            <h1
              className="animate-fade-up mt-6 text-balance text-[2.6rem] font-medium leading-[1.06] tracking-tight text-foreground sm:text-6xl"
              style={{ animationDelay: "80ms" }}
            >
              Notes on the future of network intelligence.
            </h1>
            <p
              className="animate-fade-up mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground"
              style={{ animationDelay: "160ms" }}
            >
              Writing from the Optimesh Technologies founders on network verification, the
              shift to AI-driven operations, and where the field goes next — from
              the research frontier to the operations floor.
            </p>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------- Article list */}
      <Section className="pt-4 md:pt-6 pb-28">
        <div>
          {posts.map((post, i) => {
            const author = authors[post.author];
            return (
              <Link
                key={post.slug}
                to={`/insights/${post.slug}`}
                className="group block border-t border-border py-10 first:border-t-0 md:py-12"
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-12">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-2.5 font-mono text-xs text-muted-foreground">
                      <span>{formatDate(post.date)}</span>
                      <span aria-hidden>·</span>
                      <span>{post.readingMinutes} min read</span>
                    </div>
                    <h2 className="mt-3 text-2xl font-medium leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary md:text-[1.75rem]">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                      {post.deck}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {post.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border bg-muted px-2.5 py-0.5 font-mono text-[0.7rem] text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 md:w-48 md:flex-none md:pt-1">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-primary/10 font-mono text-sm font-medium text-primary">
                      {author.initials}
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-foreground">
                        {author.name}
                      </div>
                      <div className="truncate font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">
                        {post.author === "chandler" ? "Research" : "Industry"}
                      </div>
                    </div>
                  </div>
                </div>

                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Read article
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </Section>
    </Layout>
  );
}
