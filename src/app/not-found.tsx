import Link from "next/link";
import { Container } from "@/components/content/Section";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="py-24">
      <p className="label text-ink-3">404</p>
      <h1 className="display display-2 mt-4">That page took a walk.</h1>
      <p className="body-l mt-4 max-w-[30rem] text-ink-2">The chairs are still here. Try the barbers or head home.</p>
      <div className="mt-6 flex gap-2.5">
        <ButtonLink href="/barbers">Find your barber</ButtonLink>
        <Link href="/" className="ui inline-flex h-12 items-center rounded-[2px] border border-ink px-5 text-[15px]">
          Home
        </Link>
      </div>
    </Container>
  );
}
