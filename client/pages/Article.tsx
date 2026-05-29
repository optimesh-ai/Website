import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ArrowLeft, ArrowRight, Linkedin } from "lucide-react";
import { ButtonLink, Container } from "@/components/site/primitives";
import { Prose } from "@/components/site/Prose";
import {
  getArticleBySlug,
  getSortedArticles,
  authors,
  formatDate,
} from "@/data/articles";

export default function Article() {
  const { slug } = useParams();
  const article = slug ? getArticleBySlug(slug) : undefined;

  useEffect(() => {
    if (article) document.title = `${article.title} — Optimesh`;
  }, [article]);

  if (!article) return <Navigate to="/insights" replace />;

  const author = authors[article.author];
  const more = getSortedArticles()
    .filter((a) => a.slug !== article.slug)
    .slice(0, 2);

  return (
    <Layout>
      {/* ------------------------------------------------------------- Header */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-60" />
        <Container className="relative pb-10 pt-32 md:pt-40">
          <div className="mx-auto max-w-3xl">
            <Link
              to="/insights"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Insights
            </Link>

            <div className="mt-6 flex flex-wrap gap-2">
              {article.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 font-mono text-[0.7rem] text-primary"
                >
                  {t}
                </span>
              ))}
            </div>

            <h1 className="mt-5 text-balance text-4xl font-medium leading-[1.08] tracking-tight text-foreground sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-5 text-pretty text-xl leading-relaxed text-muted-foreground">
              {article.deck}
            </p>

            <div className="mt-8 flex items-center gap-3 border-t border-border pt-6">
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-primary/10 font-mono text-sm font-medium text-primary">
                {author.initials}
              </span>
              <div>
                <div className="text-sm font-medium text-foreground">
                  {author.name}
                </div>
                <div className="font-mono text-xs text-muted-foreground">
                  {formatDate(article.date)} · {article.readingMinutes} min read
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------------------- Body */}
      <Container className="pb-8">
        <article className="mx-auto max-w-3xl text-lg">
          <Prose blocks={article.body} />
        </article>
      </Container>

      {/* ------------------------------------------------------- Author / bio */}
      <Container className="pb-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-primary/10 font-mono font-medium text-primary">
                {author.initials}
              </span>
              <div>
                <div className="text-base font-semibold tracking-tight text-foreground">
                  {author.name}
                </div>
                <div className="font-mono text-xs uppercase tracking-[0.12em] text-primary">
                  {author.role}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {author.bio}
                </p>
                <a
                  href={author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  <Linkedin className="h-4 w-4" />
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* -------------------------------------------------------- Keep reading */}
      <section className="border-t border-border bg-card">
        <Container className="py-16 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Keep reading
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {more.map((m) => (
                <Link
                  key={m.slug}
                  to={`/insights/${m.slug}`}
                  className="group rounded-xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                >
                  <div className="font-mono text-xs text-muted-foreground">
                    {authors[m.author].name} · {formatDate(m.date)}
                  </div>
                  <div className="mt-2 font-medium leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {m.title}
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 flex flex-col items-start gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-pretty text-muted-foreground">
                Building or operating a network you can't afford to guess about?
              </p>
              <ButtonLink to="/early-access" variant="primary" size="md">
                Request access
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}
