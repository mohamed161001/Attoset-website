import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { RecordGraph } from "@/components/mockups/record-graph";

export function LinkedRecords() {
  return (
    <section className="overflow-hidden py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Linked records"
          title="Every record, connected"
          description="Link any record to any other — contacts, deals, tasks, invoices — so one source of truth flows across your whole operation, and a change in one place updates everywhere."
        />
        <Reveal delay={0.1}>
          <div className="mt-14">
            <RecordGraph />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
