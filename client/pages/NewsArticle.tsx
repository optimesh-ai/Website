import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ButtonLink, Container } from "@/components/site/primitives";
import { Prose } from "@/components/site/Prose";
import { getNewsBySlug } from "@/data/news";
import { formatDate } from "@/data/articles";

export default function NewsArticle() {
  const { slug } = useParams();
  const item = slug ? getNewsBySlug(slug) : undefined;

  useEffect(() => {
    if (item) document.title = `${item.headline}, Optimesh Technologies`;
  }, [item]);

  if (!item) return <Navigate to="/news" replace />;

  return (
    <Layout>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-60" />
        <Container className="relative pb-10 pt-32 md:pt-40">
          <div className="mx-auto max-w-3xl">
            <Link
              to="/news"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              News
            </Link>

            <div className="mt-6 flex items-center gap-2.5 font-mono text-xs text-muted-foreground">
              <span>{formatDate(item.date)}</span>
              <span aria-hidden>·</span>
              <span className="text-primary">{item.category}</span>
            </div>

            <h1 className="mt-4 text-balance text-4xl font-medium leading-[1.08] tracking-tight text-foreground sm:text-5xl">
              {item.headline}
            </h1>
            <p className="mt-5 text-pretty text-xl leading-relaxed text-muted-foreground">
              {item.dek}
            </p>
          </div>
        </Container>
      </section>

      <Container className="pb-16">
        <article className="mx-auto max-w-3xl text-lg">
          <Prose blocks={item.body} />

          {item.link && (
            <a
              href={item.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4 transition-colors hover:border-primary/30"
            >
              <span className="text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                {item.link.label}
              </span>
              <ArrowUpRight className="h-4 w-4 flex-none text-muted-foreground transition-colors group-hover:text-primary" />
            </a>
          )}

          <div className="mt-12 flex flex-col items-start gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-pretty text-muted-foreground">
              Want to put Optimesh Technologies to work in your network?
            </p>
            <ButtonLink to="/early-access" variant="primary" size="md">
              Request access
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
          </div>
        </article>
      </Container>
    </Layout>
  );
}
