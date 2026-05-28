import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="relative bg-black">
      {/* Top gradient blend */}
      <div className="h-24 bg-gradient-to-b from-transparent to-black" />

      <div className="border-t border-white/10 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-white/40 font-mono text-sm">
              &copy; 2026 Optimesh Technologies
            </span>
            <div className="flex gap-6">
              <Link to="/about" className="text-white/40 hover:text-spectrum-cyan transition-colors text-sm">About</Link>
              <Link to="/overview" className="text-white/40 hover:text-spectrum-cyan transition-colors text-sm">Product</Link>
              <Link to="/contact" className="text-white/40 hover:text-spectrum-cyan transition-colors text-sm">Contact</Link>
              <Link to="/early-access" className="text-white/40 hover:text-spectrum-cyan transition-colors text-sm">Early Access</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
