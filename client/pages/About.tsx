import { Layout } from "@/components/Layout";
import { Footer } from "@/components/Footer";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { Linkedin } from "lucide-react";

export default function About() {
  return (
    <Layout>
      {/* Hero + Leadership with shared animated background */}
      <div className="relative overflow-hidden bg-[#0a0e1a]">
        <BackgroundPaths />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-spectrum-cyan/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-spectrum-purple/5 rounded-full blur-[100px]" />

        {/* Hero */}
        <section className="relative z-10 min-h-[60vh] flex items-center px-4 pt-32 pb-24">
          <div className="max-w-6xl mx-auto w-full">
            <p className="text-2xl font-bold tracking-[0.2em] uppercase text-spectrum-cyan mb-6">
              About
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6">
              Built by infrastructure experts,
              <br />
              <span className="text-white/70 font-normal">
                for the networks that power the world.
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
              Optimesh was founded to close the gap between how critical networks
              operate and how they're managed.
            </p>
          </div>
        </section>

        {/* Leadership */}
        <section className="relative z-10 py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <p className="text-2xl font-bold tracking-[0.2em] uppercase text-spectrum-cyan mb-12">
              Leadership
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative border border-white/10 rounded-xl p-10 hover:border-spectrum-cyan/30 transition-colors bg-black/40 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-1">
                  Chandler W. Stevenson
                </h3>
                <p className="text-spectrum-cyan/80 font-medium mb-6">
                  CEO & Co-Founder
                </p>
                <p className="text-[#E2E8F0] leading-relaxed">
                  Princeton ECE PhD Student · NSF GRFP Fellow · Formerly SpaceX,
                  Blue Origin
                </p>
                <a
                  href="https://www.linkedin.com/in/chandler-stevenson-717436202/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 text-white hover:text-spectrum-cyan transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>

              <div className="relative border border-white/10 rounded-xl p-10 hover:border-spectrum-cyan/30 transition-colors bg-black/40 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-1">
                  Vedu Mallela
                </h3>
                <p className="text-spectrum-cyan/80 font-medium mb-6">
                  CTO & Co-Founder
                </p>
                <p className="text-[#E2E8F0] leading-relaxed">
                  Georgia Tech CS · MIT/Harvard NLP Research · TikTok SWE
                </p>
                <a
                  href="https://www.linkedin.com/in/vedu-mallela/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 text-white hover:text-spectrum-cyan transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* Bottom gradient blending into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-[#0C1220] z-20 pointer-events-none" />
      </div>

      {/* Core Principles */}
      <section className="relative py-24 px-4 bg-[#0C1220]">
        <div className="max-w-6xl mx-auto">
          <p className="text-2xl font-bold tracking-[0.2em] uppercase text-spectrum-cyan mb-12">
            Core Principles
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white">
                We build for operators, not observers.
              </h3>
              <p className="text-lg text-[#E2E8F0] leading-relaxed">
                Optimesh is not a dashboard. It is a system that acts. We measure success by whether your team had to respond to fewer incidents, not by how many metrics we can display.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white">
                The network already has the answers.
              </h3>
              <p className="text-lg text-[#E2E8F0] leading-relaxed">
                Your infrastructure is continuously broadcasting its own state through protocol telemetry. We read it. No spreadsheets, no CMDB, no onboarding project required.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white">
                We do not touch your network without your approval.
              </h3>
              <p className="text-lg text-[#E2E8F0] leading-relaxed">
                Every recommended action requires explicit human sign-off. Trust is built through accuracy over time, not assumed on day one.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white">
                We stand behind our numbers.
              </h3>
              <p className="text-lg text-[#E2E8F0] leading-relaxed">
                Our models are validated against real production networks. We publish results. If the data does not support a claim, we do not make it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </Layout>
  );
}
