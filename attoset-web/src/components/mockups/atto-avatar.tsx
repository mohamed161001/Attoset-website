import { cn } from "@/lib/utils";

/**
 * Atto — the Attoset AI assistant mark, ported from the app.
 * White fills, so place it on a colored/dark surface. Animations live in
 * globals.css (.atto-* classes); pass `thinking` for the busier loop.
 */
export function AttoAvatar({
  size = 48,
  thinking = false,
  className,
}: {
  size?: number;
  thinking?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn("inline-flex items-center justify-center", thinking && "atto-thinking", className)}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        role="img"
        aria-label="Atto AI"
        className="block overflow-visible"
      >
        <g className="atto-antenna">
          <line x1="50" y1="26" x2="50" y2="14" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="50" cy="10" r="4.5" fill="#FFFFFF" />
        </g>
        <g className="atto-body">
          <rect x="5" y="44" width="28" height="12" rx="6" fill="#FFFFFF" />
          <rect x="67" y="44" width="28" height="12" rx="6" fill="#FFFFFF" />
          <ellipse cx="50" cy="50" rx="22" ry="26" fill="#FFFFFF" />
        </g>
        <g className="atto-eye">
          <ellipse cx="50" cy="50" rx="10.8" ry="14.5" fill="#000000" />
          <ellipse className="atto-glint" cx="52" cy="46.5" rx="2.4" ry="2.8" fill="#FFFFFF" />
        </g>
      </svg>
    </span>
  );
}
