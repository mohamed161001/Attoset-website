import Image from "next/image";
import { solutionCases } from "@/lib/content";

/**
 * Shared by the homepage section and /solutions so the two never drift apart.
 * Photography sits on a dark surface, so every card carries a scrim to keep the
 * type legible whatever the image behind it is doing.
 */
export function SolutionCards() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {solutionCases.map((c, i) => (
        <article
          key={c.id}
          className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-orange/40"
        >
          <div className="relative h-44 overflow-hidden">
            <Image
              src={`/images/solutions/${c.id}.webp`}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
            <span className="absolute left-5 top-5 flex size-10 items-center justify-center rounded-xl bg-ink/70 text-orange ring-1 ring-inset ring-white/15 backdrop-blur">
              <c.icon className="size-5" strokeWidth={1.75} />
            </span>
            <span className="absolute right-5 top-5 font-display text-sm font-semibold tabular-nums text-white/40">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="flex flex-1 flex-col p-6">
            <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-white">
              {c.title}
            </h3>
            <p className="mt-2.5 text-[14px] leading-relaxed text-white/55">
              {c.desc}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
