import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Container, Section, Badge } from "@/components/site/primitives";
import { getSortedNews } from "@/data/news";
import { formatDate } from "@/data/articles";
import { MeshFieldScene } from "@/components/site/MeshFieldScene";

export default function News() {
  const items = getSortedNews();

  return (
    <Layout>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-70" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[58rem] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] lg:block [mask-image:linear-gradient(to_right,transparent,black_45%)]">
          <MeshFieldScene className="absolute inset-0" seed={53} />
        </div>
        <Container className="relative pb-16 pt-32 md:pb-20 md:pt-40">
          <div className="max-w-3xl">
            <div className="animate-fade-up">
              <Badge tone="primary">News</Badge>
            </div>
            <h1
              className="animate-fade-up mt-6 text-balance text-[2.6rem] font-medium leading-[1.06] tracking-tight text-foreground sm:text-6xl"
              style={{ animationDelay: "80ms" }}
            >
              What's new at Optimesh Technologies.
            </h1>
            <p
              className="animate-fade-up mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground"
              style={{ animationDelay: "160ms" }}
            >
              Milestones, programs, and announcements as we build the
              verification layer for modern networks.
            </p>
          </div>
        </Container>
      </section>

      <Section className="pt-4 pb-28 md:pt-6">
        <div>
          {items.map((item) => (
            <Link
              key={item.slug}
              to={`/news/${item.slug}`}
              className="group block border-t border-border py-10 first:border-t-0 md:py-12"
            >
              <div className="flex items-center gap-2.5 font-mono text-xs text-muted-foreground">
                <span>{formatDate(item.date)}</span>
                <span aria-hidden>·</span>
                <span className="text-primary">{item.category}</span>
              </div>
              <h2 className="mt-3 max-w-3xl text-2xl font-medium leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary md:text-[1.75rem]">
                {item.headline}
              </h2>
              <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
                {item.dek}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Read more
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </Layout>
  );
}
