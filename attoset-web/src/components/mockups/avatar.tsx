import { cn } from "@/lib/utils";

/** Signature brand colors for the recurring fictional collaborators. */
export const people = {
  maya: { name: "Maya", color: "#FF512A" },
  david: { name: "David", color: "#3B82F6" },
  sara: { name: "Sara", color: "#A21CE0" },
  lena: { name: "Lena", color: "#0EA5A0" },
} as const;

/**
 * A colored-initial avatar — replaces stock headshot photos across the
 * product mockups. No image assets; the initial + brand color carry identity.
 */
export function Avatar({
  name,
  color,
  size = 28,
  ring,
  className,
}: {
  name: string;
  color: string;
  size?: number;
  ring?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-display font-bold text-white",
        ring && "ring-2 ring-white",
        className
      )}
      style={{ width: size, height: size, background: color, fontSize: size * 0.42 }}
    >
      {name.trim().charAt(0).toUpperCase()}
    </span>
  );
}
