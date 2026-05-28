const problems = [
  {
    bold: "Reactive monitoring creates operational risk.",
    text: "Current tooling identifies failures after they occur. By the time an incident is logged, business impact has already begun.",
  },
  {
    bold: "Critical infrastructure knowledge is concentrated in individuals.",
    text: "Senior network engineers carry operational context that is not captured in documentation. When they leave, that institutional knowledge leaves with them.",
  },
  {
    bold: "Infrastructure complexity has exceeded management tooling capacity.",
    text: "A decade of multi-vendor deployments, hybrid cloud adoption, and device proliferation has compounded faster than enterprise monitoring platforms have evolved to address it.",
  },
];

export function OverviewProblems() {
  return (
    <section className="relative pt-16 pb-20 px-4 bg-[#091B38]">
      {/* Bottom gradient blending into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0C1220]" />
      <div className="max-w-6xl mx-auto">
        <p className="text-2xl font-bold tracking-[0.2em] uppercase text-spectrum-cyan mb-12">
          The Problem
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20">
          {problems.map((p, i) => (
            <div
              key={i}
              className="space-y-4 py-6 md:py-0 md:px-10 first:md:pl-0 last:md:pr-0"
            >
              <h3 className="text-2xl font-bold text-white leading-snug">
                {p.bold}
              </h3>
              <p className="text-lg text-[#E2E8F0] leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
