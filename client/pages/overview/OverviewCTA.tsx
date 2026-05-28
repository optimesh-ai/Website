import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/Footer";

export function OverviewCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || sending) return;
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <section className="relative py-24 px-4 bg-black border-t border-white/10">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <p className="text-xl sm:text-2xl text-white/70 leading-relaxed">
            We're working with our first design partners. If you manage a
            campus, university, or regional hospital network and want early
            access, we want to hear from you.
          </p>

          <p className="text-lg text-white/40">
            No commitment. No sales call required.
          </p>

          {submitted ? (
            <div className="pt-4">
              <p className="text-lg text-spectrum-cyan font-medium">
                Thanks — we'll be in touch soon.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="pt-4 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-spectrum-cyan/50 focus:ring-1 focus:ring-spectrum-cyan/30 transition-colors"
              />
              <button
                type="submit"
                disabled={sending}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-spectrum-cyan text-black font-bold rounded-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all disabled:opacity-50"
              >
                {sending ? "Sending..." : "Submit"}
                {!sending && (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                )}
              </button>
            </form>
          )}

          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </div>
      </section>
      <Footer />
    </>
  );
}
