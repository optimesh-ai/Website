import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { ButtonLink, Container } from "@/components/site/primitives";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-70" />
        <Container className="relative flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
          <p className="font-mono text-sm uppercase tracking-[0.22em] text-primary">
            404 — no route
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium tracking-tight text-foreground sm:text-6xl">
            This path doesn't resolve.
          </h1>
          <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            The page you're looking for isn't in the forwarding table. Let's get
            you back to a reachable destination.
          </p>
          <p className="mt-6 rounded-md border border-border bg-card px-3 py-1.5 font-mono text-xs text-muted-foreground">
            {location.pathname}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/" variant="primary" size="lg">
              Back to home
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink to="/features" variant="secondary" size="lg">
              Explore the platform
            </ButtonLink>
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default NotFound;
