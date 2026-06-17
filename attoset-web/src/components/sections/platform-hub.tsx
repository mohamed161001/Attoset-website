import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { LogoHub } from "@/components/mockups/logo-hub";

export function PlatformHub() {
  return (
    <section className="overflow-hidden py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="One platform"
          title="Everything your operations run on, connected"
          description="Tables, forms, automations, and dashboards — the building blocks of your operations, all connected around one system instead of stitched together from separate tools."
        />
        <Reveal delay={0.1}>
          <div className="mt-14">
            <LogoHub />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
