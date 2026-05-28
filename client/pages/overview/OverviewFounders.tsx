const founders = [
  {
    name: "Chandler W. Stevenson",
    title: "CEO & Co-Founder",
    credentials: [
      "Princeton ECE PhD Candidate",
      "NSF GRFP Fellow",
      "Formerly SpaceX, Blue Origin",
    ],
  },
  {
    name: "Vedu Mallela",
    title: "CTO & Co-Founder",
    credentials: [
      "Georgia Tech CS",
      "MIT/Harvard NLP Research",
      "Formerly TikTok",
    ],
  },
];

export function OverviewFounders() {
  return (
    <section className="relative py-24 px-4 bg-black border-t border-white/10">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {founders.map((f, i) => (
            <div
              key={i}
              className="border border-white/10 rounded-xl p-8 hover:border-spectrum-cyan/30 transition-colors"
            >
              <h3 className="text-xl font-bold text-white mb-1">{f.name}</h3>
              <p className="text-spectrum-cyan/80 text-sm font-medium mb-4">
                {f.title}
              </p>
              <p className="text-white/50 text-sm leading-relaxed">
                {f.credentials.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
