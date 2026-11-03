import { formatUpdateDate } from "@/lib/updates";

/** Category · date · reading time line for Updates cards and articles. */
export function PostMeta({
  category,
  date,
  minutes,
}: {
  category: string;
  date: string;
  minutes: number;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-muted">
      <span className="rounded-full bg-warm-2 px-2.5 py-1 font-medium text-ink-soft">
        {category}
      </span>
      <time dateTime={date}>{formatUpdateDate(date)}</time>
      <span aria-hidden className="text-faint">·</span>
      <span>{minutes} min read</span>
    </div>
  );
}
