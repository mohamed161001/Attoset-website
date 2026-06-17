import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The real Attoset mark, trimmed from the brand asset and provided in an
 * ink (#0a0a0a) and a white variant so it sits cleanly on light or dark.
 * Native ratio ≈ 832×429.
 */
export function LogoMark({
  className,
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "white";
}) {
  return (
    <Image
      src={tone === "white" ? "/attoset-mark-white.png" : "/attoset-mark.png"}
      alt=""
      aria-hidden="true"
      width={832}
      height={429}
      priority
      className={cn("h-[22px] w-auto", className)}
    />
  );
}

export function Logo({
  className,
  withWordmark = true,
  tone = "ink",
}: {
  className?: string;
  withWordmark?: boolean;
  tone?: "ink" | "white";
}) {
  return (
    <Link
      href="/"
      aria-label="Attoset — home"
      className={cn(
        "inline-flex items-center gap-2.5 transition-opacity hover:opacity-80",
        tone === "white" ? "text-white" : "text-ink",
        className
      )}
    >
      <LogoMark tone={tone} />
      {withWordmark && (
        <span className="font-display text-[22px] font-bold tracking-[-0.04em] leading-none">
          attoset
        </span>
      )}
    </Link>
  );
}
