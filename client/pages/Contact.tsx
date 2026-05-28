import { Layout } from "@/components/Layout";
import { Footer } from "@/components/Footer";
import { Mail } from "lucide-react";
import { Suspense, lazy } from "react";

const NeuralBackground = lazy(
  () => import("@/components/ui/flow-field-background")
);

export default function Contact() {
  return (
    <Layout>
      <div className="relative min-h-screen bg-black flex flex-col">
        {/* Full-page flow field */}
        <Suspense fallback={<div className="fixed inset-0 bg-black" />}>
          <NeuralBackground
            className="fixed inset-0 opacity-50"
            color="#aaaaaa"
            trailOpacity={0.12}
            particleCount={500}
            speed={0.8}
          />
        </Suspense>

        {/* Centered content */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-4">
          <div className="max-w-lg w-full">
            <h1 className="text-5xl sm:text-6xl font-bold mb-4 leading-tight tracking-tighter text-white drop-shadow-2xl text-center">
              Get in Touch
            </h1>
            <p className="text-xl text-white/60 text-center mb-10 max-w-xl mx-auto">
              Interested in what we're building? We'd love to hear from you.
              Contact our team to learn more about Optimesh.
            </p>

            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-white/10 to-white/5 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative bg-black/60 backdrop-blur-sm border border-white/[0.08] rounded-lg p-8 hover:border-white/20 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full border border-white/20 bg-white/[0.06] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white/80" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Email
                    </h3>
                    <a
                      href="mailto:contact@optimesh.ai"
                      className="text-lg text-white/70 hover:text-white transition-colors"
                    >
                      contact@optimesh.ai
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </Layout>
  );
}
