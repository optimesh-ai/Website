import type { Block } from "@/data/articles";

/** Renders a structured article/news body consistently across the site. */
export function Prose({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="mt-12 text-2xl font-medium tracking-tight text-foreground"
              >
                {block.text}
              </h2>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="my-10 border-l-2 border-primary pl-6 text-xl font-medium leading-relaxed tracking-tight text-foreground"
              >
                {block.text}
              </blockquote>
            );
          case "ul":
            return (
              <ul key={i} className="my-6 space-y-3">
                {block.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 leading-relaxed">
                    <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-success" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            );
          default:
            return (
              <p
                key={i}
                className="mt-6 text-pretty leading-[1.8] text-muted-foreground"
              >
                {block.text}
              </p>
            );
        }
      })}
    </>
  );
}
