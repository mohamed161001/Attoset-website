import { cn } from "@/lib/utils";

/** Section label — a refined accent pill with a soft dot. */
export function Eyebrow({
  children,
  className,
  dot = true,
}: {
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-orange/10 px-3.5 py-1.5 text-[12.5px] font-semibold tracking-tight text-orange ring-1 ring-inset ring-orange/15",
        className
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-orange shadow-[0_0_0_3px_rgba(255,81,42,0.15)]" />}
      {children}
    </span>
  );
}
