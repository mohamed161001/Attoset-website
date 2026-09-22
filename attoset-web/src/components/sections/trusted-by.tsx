import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { clients } from "@/lib/content";

/**
 * The trust strip, directly under the hero. Deliberately slim: it is proof, not
 * a section — a full heading and generous padding here would push How it works
 * below the fold and make the page feel like it starts twice.
 *
 * Logos keep their own colours. A greyscale treatment reads more uniform, but
 * two of these marks carry their meaning in colour and turn to mud without it.
 */
export function TrustedBy() {
  return (
    <section className="border-y border-line bg-white py-10 sm:py-12">
      <Container>
        <Reveal>
          <p className="text-center font-display text-[11px] font-bold uppercase tracking-[0.16em] text-faint">
            They trust us
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16">
            {clients.map((c) => (
              <li key={c.name} className="flex items-center">
                <Image
                  src={c.src}
                  alt={c.name}
                  width={c.w}
                  height={c.h}
                  style={{ height: c.displayH, width: "auto" }}
                  className="opacity-80 transition-opacity duration-200 hover:opacity-100"
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
