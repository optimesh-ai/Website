const useCases = [
  {
    title: "Higher Education",
    text: "Universities and research institutions manage large, heterogeneous multi-building networks with lean IT teams. Unplanned downtime disrupts research operations, academic systems, and campus services simultaneously.",
  },
  {
    title: "Health Systems",
    text: "Clinical network uptime is a patient safety issue. Health systems require continuous visibility across distributed facilities with zero tolerance for configuration errors that affect care delivery.",
  },
  {
    title: "Manufacturing",
    text: "Production line continuity depends on network reliability. Unplanned downtime translates directly to revenue loss, and OT/IT convergence has introduced new layers of configuration risk that legacy tools were not designed to manage.",
  },
  {
    title: "Data Centers",
    text: "Data center operations demand continuous uptime across dense, high-throughput environments. Configuration drift, cross-layer dependencies, and multi-tenant complexity require intelligence that static monitoring tools cannot provide.",
  },
  {
    title: "Large Corporate Campuses",
    text: "Multi-building enterprise environments with mixed vendor infrastructure and distributed IT ownership require a unified operational view that vendor-specific tooling cannot provide.",
  },
  {
    title: "Government and Public Sector",
    text: "Federal agencies, municipalities, and public institutions operate under strict uptime and compliance requirements across aging, heterogeneous infrastructure with limited staff capacity to manage it.",
  },
];

export function OverviewUseCases() {
  return (
    <section className="relative py-24 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <p className="text-2xl font-bold tracking-[0.2em] uppercase text-spectrum-cyan mb-12">
          Who We Serve
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((uc, i) => (
            <div
              key={i}
              className="border border-white/10 rounded-xl p-8 hover:border-spectrum-cyan/30 transition-colors"
            >
              <h3 className="text-xl font-bold text-white mb-3">
                <span className="text-spectrum-cyan mr-2">&rarr;</span>
                {uc.title}
              </h3>
              <p className="text-[#E2E8F0] leading-relaxed text-sm">{uc.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
