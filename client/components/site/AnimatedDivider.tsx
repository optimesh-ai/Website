import { cn } from "@/lib/utils";

interface AnimatedDividerProps {
  className?: string;
  variant?: "gradient" | "dots" | "wave" | "glow";
}

export function AnimatedDivider({ className, variant = "gradient" }: AnimatedDividerProps) {
  if (variant === "gradient") {
    return (
      <div className={cn("relative h-px w-full overflow-hidden", className)}>
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent will-change-transform"
          style={{ animation: "slide-right 3s linear infinite" }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent will-change-transform"
          style={{ animation: "slide-left 4s linear infinite" }}
        />
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className={cn("flex items-center justify-center gap-2 py-8", className)}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-2 w-2 rounded-full bg-primary"
            style={{
              animation: `dot-pulse 1.5s ease-in-out ${i * 0.1}s infinite`,
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === "wave") {
    return (
      <div className={cn("relative h-12 w-full", className)}>
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60"
            stroke="url(#divider-gradient)"
            strokeWidth="2"
            fill="none"
          >
            <animate
              attributeName="d"
              dur="4s"
              repeatCount="indefinite"
              values="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60;M0,60 C150,0 350,120 600,60 C850,0 1050,120 1200,60;M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60"
            />
          </path>
          <defs>
            <linearGradient id="divider-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  if (variant === "glow") {
    return (
      <div className={cn("relative flex items-center justify-center py-12", className)}>
        <div
          className="absolute h-px bg-gradient-to-r from-transparent to-primary"
          style={{ animation: "glow-width 2s ease-in-out infinite" }}
        />
        <div
          className="h-2 w-2 rounded-full bg-primary shadow-[0_0_20px_#3b82f6]"
          style={{ animation: "glow-dot 2s ease-in-out infinite" }}
        />
        <div
          className="absolute h-px bg-gradient-to-l from-primary to-transparent"
          style={{ animation: "glow-width 2s ease-in-out infinite" }}
        />
      </div>
    );
  }

  return null;
}

interface GridBackgroundProps {
  className?: string;
  opacity?: number;
}

export function GridBackground({ className, opacity = 0.03 }: GridBackgroundProps) {
  return (
    <div
      className={cn("absolute inset-0 bg-grid", className)}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(59, 130, 246, ${opacity}) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(59, 130, 246, ${opacity}) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    />
  );
}

interface FloatingOrbProps {
  className?: string;
  color?: string;
  size?: number;
  duration?: number;
  delay?: number;
}

export function FloatingOrb({
  className,
  color = "#3b82f6",
  size = 400,
  duration = 20,
  delay = 0,
}: FloatingOrbProps) {
  return (
    <div
      className={cn("absolute rounded-full blur-3xl will-change-transform", className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}40, ${color}10, transparent 70%)`,
        animation: `floating-orb ${duration}s ease-in-out ${delay}s infinite`,
      }}
    />
  );
}

interface SpotlightProps {
  className?: string;
  color?: string;
}

export function Spotlight({ className, color = "#3b82f6" }: SpotlightProps) {
  return (
    <div
      className={cn(
        "absolute pointer-events-none rounded-full blur-[100px] will-change-[opacity]",
        className
      )}
      style={{
        background: `radial-gradient(600px circle at 50% 50%, ${color}15, transparent 40%)`,
        animation: "spotlight-pulse 4s ease-in-out infinite",
      }}
    />
  );
}
