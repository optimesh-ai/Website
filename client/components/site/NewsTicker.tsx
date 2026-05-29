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
      className="mx-auto flex max-w-3xl items-center gap-4 rounded-full border border-border bg-card px-4 py-3 shadow-sm sm:px-5"
    >
      <span className="flex-none rounded-full bg-primary/10 px-3 py-1 font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary">
        News
      </span>

      <Link
        to={`/news/${item.slug}`}
        key={item.slug}
        className="group flex min-w-0 flex-1 animate-fade-in items-center gap-3"
      >
        <span className="hidden flex-none font-mono text-sm text-muted-foreground sm:inline">
          {formatDate(item.date)}
        </span>
        <span className="truncate text-base font-medium text-foreground transition-colors group-hover:text-primary">
          {item.headline}
        </span>
        <ArrowUpRight className="h-4 w-4 flex-none text-muted-foreground transition-colors group-hover:text-primary" />
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
