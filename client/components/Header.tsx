import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 bg-gradient-to-br from-spectrum-cyan to-spectrum-purple rounded-lg opacity-75 group-hover:opacity-100 transition-opacity blur-md" />
            <div className="relative w-10 h-10 bg-background rounded-lg flex items-center justify-center border border-spectrum-cyan/50">
              <Logo />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r from-spectrum-cyan via-spectrum-purple to-spectrum-magenta bg-clip-text text-transparent">
              <p>Optimesh Technologies</p>
            </span>
            <span className="text-xs text-spectrum-cyan/70 font-mono">The Future of Network Intelligence</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-6">
          <NavLinks />
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="sm:hidden bg-black/95 backdrop-blur-md border-t border-white/10 px-4 py-6 space-y-4">
          <NavLinks onClick={() => setMobileOpen(false)} />
        </div>
      )}
    </header>
  );
}

function NavLinks({ onClick }: { onClick?: () => void }) {
  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/overview", label: "Product" },
    { to: "/contact", label: "Contact" },
    { to: "/early-access", label: "Early Access" },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          onClick={onClick}
          className="block text-white hover:text-spectrum-cyan transition-colors text-base font-medium"
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}
