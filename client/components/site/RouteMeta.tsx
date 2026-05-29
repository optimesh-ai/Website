import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TAGLINE = "Optimesh — The Future of Network Intelligence";

const meta: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Optimesh — Validate every network change before it ships",
    description:
      "Offline network intelligence. Hammerhead simulates your forwarding plane 345× faster than Batfish; Config Studio diagnoses faults and generates verified fixes — on your own hardware.",
  },
  "/features": {
    title: "Platform — Optimesh",
    description:
      "One source of truth for how your network behaves: simulation, reachability analysis, change diffing, policy verification, and AI-driven remediation.",
  },
  "/products/hammerhead": {
    title: "Hammerhead — Offline network simulator | Optimesh",
    description:
      "Know what a config change will do before you make it. Hammerhead parses 14 vendors and simulates the forwarding plane in milliseconds — 345× faster than Batfish, 99.93% parity.",
  },
  "/products/config-studio": {
    title: "Config Studio — AI diagnosis & verified fixes | Optimesh",
    description:
      "Diagnose router-config faults and generate verified fixes in seconds, on your own hardware. Every patch is re-simulated with Hammerhead before a human sees it.",
  },
  "/about": {
    title: "Company — Optimesh",
    description:
      "Optimesh builds fast, trustworthy, offline intelligence for the networks that power the world.",
  },
  "/contact": {
    title: "Contact — Optimesh",
    description: "Get in touch with the Optimesh team.",
  },
  "/early-access": {
    title: "Early access — Optimesh",
    description:
      "Request early access to Optimesh and work directly with the founding team.",
  },
};

export function RouteMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

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
