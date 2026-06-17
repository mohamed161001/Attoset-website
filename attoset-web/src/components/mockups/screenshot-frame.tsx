import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A lightweight browser-style frame around a real product screenshot.
 * Native screenshot ratio ≈ 1.837 (2048×1115 / 1705×928).
 */
export function ScreenshotFrame({
  src,
  alt,
  width = 2048,
  height = 1115,
  label,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  label?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-white shadow-float",
        className
      )}
    >
      {/* Top chrome */}
      <div className="flex items-center gap-3 border-b border-line bg-warm px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
        </span>
        {label && (
          <span className="inline-flex items-center rounded-md border border-line bg-white px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
            {label}
          </span>
        )}
      </div>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes="(min-width: 1024px) 1024px, 100vw"
        className="block h-auto w-full"
      />
    </div>
  );
}
