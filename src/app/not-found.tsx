import Link from "next/link";
import { Container } from "@/components/content/Section";
import { ButtonLink } from "@/components/ui/Button";
import { activeBarbers, shortName } from "@/data/barbers";

export default function NotFound() {
  return (
    <Container className="py-section">
      <p className="label eyebrow text-ink-3">404</p>
      <h1 className="display display-2 mt-4">That page took a walk.</h1>
      <p className="body-l mt-4 max-w-[30rem] text-ink-2">The chairs are still here. Pick a barber or head home.</p>
      <div className="mt-6 flex flex-wrap gap-2.5">
        <ButtonLink href="/barbers">Find your barber</ButtonLink>
        <Link href="/" className="ui inline-flex h-12 items-center rounded-[2px] border border-ink px-5 text-[15px] hover:bg-ink hover:text-paper">
          Home
        </Link>
      </div>
      <ul className="rule mt-10 flex flex-wrap gap-x-6 gap-y-2 pt-5">
        {activeBarbers.map((b) => (
          <li key={b.slug}>
            <Link href={`/barbers/${b.slug}`} className="ui ul-accent text-[15px]">
              {shortName(b)}&rsquo;s page
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
