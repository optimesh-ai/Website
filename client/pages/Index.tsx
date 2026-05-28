import { Layout } from "@/components/Layout";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, Network, Zap, TrendingDown } from "lucide-react";
import { Suspense, lazy } from "react";

const NeuralBackground = lazy(
  () => import("@/components/ui/flow-field-background")
);

const DottedSurface = lazy(
  () => import("@/components/ui/dotted-surface")
);

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 sm:pt-0 pb-72 bg-black overflow-hidden">
        {/* Flow Field Background */}
        <Suspense
          fallback={<div className="absolute inset-0 bg-black" />}
        >
          <NeuralBackground
            className="absolute inset-0 opacity-50"
            color="#aaaaaa"
            trailOpacity={0.12}
            particleCount={500}
            speed={0.8}
          />
        </Suspense>

        {/* Gradient overlays for depth */}
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-32 z-[1] pointer-events-none bg-gradient-to-b from-black to-transparent" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-[50%] z-[1] pointer-events-none bg-gradient-to-t from-black via-black/80 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6 drop-shadow-2xl">
            The Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
              Network Intelligence.
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-foreground/70 mb-4 max-w-2xl mx-auto leading-relaxed backdrop-blur-[2px]">
            Optimesh builds digital twins of network infrastructure to identify
            failure points, optimize router placement, and design more resilient
            networks.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              to="/contact"
              className="group inline-flex px-8 py-4 bg-gradient-to-r from-[#22D3EE] via-[#06B6D4] to-[#0891B2] text-background font-bold rounded-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all transform hover:scale-105"
            >
              <div className="flex items-center gap-2 justify-center">
                Get in Touch
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            <Link
              to="/early-access"
              className="inline-flex px-8 py-4 border border-[#06B6D4]/50 text-[#22D3EE] font-bold rounded-lg hover:bg-[#06B6D4]/10 backdrop-blur-sm transition-colors"
            >
              Join Early Access
            </Link>
          </div>

          <p className="text-base text-foreground/50 font-mono">
            Built by infrastructure experts, for the networks that power the world.
          </p>
        </div>
      </section>

      {/* Network Optimization + CTA — continuous dotted surface */}
      <div className="relative overflow-hidden bg-black -mt-56">
        <Suspense fallback={null}>
          <DottedSurface speed={0.03} />
        </Suspense>

        {/* Network Optimization Section */}
        <section className="relative z-10 pt-8 pb-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
                <span className="text-white">
                  Network Optimization at Scale
                </span>
              </h2>
              <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
                We're building something different. Get early access today.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <CapabilityCard
                icon={<Network className="w-5 h-5" />}
                title="Intelligent Placement"
                description="Cutting-edge algorithms that rethink how networks are built and deployed."
              />
              <CapabilityCard
                icon={<Zap className="w-5 h-5" />}
                title="Real-Time Intelligence"
                description="Predictive capabilities that anticipate network needs before they arise."
              />
              <CapabilityCard
                icon={<TrendingDown className="w-5 h-5" />}
                title="Cost Optimization"
                description="Reducing network deployment and operational expenses without compromise."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="relative z-10 py-24 px-4">
          {/* Gradient overlay fading dots to black */}
          <div className="absolute -top-24 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent via-black/70 to-black z-0 pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-white">
                Join the Revolution
              </span>
            </h2>
            <p className="text-foreground/70 text-xl mb-8">
              We're in stealth mode, building the next generation of intelligent
              network infrastructure. Get early access to Optimesh.
            </p>
            <Link
              to="/early-access"
              className="group inline-flex px-8 py-4 bg-white text-black font-bold rounded-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all transform hover:scale-105"
            >
              <div className="flex items-center gap-2 justify-center">
                Request Early Access
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </Layout>
  );
}

function CapabilityCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-white/10 to-white/5 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
      <div className="relative bg-card border border-white/[0.08] rounded-xl p-8 hover:border-white/20 transition-colors">
        <div className="w-11 h-11 rounded-full border border-white/20 bg-white/[0.06] flex items-center justify-center mb-5 text-white/80 group-hover:bg-white/10 group-hover:border-white/30 transition-all">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-white tracking-tight">{title}</h3>
        <p className="text-white/50 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
