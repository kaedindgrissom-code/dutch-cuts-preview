import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { Container, Eyebrow, JsonLd } from "@/components/content/Section";
import { BarberFilter } from "@/components/content/BarberFilter";
import { activeBarbers } from "@/data/barbers";

export const metadata = pageMeta({
  title: "Barbers",
  description: `${activeBarbers.map((b) => b.publicName).join(", ")} — the barbers at Dutch Cuts, Savannah GA. Filter by fades, beards, kids, longer hair or Sundays, then book on Booksy.`,
  path: "/barbers",
});

export default function BarbersPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Barbers", path: "/barbers" }])} />
      <Container className="pt-6 md:pt-12">
        <Eyebrow>The team</Eyebrow>
        <h1 className="display display-2 mt-4">Find your barber</h1>
        <p className="body-l mt-4 max-w-[36rem] text-ink-2">
          Three barbers, each with his own chair, book and prices. Filter by what you need.
        </p>
        <div className="mt-8 pb-16 md:pb-24">
          <BarberFilter />
        </div>
      </Container>
    </>
  );
}
