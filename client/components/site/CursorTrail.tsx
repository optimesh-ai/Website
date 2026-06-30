import { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface CursorTrailProps {
  enabled?: boolean;
  color?: string;
  size?: number;
}

export function CursorTrail({ enabled = true, color = "#3b82f6", size = 20 }: CursorTrailProps) {
  const trailRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const rafRef = useRef<number>();

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Use rAF to batch DOM writes
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!trailRef.current) return;
        trailRef.current.style.transform = `translate3d(${e.clientX - size / 2}px, ${e.clientY - size / 2}px, 0)`;
        trailRef.current.style.opacity = "1";
      });

      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (trailRef.current) trailRef.current.style.opacity = "0";
      }, 500);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, size]);

  if (!enabled) return null;

  return (
    <div
      ref={trailRef}
      className="fixed pointer-events-none z-[9999] rounded-full mix-blend-screen will-change-transform animate-[cursor-pulse_2s_ease-in-out_infinite]"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}80, ${color}40, transparent 70%)`,
        filter: "blur(8px)",
        opacity: 0,
        transition: "opacity 0.3s ease-out",
      }}
    />
  );
}

interface MorphingBlobProps {
  className?: string;
  color?: string;
  duration?: number;
}

export function MorphingBlob({
  className,
  color = "#3b82f6",
  duration = 8,
}: MorphingBlobProps) {
  return (
    <div
      className={cn("absolute rounded-full blur-3xl will-change-transform", className)}
      style={{
        background: `radial-gradient(circle, ${color}40, ${color}20, transparent 70%)`,
        animation: `morph-blob ${duration}s ease-in-out infinite, morph-rotate ${duration * 1.5}s linear infinite`,
      }}
    />
  );
}

interface WavePatternProps {
  className?: string;
  color?: string;
}

export function WavePattern({ className, color = "#3b82f620" }: WavePatternProps) {
  return (
    <svg
      className={cn("absolute inset-0 w-full h-full", className)}
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <path
        fill={color}
        d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      >
        <animate
          attributeName="d"
          dur="10s"
          repeatCount="indefinite"
          values="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,128C672,107,768,117,864,144C960,171,1056,213,1152,224C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </path>
    </svg>
  );
}
