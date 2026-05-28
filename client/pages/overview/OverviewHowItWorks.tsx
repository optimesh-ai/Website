export function OverviewHowItWorks() {
  return (
    <section className="relative pt-16 pb-24 px-4 bg-[#0C1220]">
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <p className="text-2xl font-bold tracking-[0.2em] uppercase text-spectrum-cyan mb-6">
          What We Build
        </p>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-10">
          An AI network engineer that doesn't wait for an alert.
        </h2>

        <div className="space-y-6 mb-16">
          <p className="text-lg text-[#E2E8F0] leading-relaxed">
            Optimesh deploys an agentic AI operator on top of your existing infrastructure — no rip-and-replace, no agents, no CMDB required. It reads across every layer of your network simultaneously, builds a continuously updated model of how your infrastructure is configured, how it's behaving, and where it's headed.
          </p>

          <p className="text-lg text-[#E2E8F0] leading-relaxed">
            At the center is a copilot that monitors configuration drift, traffic anomalies, and cross-layer dependencies in real time. When a failure condition is forming, it surfaces it before the outage happens — with context, a recommended action, and the ability to execute it. Your team stays in control. The network stays up.
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-start gap-8">
          <div className="whitespace-nowrap">
            <p className="text-xl sm:text-2xl font-bold text-spectrum-cyan">Zero rip-and-replace</p>
            <p className="text-sm text-white/50 mt-1">Works on your existing stack</p>
          </div>
          <span className="text-white/20 text-2xl mt-1">|</span>
          <div className="whitespace-nowrap">
            <p className="text-xl sm:text-2xl font-bold text-white">Every vendor supported</p>
            <p className="text-sm text-white/50 mt-1">Supported</p>
          </div>
          <span className="text-white/20 text-2xl mt-1">|</span>
          <div className="whitespace-nowrap">
            <p className="text-xl sm:text-2xl font-bold text-white">Agentic + copilot</p>
            <p className="text-sm text-white/50 mt-1">AI that acts and advises</p>
          </div>
        </div>
      </div>
    </section>
  );
}
