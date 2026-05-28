import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Suspense, lazy } from "react";

const Entropy = lazy(() =>
  import("@/components/Entropy").then((m) => ({ default: m.Entropy }))
);

export function OverviewHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center px-4 pt-32 pb-24 bg-[#0a0e1a] overflow-hidden">
      {/* Subtle gradient accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-spectrum-cyan/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-spectrum-purple/5 rounded-full blur-[100px]" />
      {/* Bottom gradient blending into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#091B38] z-[1]" />

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12">
        {/* Left — text */}
        <div className="flex-1 min-w-0">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6">
            Your network is telling you what's about to break.
            <br />
            <span className="text-white/50 font-normal">
              Most tools aren't listening.
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-white/60 max-w-2xl leading-relaxed mb-10">
            Optimesh builds a live causal model of your physical network from your own protocol telemetry, no documentation required, and scores failure risk before anything breaks.
          </p>

          <Link
            to="/early-access"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-spectrum-cyan to-cyan-400 text-black font-bold rounded-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.35)] transition-all transform hover:scale-105"
          >
            Request Early Access
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Right — entropy animation */}
        <div className="hidden lg:flex flex-shrink-0 items-center justify-center">
          <Suspense fallback={<div className="w-[400px] h-[400px]" />}>
            <Entropy size={400} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
