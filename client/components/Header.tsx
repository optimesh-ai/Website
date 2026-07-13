import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { ButtonLink } from "./site/primitives";
import { ChevronDown, Menu, X } from "lucide-react";

const products = [
  {
    to: "/products/hammerhead",
    name: "Hammerhead",
    desc: "Deterministic verification engine",
  },
  {
    to: "/products/config-studio",
    name: "Config Studio",
    desc: "AI-powered verified remediation",
  },
  {
    to: "/products/rulehawk",
    name: "RuleHawk",
    desc: "Free firewall & ACL auditor",
  },
];

const navLinks = [
  { to: "/features", label: "Platform" },
  { to: "/why-optimesh", label: "Why us" },
  { to: "/insights", label: "Insights" },
  { to: "/about", label: "Company" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/80 bg-background/80 shadow-[0_8px_24px_-20px_hsl(222_47%_11%/0.35)] backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-background/0",
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="text-primary">
            <Logo className="h-7 w-7" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Optimesh Technologies
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              className="flex items-center gap-1 rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setProductsOpen((v) => !v)}
              aria-expanded={productsOpen}
            >
              Products
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform",
                  productsOpen && "rotate-180",
                )}
              />
            </button>
            {productsOpen && (
              <div className="absolute left-0 top-full w-[22rem] pt-2">
                <div className="overflow-hidden rounded-xl border border-border bg-card p-2 shadow-lg">
                  {products.map((p) => (
                    <Link
                      key={p.to}
                      to={p.to}
                      className="block rounded-lg px-3 py-3 transition-colors hover:bg-muted"
                    >
                      <div className="text-sm font-semibold text-foreground">
                        {p.name}
                      </div>
                      <div className="mt-0.5 text-sm text-muted-foreground">
                        {p.desc}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://optimesh-ai.github.io/RuleHawk/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
          >
            Try Free
          </a>
          <ButtonLink to="/early-access" variant="primary" size="md">
            Request access
          </ButtonLink>
        </div>

        {/* Mobile toggle */}
        <button
          className="rounded-md p-2 text-foreground md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="space-y-1 px-6 py-5">
            <p className="px-1 pb-1 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Products
            </p>
            {products.map((p) => (
              <Link
                key={p.to}
                to={p.to}
                className="block rounded-lg px-1 py-2 text-base font-medium text-foreground"
              >
                {p.name}
                <span className="block text-sm font-normal text-muted-foreground">
                  {p.desc}
                </span>
              </Link>
            ))}
            <div className="my-3 h-px bg-border" />
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block rounded-lg px-1 py-2 text-base font-medium text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3">
              <ButtonLink
                to="/early-access"
                variant="primary"
                size="lg"
                className="w-full"
              >
                Request access
              </ButtonLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
