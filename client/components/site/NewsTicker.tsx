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
      className="mx-auto flex max-w-4xl items-center gap-5 rounded-full border border-border bg-card px-5 py-4 shadow-sm sm:px-6"
    >
      <span className="flex-none rounded-full bg-primary/10 px-3.5 py-1.5 font-mono text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-primary">
        News
      </span>

      <Link
        to={`/news/${item.slug}`}
        key={item.slug}
        className="group flex min-w-0 flex-1 animate-fade-in items-center gap-4"
      >
        <span className="hidden flex-none font-mono text-sm text-muted-foreground sm:inline">
          {formatDate(item.date)}
        </span>
        <span className="flex-1 truncate text-base font-medium text-foreground transition-colors group-hover:text-primary sm:text-lg">
          {item.headline}
        </span>
        <ArrowUpRight className="h-5 w-5 flex-none text-muted-foreground transition-colors group-hover:text-primary" />
      </Link>

      <div className="hidden flex-none items-center gap-2 sm:flex">
        {items.map((it, i) => (
          <button
            key={it.slug}
            type="button"
            aria-label={`Show: ${it.headline}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-2 w-2 rounded-full transition-colors",
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
