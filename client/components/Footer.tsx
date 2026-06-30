import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { ButtonLink } from "./site/primitives";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      {/* ── Big CTA headline ── */}
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.5rem] md:leading-[1.12]">
              Verified network changes,<br className="hidden sm:block" />
              not guesswork.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Built by network engineers, for the networks that power the world.
            </p>
          </div>
          <div className="flex flex-shrink-0 items-center gap-3">
            <Link
              to="/features"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-border px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Platform
            </Link>
            <ButtonLink to="/early-access" variant="primary" size="md" className="group">
              Get started
              <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* ── Link columns — top row ── */}
      <div className="mx-auto w-full max-w-6xl px-6 pb-12">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
          {/* Contact */}
          <div className="border-t border-border pt-6">
            <h3 className="text-sm font-semibold text-foreground">Contact</h3>
            <ul className="mt-4 space-y-3">
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact us</Link></li>
              <li><Link to="/early-access" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Request access</Link></li>
              <li>
                <a href="https://optimesh-ai.github.io/RuleHawk/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Free trial
                </a>
              </li>
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Questions or feedback? Reach out at any time:{" "}
              <a href="mailto:hello@optimesh.dev" className="font-medium text-foreground hover:text-primary transition-colors">
                hello@optimesh.dev
              </a>
            </p>
          </div>

          {/* Products */}
          <div className="border-t border-border pt-6">
            <h3 className="text-sm font-semibold text-foreground">Products</h3>
            <ul className="mt-4 space-y-3">
              <li><Link to="/products/hammerhead" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Hammerhead</Link></li>
              <li><Link to="/products/config-studio" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Config Studio</Link></li>
              <li><Link to="/products/rulehawk" className="text-sm text-muted-foreground hover:text-foreground transition-colors">RuleHawk</Link></li>
              <li><Link to="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Platform overview</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="border-t border-border pt-6">
            <h3 className="text-sm font-semibold text-foreground">Resources</h3>
            <ul className="mt-4 space-y-3">
              <li><Link to="/whitepaper" className="text-sm text-muted-foreground hover:text-foreground transition-colors">White paper</Link></li>
              <li><Link to="/insights" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Insights</Link></li>
              <li><Link to="/news" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Newsroom</Link></li>
              <li><Link to="/why-optimesh" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Why Optimesh</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="border-t border-border pt-6">
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="mt-4 space-y-3">
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 px-6 py-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <span className="text-primary">
              <Logo className="h-5 w-5" />
            </span>
            <span className="text-sm font-medium text-foreground">
              Optimesh Technologies
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Optimesh Technologies. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
