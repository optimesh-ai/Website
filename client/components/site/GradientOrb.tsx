import { cn } from "@/lib/utils";

interface GradientOrbProps {
  className?: string;
  delay?: number;
  duration?: number;
  size?: number;
}

export function GradientOrb({
  className,
  delay = 0,
  duration = 20,
  size = 400,
}: GradientOrbProps) {
  return (
    <div
      className={cn(
        "absolute rounded-full blur-3xl will-change-transform",
        "bg-gradient-to-r from-primary/40 via-primary/20 to-transparent",
        className
      )}
      style={{
        width: size,
        height: size,
        animation: `gradient-orb-float ${duration}s ease-in-out ${delay}s infinite`,
      }}
    />
  );
}

export function AnimatedGrid({
  className,
  opacity = 0.06,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0",
        "bg-[linear-gradient(to_right,theme(colors.foreground)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.foreground)_1px,transparent_1px)]",
        "bg-[size:64px_64px]",
        className
      )}
      style={{ opacity }}
    />
  );
}

export function GradientMesh({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 opacity-20",
        "bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,theme(colors.primary)_0%,transparent_75%)]",
        "bg-[radial-gradient(ellipse_60%_40%_at_80%_50%,theme(colors.accent)_0%,transparent_50%)]",
        className
      )}
    />
  );
}

export function FloatingParticles({
  count = 20,
  className,
}: {
  count?: number;
  className?: string;
}) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-primary/30 will-change-transform"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function GlowLine({
  className,
  orientation = "horizontal",
}: {
  className?: string;
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <div
      className={cn(
        "absolute bg-gradient-to-r from-transparent via-primary/50 to-transparent will-change-[opacity]",
        orientation === "horizontal" ? "h-px w-full" : "w-px h-full",
        className
      )}
      style={{
        animation: "glow-pulse 3s ease-in-out infinite",
      }}
    />
  );
}
