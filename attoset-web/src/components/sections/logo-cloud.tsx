import { Container } from "@/components/ui/container";
import { customers } from "@/lib/content";

export function LogoCloud() {
  const list = [...customers, ...customers];
  return (
    <section className="border-y border-line bg-white py-12">
      <Container>
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
          Trusted by modern teams at fast-growing organizations
        </p>
        <div className="mask-fade-r relative mt-8 overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-14">
            {list.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="font-display text-2xl font-semibold tracking-tight text-line-strong transition-colors hover:text-ink"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
