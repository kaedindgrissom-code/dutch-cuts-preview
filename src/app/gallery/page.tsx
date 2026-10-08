import { portfolio } from "@/data/portfolio";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { Container, Eyebrow, JsonLd } from "@/components/content/Section";
import { PortfolioGrid } from "@/components/content/PortfolioGrid";
import { BookNowButton } from "@/components/booking/BookButtons";

export const metadata = pageMeta({
  title: "Gallery",
  description: "Recent fades, tapers, beards and kids cuts from the chairs at Dutch Cuts, Savannah GA. Filter by barber or cut type, then book the barber who did it.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Gallery", path: "/gallery" }])} />
      <Container className="pt-6 md:pt-12">
        <Eyebrow>Gallery</Eyebrow>
        <h1 className="display display-2 mt-4">The work</h1>
        <p className="body-l mt-4 max-w-[34rem] text-ink-2">Recent cuts from the chair. Tap any photo to see the barber.</p>
      </Container>
      <Container className="mt-8">
        <PortfolioGrid items={portfolio} />
      </Container>
      <Container className="mt-12 flex flex-col gap-4 pb-16 sm:flex-row sm:items-center md:pb-24">
        <p className="display display-3">Like what you see?</p>
        <BookNowButton source="gallery" />
      </Container>
    </>
  );
}
