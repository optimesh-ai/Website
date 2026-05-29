import { Link } from "react-router-dom";
import { Logo } from "./Logo";

const columns = [
  {
    title: "Products",
    links: [
      { to: "/products/hammerhead", label: "Hammerhead" },
      { to: "/products/config-studio", label: "Config Studio" },
      { to: "/features", label: "Platform" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/insights", label: "Insights" },
      { to: "/contact", label: "Contact" },
      { to: "/early-access", label: "Early access" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="text-primary">
                <Logo className="h-7 w-7" />
              </span>
              <span className="text-lg font-semibold tracking-tight text-foreground">
                Optimesh
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Offline network intelligence — simulate the forwarding plane and
              ship verified configuration changes with confidence.
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              The Future of Network Intelligence
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <span className="font-mono text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Optimesh Technologies
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            Built for the networks that power the world.
          </span>
        </div>
      </div>
    </footer>
  );
}
