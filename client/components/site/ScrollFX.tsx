/**
 * Scroll-driven motion primitives. All respect prefers-reduced-motion.
 *
 * - ParallaxLayer: children translate vertically against scroll (backdrops
 *   drift slower than content — depth without noise).
 * - ScrollBeam: a hairline that draws itself down the page as you scroll,
 *   with a glowing tip — connects sections into one continuous story.
 */
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

export function ParallaxLayer({
  children,
  className,
  distance = 36,
}: {
  children: React.ReactNode;
  className?: string;
  /** px the layer travels (down→up) across its scroll window */
  distance?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(raw, { stiffness: 60, damping: 20, mass: 0.4 });

  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { y }}>
      {children}
    </motion.div>
  );
}

export function ScrollBeam({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.55"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
    mass: 0.5,
  });
  const tipTop = useTransform(scaleY, (v) => `${Math.min(v, 1) * 100}%`);
  const tipOpacity = useTransform(scaleY, [0, 0.02, 0.97, 1], [0, 1, 1, 0]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute inset-y-0 w-px", className)}
    >
      {/* faint track */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-border to-transparent" />
      {!reduce && (
        <>
          {/* drawn portion */}
          <motion.div
            className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-primary/0 via-primary/70 to-primary"
            style={{ scaleY }}
          />
          {/* glowing tip */}
          <motion.div
            className="absolute -left-[3.5px] h-2 w-2 rounded-full bg-primary shadow-[0_0_14px_3px_hsl(var(--primary)/0.45)]"
            style={{ top: tipTop, opacity: tipOpacity }}
          />
        </>
      )}
    </div>
  );
}
