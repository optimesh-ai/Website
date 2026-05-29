import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TAGLINE = "Optimesh Technologies — The Future of Network Intelligence";

const meta: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Optimesh Technologies — Validate every network change before it ships",
    description:
      "Offline network intelligence. Hammerhead simulates your forwarding plane 345× faster than the industry standard; Config Studio diagnoses faults and generates verified fixes, on your own hardware.",
  },
  "/features": {
    title: "Platform — Optimesh Technologies",
    description:
      "One source of truth for how your network behaves: simulation, reachability analysis, change diffing, policy verification, and AI-driven remediation.",
  },
  "/products/hammerhead": {
    title: "Hammerhead — Offline network simulator | Optimesh Technologies",
    description:
      "Know what a config change will do before you make it. Hammerhead parses 14 vendors and simulates the forwarding plane in milliseconds, 345× faster than the industry standard, at 99.93% parity.",
  },
  "/products/config-studio": {
    title: "Config Studio — AI diagnosis & verified fixes | Optimesh Technologies",
    description:
      "Diagnose router-config faults and generate verified fixes in seconds, on your own hardware. Every patch is re-simulated with Hammerhead before a human sees it.",
  },
  "/about": {
    title: "Company — Optimesh Technologies",
    description:
      "Optimesh Technologies builds fast, trustworthy, offline intelligence for the networks that power the world.",
  },
  "/insights": {
    title: "Insights — Optimesh Technologies",
    description:
      "Writing from the Optimesh Technologies founders on network verification, AI-driven operations, and where the field is headed.",
  },
  "/news": {
    title: "News — Optimesh Technologies",
    description: "Milestones, programs, and announcements from Optimesh Technologies.",
  },
  "/whitepaper": {
    title: "White paper — Optimesh Technologies",
    description:
      "A technical overview of Hammerhead and Config Studio: offline forwarding-plane verification and AI-driven, verified config remediation.",
  },
  "/why-optimesh": {
    title: "Why Optimesh Technologies — The verification layer for the AI-era network",
    description:
      "Why network verification is becoming non-optional, where competing approaches fall short, the verticals we serve (AI datacenters, hyperscale cloud, telecom, financial services, universities, public sector), and how Optimesh Technologies is positioned to win.",
  },
  "/contact": {
    title: "Contact — Optimesh Technologies",
    description: "Get in touch with the Optimesh Technologies team.",
  },
  "/early-access": {
    title: "Early access — Optimesh Technologies",
    description:
      "Request early access to Optimesh Technologies and work directly with the founding team.",
  },
};

export function RouteMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Detail pages (articles, news) set their own title/description.
    if (pathname.startsWith("/insights/") || pathname.startsWith("/news/")) return;

    const entry = meta[pathname];
    document.title = entry?.title ?? TAGLINE;

    const description =
      entry?.description ??
      "Offline network intelligence — simulate the forwarding plane and ship verified configuration changes with confidence.";
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", description);
  }, [pathname]);

  return null;
}
