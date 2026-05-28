import { Layout } from "@/components/Layout";
import { Footer } from "@/components/Footer";
import { CheckCircle2, Mail } from "lucide-react";
import { BackgroundPaths } from "@/components/ui/background-paths";

export default function EarlyAccess() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-4 pt-20 sm:pt-0 overflow-hidden bg-[#0a0e1a]">
        <BackgroundPaths />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-spectrum-cyan/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-spectrum-purple/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black z-[1]" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-2xl font-bold tracking-[0.2em] uppercase text-spectrum-cyan mb-6">
            Early Access
          </p>

          <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight text-white">
            Get Early Access
          </h1>
          <p className="text-xl sm:text-2xl text-white/75 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
            Join the future of network intelligence.
            <br />
            Limited invitations available.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative pt-24 pb-36 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Benefits */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-white">
                What Early Adopters Get
              </h2>

              <div className="space-y-4">
                {[
                  "Direct access to our founding team",
                  "Influence the product roadmap",
                  "Priority support & implementation",
                  "Custom integration assistance",
                  "Exclusive founding member status",
                  "Significant early adopter pricing",
                  "Beta access to upcoming features",
                  "Dedicated success manager",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-spectrum-cyan flex-shrink-0 mt-1" />
                    <span className="text-[#E2E8F0]">{benefit}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Column - Contact Info */}
            <div>
              <div className="border border-white/10 rounded-xl p-8 bg-black/40 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-6 text-white">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-spectrum-cyan/20 to-spectrum-purple/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500" />
                    <div className="relative border border-white/10 rounded-lg p-6 bg-[#0a0e1a]">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-spectrum-cyan/20 flex items-center justify-center flex-shrink-0">
                          <Mail className="w-6 h-6 text-spectrum-cyan" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white mb-2">Email</h4>
                          <a
                            href="mailto:contact@optimesh.ai"
                            className="text-spectrum-cyan hover:text-spectrum-cyan/80 transition-colors"
                          >
                            contact@optimesh.ai
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-6 border border-spectrum-cyan/30 bg-spectrum-cyan/5 rounded-lg">
                <p className="text-sm text-[#E2E8F0]">
                  <span className="font-semibold text-spectrum-cyan">
                    Limited Invitations:
                  </span>{" "}
                  We're accepting a select number of early access partners.
                  Apply now to secure your spot.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient blending into FAQ */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0C1220]" />
      </section>

      {/* FAQ Section */}
      <section className="relative pt-12 pb-24 px-4 bg-[#0C1220]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-white">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                question: "What does Optimesh actually deploy into my environment?",
                answer:
                  "A software layer that reads your existing network protocol telemetry. No agents, no hardware, no changes to your current infrastructure. Deployment typically completes in under a day.",
              },
              {
                question: "Do we need to migrate off our current monitoring tools?",
                answer:
                  "No. Optimesh sits alongside your existing tooling. It does not require you to remove or replace anything currently in production.",
              },
              {
                question: "Which vendors and hardware does Optimesh support?",
                answer:
                  "Optimesh is vendor agnostic. It operates across heterogeneous environments including mixed Cisco, Aruba, Juniper, and Ubiquiti deployments without vendor-specific configuration.",
              },
              {
                question: "How does Optimesh handle network changes we make ourselves?",
                answer:
                  "The topology model updates continuously. Any change made to your network is reflected in the model in real time. Configuration drift is flagged automatically.",
              },
              {
                question: "What does the early access partnership involve?",
                answer:
                  "We work directly with your network team to deploy Optimesh in your production environment, validate performance against your specific infrastructure, and refine the product based on what we find together.",
              },
            ].map((faq, index) => (
              <div key={index} className="group">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-spectrum-cyan/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-spectrum-cyan">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-spectrum-cyan transition-colors cursor-pointer">
                      {faq.question}
                    </h4>
                    <p className="text-[#E2E8F0]/70 text-base">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </Layout>
  );
}
