import { cn } from "@/lib/utils";

/**
 * Optimesh mark — an optimized mesh: peripheral nodes routed through a
 * central hub, with the shortest path emphasized. Monochrome (currentColor).
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-8", className)}
      aria-hidden="true"
    >
      {/* mesh links */}
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <line x1="7" y1="8" x2="16" y2="16" opacity="0.35" />
        <line x1="25" y1="8" x2="16" y2="16" opacity="0.35" />
        <line x1="7" y1="24" x2="16" y2="16" opacity="0.35" />
        <line x1="25" y1="24" x2="16" y2="16" opacity="0.35" />
        {/* emphasized optimal path */}
        <path d="M7 8 L16 16 L25 24" opacity="0.95" />
      </g>
      {/* peripheral nodes */}
      <g fill="currentColor">
        <circle cx="7" cy="8" r="2.4" opacity="0.55" />
        <circle cx="25" cy="8" r="2.4" opacity="0.55" />
        <circle cx="7" cy="24" r="2.4" opacity="0.55" />
        <circle cx="25" cy="24" r="2.4" opacity="0.55" />
        {/* hub */}
        <circle cx="16" cy="16" r="3.4" />
      </g>
    </svg>
  );
}
