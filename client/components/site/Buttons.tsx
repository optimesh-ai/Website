import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  to?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
}

export function MagneticButton({
  children,
  className,
  to,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
}: MagneticButtonProps) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const width = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const height = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const buttonStyle = {
    "--btn-x": mouseX,
    "--btn-y": mouseY,
  } as React.CSSProperties;

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    width.set(rect.width);
    height.set(rect.height);

    const mouseXVal = e.clientX - rect.left;
    const mouseYVal = e.clientY - rect.top;

    x.set(mouseXVal - rect.width / 2);
    y.set(mouseYVal - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const variants = {
    primary: "bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105",
    secondary: "bg-gradient-to-r from-secondary to-secondary/90 text-secondary-foreground shadow-lg hover:shadow-xl hover:scale-105",
    outline: "border-2 border-primary text-primary hover:bg-primary/10 hover:scale-105",
    ghost: "text-foreground hover:bg-muted hover:scale-105",
  };

  const sizes = {
    sm: "h-10 px-4 text-sm",
    md: "h-12 px-6 text-base",
    lg: "h-14 px-8 text-lg",
  };

  const buttonContent = (
    <motion.button
      ref={ref}
      style={buttonStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Magnetic glow effect */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity"
        style={{
          background: "radial-gradient(circle at var(--btn-x, 50%) var(--btn-y, 50%), rgba(255,255,255,0.2), transparent 50%)",
        }}
      />

      {/* Shimmer effect for primary buttons */}
      {variant === "primary" && (
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.2) 55%, transparent 60%)",
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
      )}

      <span className="relative z-10 flex items-center gap-2">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {children}
      </span>
    </motion.button>
  );

  if (to && !disabled) {
    return <Link to={to}>{buttonContent}</Link>;
  }

  return buttonContent;
}

interface AnimatedUnderlineProps {
  children: React.ReactNode;
  className?: string;
  to?: string;
  onClick?: () => void;
  isActive?: boolean;
}

export function AnimatedUnderline({
  children,
  className,
  to,
  onClick,
  isActive = false,
}: AnimatedUnderlineProps) {
  const content = (
    <motion.a
      onClick={onClick}
      className={cn(
        "relative inline-block py-2 text-foreground/80 hover:text-foreground transition-colors",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      <motion.span
        className="absolute bottom-0 left-0 h-0.5 bg-primary"
        initial={{ width: isActive ? "100%" : "0%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  return content;
}

interface PulseButtonProps {
  children: React.ReactNode;
  className?: string;
  to?: string;
  onClick?: () => void;
}

export function PulseButton({ children, className, to, onClick }: PulseButtonProps) {
  const content = (
    <motion.button
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-white font-medium",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Pulse ring */}
      <motion.span
        className="absolute inset-0 rounded-lg bg-primary"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <span className="relative z-10">{children}</span>
    </motion.button>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  return content;
}

interface GlowLinkProps {
  children: React.ReactNode;
  className?: string;
  to?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export function GlowLink({ children, className, to, onClick, icon }: GlowLinkProps) {
  const content = (
    <motion.a
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center gap-2 text-primary font-medium",
        className
      )}
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
    >
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
      <span className="relative">{children}</span>
      {icon && (
        <motion.span
          className="relative transition-transform duration-300 group-hover:translate-x-1"
        >
          {icon}
        </motion.span>
      )}
    </motion.a>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  return content;
}
