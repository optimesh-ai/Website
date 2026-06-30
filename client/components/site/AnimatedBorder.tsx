import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedBorderProps {
  className?: string;
  children: React.ReactNode;
  variant?: "gradient" | "glow" | "pulse";
  size?: "sm" | "md" | "lg";
}

export function AnimatedBorder({
  className,
  children,
  variant = "gradient",
  size = "md",
}: AnimatedBorderProps) {
  const sizes = {
    sm: "border-[1px]",
    md: "border-[2px]",
    lg: "border-[3px]",
  };

  if (variant === "gradient") {
    return (
      <div className={cn("relative", className)}>
        <div
          className={cn(
            "absolute inset-0 rounded-xl bg-gradient-to-r from-primary via-accent to-primary opacity-75 blur-sm will-change-[background-position]",
            sizes[size]
          )}
          style={{
            backgroundSize: "200% 200%",
            animation: "animated-border-gradient 3s linear infinite",
          }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  if (variant === "glow") {
    return (
      <div className={cn("relative", className)}>
        <div
          className={cn(
            "absolute inset-0 rounded-xl bg-gradient-to-r from-primary/50 to-accent/50 will-change-[opacity,transform]",
            sizes[size]
          )}
          style={{
            animation: "animated-border-glow 2s ease-in-out infinite",
          }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className={cn("relative", className)}>
        <div
          className={cn(
            "absolute inset-0 rounded-xl bg-primary will-change-[opacity,transform]",
            sizes[size]
          )}
          style={{
            animation: "animated-border-pulse 2.5s ease-in-out infinite",
          }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  return <div className={cn("relative", className)}>{children}</div>;
}

interface ScrollyTellingProps {
  children: React.ReactNode[];
  className?: string;
}

export function ScrollyTelling({ children, className }: ScrollyTellingProps) {
  return (
    <div className={cn("space-y-32", className)}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            delay: i * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxLayer({ children, speed = 0.5, className }: ParallaxLayerProps) {
  return (
    <motion.div
      className={className}
      style={{ y: 0 }}
      whileInView={{ y: [0, -100 * speed] }}
      viewport={{ once: false }}
      transition={{ duration: 1, ease: "linear" }}
    >
      {children}
    </motion.div>
  );
}

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function RevealText({ text, className, delay = 0 }: RevealTextProps) {
  const words = text.split(" ");

  return (
    <div className={cn("flex flex-wrap", className)}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.03,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
