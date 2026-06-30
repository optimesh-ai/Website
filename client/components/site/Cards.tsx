import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronRight } from "lucide-react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export function TiltCard({ children, className, intensity = 20 }: TiltCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${intensity / 2}deg`, `-${intensity / 2}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${intensity}deg`, `${intensity}deg`]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative", className)}
    >
      {children}
    </motion.div>
  );
}

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  to?: string;
}

export function GlassCard({ children, className, hover = true, to }: GlassCardProps) {
  const card = (
    <TiltCard
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/50",
        "bg-gradient-to-br from-card/80 to-card/40",
        "backdrop-blur-xl",
        "p-8 shadow-xl shadow-primary/5",
        hover && "transition-all duration-300 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10",
        className
      )}
      intensity={10}
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.1) 55%, transparent 60%)",
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["-200% 0", "200% 0"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.1), transparent 50%)",
        }}
      />

      <div className="relative z-10">{children}</div>
    </TiltCard>
  );

  if (to) {
    return <Link to={to}>{card}</Link>;
  }

  return card;
}

interface FeatureCardProps {
  icon: React.ReactNode;
  name: string;
  tagline?: string;
  description: string;
  points?: string[];
  to?: string;
  className?: string;
}

export function FeatureCard({
  icon,
  name,
  tagline,
  description,
  points,
  to,
  className,
}: FeatureCardProps) {
  const card = (
    <GlassCard to={to} className={cn("group cursor-pointer", className)}>
      <div className="relative">
        {/* Icon with glow */}
        <motion.div
          className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
          {tagline && (
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground mt-1">
              {tagline}
            </p>
          )}
        </div>

        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          {description}
        </p>

        {points && points.length > 0 && (
          <ul className="mt-6 space-y-2.5">
            {points.map((point, i) => (
              <motion.li
                key={point}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-2.5 text-sm text-foreground/80"
              >
                <motion.span
                  className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-success"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />
                {point}
              </motion.li>
            ))}
          </ul>
        )}

        {to && (
          <motion.div
            className="mt-6 inline-flex items-center gap-1.5 font-medium text-primary"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Learn more
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.div>
        )}
      </div>
    </GlassCard>
  );

  return card;
}

interface IntegrationCardProps {
  icon: React.ReactNode;
  name: string;
  description?: string;
  body?: string;
  tools: string[];
  className?: string;
}

export function IntegrationCard({
  icon,
  name,
  description,
  body,
  tools,
  className,
}: IntegrationCardProps) {
  return (
    <GlassCard className={className}>
      <motion.div
        className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 text-primary"
        whileHover={{ scale: 1.1, rotate: [-5, 5, -5] }}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </motion.div>

      <h3 className="mt-5 text-base font-semibold tracking-tight text-foreground">
        {name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description || body}
      </p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {tools.map((tool) => (
          <motion.span
            key={tool}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="rounded-md border border-border bg-background/50 px-2 py-0.5 font-mono text-[0.7rem] text-foreground/70 hover:bg-background hover:text-foreground transition-colors"
          >
            {tool}
          </motion.span>
        ))}
      </div>
    </GlassCard>
  );
}

interface StatCardProps {
  value: React.ReactNode;
  label: string;
  sub?: string;
  delay?: number;
  className?: string;
}

export function StatCard({ value, label, sub, delay = 0, className }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn("text-center relative group", className)}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      {/* Animated underline */}
      <motion.div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent w-0 group-hover:w-full transition-all duration-500"
      />

      <motion.div
        className="relative text-5xl font-semibold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent sm:text-6xl"
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.2, ease: "backOut" }}
        whileHover={{ scale: 1.05 }}
      >
        {value}
      </motion.div>
      <h4 className="mt-3 font-semibold text-foreground">{label}</h4>
      {sub && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.4 }}
          className="mt-1 text-sm text-muted-foreground"
        >
          {sub}
        </motion.p>
      )}
    </motion.div>
  );
}

interface StepCardProps {
  step: string;
  icon: React.ReactNode;
  title: string;
  body: string;
}

export function StepCard({ step, icon, title, body }: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div className="relative rounded-xl border border-border/50 bg-card/80 backdrop-blur p-7 shadow-lg">
        {/* Step number */}
        <motion.span
          className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white font-mono text-sm font-bold shadow-lg"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {step}
        </motion.span>

        <div className="flex items-center justify-between mb-4">
          <motion.div
            className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 text-primary"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            {icon}
          </motion.div>
        </div>

        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
      </div>
    </motion.div>
  );
}

interface ProcessStepProps {
  n: string;
  title: string;
  body: string;
  code: string;
  delay?: number;
}

export function ProcessStep({ n, title, body, code, delay = 0 }: ProcessStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group relative rounded-2xl border border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl p-7 shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative">
        <motion.span
          className="inline-block rounded-md bg-gradient-to-r from-primary/20 to-accent/20 px-2.5 py-1 font-mono text-xs font-semibold text-primary"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          {n}
        </motion.span>

        <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {body}
        </p>

        <motion.pre
          className="mt-5 overflow-x-auto rounded-lg bg-gradient-to-r from-foreground to-foreground/90 px-4 py-3 font-mono text-xs text-white shadow-inner"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <code>{code}</code>
        </motion.pre>
      </div>
    </motion.div>
  );
}
