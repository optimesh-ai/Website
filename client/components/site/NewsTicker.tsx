import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSortedNews } from "@/data/news";
import { formatDate } from "@/data/articles";

export function NewsTicker({ size = "md" }: { size?: "md" | "lg" }) {
  const items = getSortedNews();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length <= 1) return;
    const id = setInterval(
      () => setIndex((p) => (p + 1) % items.length),
      4500,
    );
    return () => clearInterval(id);
  }, [paused, items.length]);

  if (items.length === 0) return null;
  const item = items[index];
  const lg = size === "lg";

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={cn(
        "mx-auto flex items-start gap-4 rounded-2xl border border-border bg-card shadow-sm sm:items-center sm:gap-5 sm:rounded-full",
        lg
          ? "max-w-5xl px-5 py-5 sm:px-8"
          : "max-w-4xl px-4 py-4 sm:px-6",
      )}
    >
      <span
        className={cn(
          "flex-none rounded-full bg-primary/10 font-mono font-semibold uppercase tracking-[0.18em] text-primary",
          lg
            ? "px-4 py-2 text-[0.78rem] sm:text-[0.85rem]"
            : "px-3 py-1.5 text-[0.7rem] sm:px-3.5 sm:text-[0.78rem]",
        )}
      >
        News
      </span>

      <Link
        to={`/news/${item.slug}`}
        key={item.slug}
        className="group flex min-w-0 flex-1 animate-fade-in flex-col gap-1 sm:flex-row sm:items-center sm:gap-4"
      >
        <span
          className={cn(
            "font-mono text-muted-foreground",
            lg ? "text-sm sm:text-base" : "text-xs sm:text-sm",
          )}
        >
          {formatDate(item.date)}
        </span>
        <span
          className={cn(
            "flex-1 font-medium leading-snug text-foreground transition-colors group-hover:text-primary sm:truncate",
            lg ? "text-xl sm:text-2xl" : "text-[1.05rem] sm:text-lg",
          )}
        >
          {item.headline}
        </span>
        <ArrowUpRight
          className={cn(
            "hidden flex-none text-muted-foreground transition-colors group-hover:text-primary sm:block",
            lg ? "h-6 w-6" : "h-5 w-5",
          )}
        />
      </Link>

      <div className="hidden flex-none items-center gap-2 sm:flex">
        {items.map((it, i) => (
          <button
            key={it.slug}
            type="button"
            aria-label={`Show: ${it.headline}`}
            onClick={() => setIndex(i)}
            className={cn(
              "rounded-full transition-colors",
              lg ? "h-2.5 w-2.5" : "h-2 w-2",
              i === index
                ? "bg-primary animate-pulse-soft"
                : "bg-border hover:bg-muted-foreground/50",
            )}
          />
        ))}
      </div>
    </div>
  );
}
