import { Layout } from "@/components/Layout";
import { Network, Zap, Globe, Lock, TrendingUp, Cpu, Shield, BarChart3 } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Features() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-4 pt-20 sm:pt-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-spectrum-cyan/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-spectrum-purple/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-spectrum-cyan to-spectrum-purple bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto leading-relaxed">
            Optimesh combines AI-driven intelligence with digital twin technology to deliver unprecedented network optimization capabilities.
          </p>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Core Technology Stack
            </h2>
            <p className="text-foreground/70 text-lg">
              Enterprise-grade infrastructure built for global scale
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-spectrum-cyan/20 to-spectrum-blue/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative bg-card border border-border rounded-xl p-8">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-spectrum-cyan/50 to-spectrum-blue/50 flex items-center justify-center mb-4">
                  <Network className="w-8 h-8 text-spectrum-cyan" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">
                  Intelligent Router Placement
                </h3>
                <p className="text-foreground/70 mb-4">
                  AI-driven algorithms analyze terrain, traffic patterns, and latency requirements to automatically optimize router placement across your network infrastructure.
                </p>
                <ul className="space-y-2 text-sm text-foreground/60">
                  <li>✓ Real-time topology optimization</li>
                  <li>✓ Terrain-aware placement</li>
                  <li>✓ Load balancing algorithms</li>
                </ul>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-spectrum-purple/20 to-spectrum-magenta/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative bg-card border border-border rounded-xl p-8">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-spectrum-purple/50 to-spectrum-magenta/50 flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-spectrum-purple" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">
                  Digital Twin Simulation
                </h3>
                <p className="text-foreground/70 mb-4">
                  Create virtual replicas of your physical networks to test configurations, predict failures, and optimize performance before real-world deployment.
                </p>
                <ul className="space-y-2 text-sm text-foreground/60">
                  <li>✓ Physics-based simulation</li>
                  <li>✓ Predictive maintenance</li>
                  <li>✓ What-if scenario testing</li>
                </ul>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-spectrum-blue/20 to-spectrum-cyan/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative bg-card border border-border rounded-xl p-8">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-spectrum-blue/50 to-spectrum-cyan/50 flex items-center justify-center mb-4">
                  <Globe className="w-8 h-8 text-spectrum-blue" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">
                  Global Scale Infrastructure
                </h3>
                <p className="text-foreground/70 mb-4">
                  Deploy and manage networks across continents with a unified platform that handles millions of nodes seamlessly with minimal overhead.
                </p>
                <ul className="space-y-2 text-sm text-foreground/60">
                  <li>✓ Distributed architecture</li>
                  <li>✓ Cross-region redundancy</li>
                  <li>✓ Multi-tenancy support</li>
                </ul>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-spectrum-magenta/20 to-spectrum-purple/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative bg-card border border-border rounded-xl p-8">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-spectrum-magenta/50 to-spectrum-purple/50 flex items-center justify-center mb-4">
                  <Lock className="w-8 h-8 text-spectrum-magenta" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">
                  Enterprise Security
                </h3>
                <p className="text-foreground/70 mb-4">
                  Military-grade encryption and zero-trust architecture protect every node and transaction with quantum-ready cryptographic protocols.
                </p>
                <ul className="space-y-2 text-sm text-foreground/60">
                  <li>✓ End-to-end encryption</li>
                  <li>✓ Zero-trust model</li>
                  <li>✓ Quantum-resistant algorithms</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="relative py-24 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Advanced Capabilities
            </h2>
            <p className="text-foreground/70 text-lg">
              Beyond the basics—cutting-edge tools for next-gen networks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 hover:border-spectrum-cyan/50 transition-colors">
              <TrendingUp className="w-8 h-8 text-spectrum-cyan mb-3" />
              <h4 className="font-bold text-foreground mb-2">Real-Time Analytics</h4>
              <p className="text-sm text-foreground/70">Live performance metrics and insights across your entire network</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:border-spectrum-purple/50 transition-colors">
              <Cpu className="w-8 h-8 text-spectrum-purple mb-3" />
              <h4 className="font-bold text-foreground mb-2">ML-Powered Optimization</h4>
              <p className="text-sm text-foreground/70">Continuous learning algorithms that improve performance over time</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:border-spectrum-blue/50 transition-colors">
              <Shield className="w-8 h-8 text-spectrum-blue mb-3" />
              <h4 className="font-bold text-foreground mb-2">Threat Detection</h4>
              <p className="text-sm text-foreground/70">AI-driven security monitoring and automatic anomaly response</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:border-spectrum-magenta/50 transition-colors">
              <BarChart3 className="w-8 h-8 text-spectrum-magenta mb-3" />
              <h4 className="font-bold text-foreground mb-2">ROI Dashboard</h4>
              <p className="text-sm text-foreground/70">Comprehensive reporting on cost savings and performance gains</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-spectrum-cyan via-spectrum-purple to-spectrum-magenta bg-clip-text text-transparent">
              Ready to Transform Your Network?
            </span>
          </h2>
          <p className="text-foreground/70 text-lg mb-8">
            See how Optimesh can optimize your telecom infrastructure with cutting-edge technology.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-spectrum-cyan text-background font-bold rounded-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all transform hover:scale-105"
          >
            Get in Touch
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </Layout>
  );
}
