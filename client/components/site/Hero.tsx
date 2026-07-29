import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronRight } from "lucide-react";
import { ButtonLink, Container } from "./primitives";
import { NetworkScene } from "./NetworkScene";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

interface HeroProps {
  title: string;
  description: string;
  primaryButton?: { to: string; label: string };
  secondaryButton?: { to: string; label: string };
  tertiaryButton?: { to: string; label: string; external?: boolean };
  codeBlock?: {
    title: string;
    lines: Array<{ prompt?: string; text: string; muted?: boolean }>;
  };
  show3DScene?: boolean;
  className?: string;
}

export function Hero({
  title,
  description,
  primaryButton = { to: "/early-access", label: "Request access" },
  secondaryButton = { to: "/products/hammerhead", label: "Explore the platform" },
  tertiaryButton,
  show3DScene = false,
  className,
}: HeroProps) {
  // Apple-style scroll parallax: background layers drift at different speeds.
  const { scrollY } = useScroll();
  const gridY = useTransform(scrollY, [0, 700], [0, 90]);
  const glowY = useTransform(scrollY, [0, 700], [0, 170]);
  const sceneY = useTransform(scrollY, [0, 700], [0, -60]);
  return (
    <section className={cn("relative overflow-hidden bg-background", className)}>
      {/* ambient background: faint engineering grid + soft brand wash, parallaxing on scroll */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <motion.div style={{ y: gridY }} className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_85%_80%_at_35%_15%,#000_35%,transparent_80%)] [-webkit-mask-image:radial-gradient(ellipse_85%_80%_at_35%_15%,#000_35%,transparent_80%)]" />
        <motion.div style={{ y: glowY }} className="absolute -left-40 -top-48 h-[560px] w-[760px] rounded-full bg-primary/[0.07] blur-[130px]" />
        <motion.div style={{ y: glowY }} className="absolute bottom-[-6rem] right-[-4rem] hidden h-[420px] w-[560px] rounded-full bg-[hsl(200_85%_55%/0.06)] blur-[130px] lg:block" />
      </div>

      {/* 3D scene — full-width background, desktop only, gentle counter-parallax */}
      {show3DScene && (
        <motion.div style={{ y: sceneY }} className="hidden lg:block absolute inset-0 z-0">
          <NetworkScene className="w-full h-full" />
        </motion.div>
      )}

      <Container className="relative z-10 py-24 md:py-32 lg:py-36">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-xl"
        >
          <motion.h1
            variants={item}
            className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-[3.4rem] xl:text-[3.8rem]"
            dangerouslySetInnerHTML={{ __html: title }}
          />

          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
          >
            {description}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink to={primaryButton.to} variant="primary" size="lg" className="group">
              {primaryButton.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 ml-2" />
            </ButtonLink>
            <ButtonLink to={secondaryButton.to} variant="secondary" size="lg" className="group">
              {secondaryButton.label}
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 ml-1" />
            </ButtonLink>
            {tertiaryButton && (
              tertiaryButton.external ? (
                <a
                  href={tertiaryButton.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-6 text-[0.95rem] font-medium text-primary transition-colors hover:bg-primary/10"
                >
                  {tertiaryButton.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              ) : (
                <ButtonLink to={tertiaryButton.to} variant="secondary" size="lg" className="group border-primary/20 bg-primary/5 text-primary hover:bg-primary/10">
                  {tertiaryButton.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 ml-1" />
                </ButtonLink>
              )
            )}
          </motion.div>

        </motion.div>
      </Container>

    </section>
  );
}

interface FeatureHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function FeatureHero({ eyebrow, title, description, centered = false, className }: FeatureHeroProps) {
  return (
    <section className={cn("relative overflow-hidden py-24 md:py-32", className)}>
      <div className="absolute inset-0 bg-background/50 backdrop-blur-3xl" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={cn(centered ? "mx-auto max-w-4xl text-center" : "")}
        >
          <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-primary">
            {eyebrow}
          </p>
          <h2 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {title}
          </h2>
          {description && (
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
