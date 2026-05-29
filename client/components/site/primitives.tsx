import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

/* ----------------------------------------------------------------------------
 * Optimesh Technologies marketing primitives — shared across all pages.
 * Light corporate system: serif display, grotesk body, mono technical accents.
 * -------------------------------------------------------------------------- */

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-6", className)}>
      {children}
    </div>
  );
}

export function Section({
  id,
  className,
  containerClassName,
  children,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-20 md:py-28", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function Eyebrow({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
      <h2 className="text-balance text-4xl font-medium tracking-[-0.025em] text-foreground sm:text-5xl md:text-[3.4rem] md:leading-[1.04]">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

const buttonBase =
  "group inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md active:translate-y-px",
  secondary:
    "border border-border bg-card text-foreground shadow-sm hover:border-foreground/20 hover:bg-muted",
  ghost: "text-primary hover:text-primary/80",
};

const buttonSizes: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[0.95rem]",
};

function buttonClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string,
) {
  return cn(buttonBase, buttonVariants[variant], buttonSizes[size], className);
}

interface ButtonLinkProps {
  to?: string;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

export function ButtonLink({
  to,
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);
  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={classes}>
      {children}
    </a>
  );
}

export const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
  }
>(({ variant = "primary", size = "md", className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={buttonClasses(variant, size, className)}
    {...props}
  >
    {children}
  </button>
));
Button.displayName = "Button";

export function ArrowLink({
  to,
  href,
  className,
  children,
}: {
  to?: string;
  href?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const inner = (
    <span className="group inline-flex items-center gap-1.5 font-medium text-primary transition-colors hover:text-primary/80">
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </span>
  );
  if (to)
    return (
      <Link to={to} className={cn("inline-flex", className)}>
        {inner}
      </Link>
    );
  return (
    <a href={href} className={cn("inline-flex", className)}>
      {inner}
    </a>
  );
}

export function Stat({
  value,
  label,
  sub,
  className,
}: {
  value: React.ReactNode;
  label: React.ReactNode;
  sub?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <span className="font-mono text-5xl font-medium tabular-nums tracking-[-0.04em] text-foreground sm:text-6xl md:text-[4.25rem] md:leading-none">
        {value}
      </span>
      <span className="mt-3 text-sm font-medium text-foreground">{label}</span>
      {sub && (
        <span className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {sub}
        </span>
      )}
    </div>
  );
}

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-md",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Badge({
  className,
  children,
  tone = "neutral",
}: {
  className?: string;
  children: React.ReactNode;
  tone?: "neutral" | "primary" | "success";
}) {
  const tones = {
    neutral: "border-border bg-muted text-muted-foreground",
    primary: "border-primary/20 bg-primary/10 text-primary",
    success: "border-success/20 bg-success/10 text-success",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Terminal-style code block for CLI / SDK snippets. */
export function CodeBlock({
  title,
  lines,
  className,
}: {
  title?: string;
  lines: { prompt?: string; text: string; muted?: boolean }[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-foreground shadow-lg",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        {title && (
          <span className="ml-2 font-mono text-xs text-white/40">{title}</span>
        )}
      </div>
      <pre className="overflow-x-auto px-5 py-4 font-mono text-[0.82rem] leading-relaxed">
        <code>
          {lines.map((line, i) => (
            <div
              key={i}
              className={cn(
                "whitespace-pre",
                line.muted ? "text-white/45" : "text-white/90",
              )}
            >
              {line.prompt && (
                <span className="select-none text-success">{line.prompt} </span>
              )}
              {line.text}
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
