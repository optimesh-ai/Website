import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSortedNews } from "@/data/news";
import { formatDate } from "@/data/articles";

export function NewsTicker() {
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

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="mx-auto flex max-w-2xl items-center gap-3 rounded-full border border-border bg-card px-3 py-2 shadow-sm sm:px-4"
    >
      <span className="flex-none rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-[0.65rem] font-medium uppercase tracking-[0.16em] text-primary">
        News
      </span>

      <Link
        to={`/news/${item.slug}`}
        key={item.slug}
        className="group flex min-w-0 flex-1 animate-fade-in items-center gap-2"
      >
        <span className="hidden flex-none font-mono text-xs text-muted-foreground sm:inline">
          {formatDate(item.date)}
        </span>
        <span className="truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary">
          {item.headline}
        </span>
        <ArrowUpRight className="h-3.5 w-3.5 flex-none text-muted-foreground transition-colors group-hover:text-primary" />
      </Link>

      <div className="hidden flex-none items-center gap-1.5 sm:flex">
        {items.map((it, i) => (
          <button
            key={it.slug}
            type="button"
            aria-label={`Show: ${it.headline}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-1.5 w-1.5 rounded-full transition-colors",
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
