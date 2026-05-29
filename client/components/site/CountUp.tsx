import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Counts up from 0 to `to`. Uses an IntersectionObserver so below-fold
 * stats start animating when they enter view, but falls back to running
 * immediately for above-fold elements so visitors never see a stale "0".
 * Respects prefers-reduced-motion (jumps straight to the final value).
 */
export function CountUp({
  to,
  suffix = "",
  prefix = "",
  decimals = 0,
  format = "plain",
  duration = 1.6,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  format?: "plain" | "comma";
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (reduce) {
      setValue(to);
      return;
    }
    let raf = 0;
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      const t0 = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - t0) / (duration * 1000));
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(eased * to);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    if (!ref.current || typeof IntersectionObserver === "undefined") {
      start();
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    const inViewAlready =
      rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom > 0;
    if (inViewAlready) {
      start();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          start();
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(ref.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration, reduce]);

  const display = (() => {
    const n =
      decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
    if (format === "comma") {
      const parts = n.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }
    return n;
  })();

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
