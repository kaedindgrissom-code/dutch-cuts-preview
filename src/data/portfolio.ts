import type { PortfolioItem } from "./types";

/**
 * Portfolio registry. Photos are the barbers' own Booksy uploads, cropped to 1:1 at 1200px;
 * use on the site approved by Dutch Cuts on 2026-10-08 (see research/ASSET_REQUIREMENTS.md).
 * To add an image: drop it in /public/work/<file>.jpg and add an entry with src/width/height.
 */
export const portfolio: PortfolioItem[] = [
  { id: "w01", src: "/work/w01.jpg", width: 1200, height: 1200, alt: "Clean skin fade by Dutch", barberSlug: "dutch-claybaugh", tags: ["fade"], source: "Booksy upload by Dutch; use approved by Dutch Cuts 2026-10-08" },
  { id: "w02", src: "/work/w02.jpg", width: 1200, height: 1200, alt: "High fade with beard line-up by Dutch", barberSlug: "dutch-claybaugh", tags: ["fade", "beard"], source: "Booksy upload by Dutch; use approved by Dutch Cuts 2026-10-08" },
  { id: "w03", src: "/work/w03.jpg", width: 1200, height: 1200, alt: "Curly top with hard part and design by Dutch", barberSlug: "dutch-claybaugh", tags: ["fade", "longer-hair"], source: "Booksy upload by Dutch; use approved by Dutch Cuts 2026-10-08" },
  { id: "w04", src: "/work/w04.jpg", width: 1200, height: 1200, alt: "Box fade with sharp line-up by Dutch", barberSlug: "dutch-claybaugh", tags: ["fade"], source: "Booksy upload by Dutch; use approved by Dutch Cuts 2026-10-08" },
  { id: "w05", src: "/work/w05.jpg", width: 1200, height: 1200, alt: "Mid fade with textured top by Dutch", barberSlug: "dutch-claybaugh", tags: ["fade"], source: "Booksy upload by Dutch; use approved by Dutch Cuts 2026-10-08" },
  { id: "w06", src: "/work/w06.jpg", width: 1200, height: 1200, alt: "Fade with freestyle design by Dutch", barberSlug: "dutch-claybaugh", tags: ["fade"], source: "Booksy upload by Dutch; use approved by Dutch Cuts 2026-10-08" },
  { id: "w07", src: "/work/w07.jpg", width: 1200, height: 1200, alt: "Kids cut with design by Dutch", barberSlug: "dutch-claybaugh", tags: ["kids"], source: "Booksy upload by Dutch; use approved by Dutch Cuts 2026-10-08" },
  { id: "w08", src: "/work/w08.jpg", width: 1200, height: 1200, alt: "Skin fade and full beard shape by Brian", barberSlug: "brian-meyer", tags: ["fade", "beard"], source: "Booksy upload by Brian; use approved by Dutch Cuts 2026-10-08" },
  { id: "w09", src: "/work/w09.jpg", width: 1200, height: 1200, alt: "High skin fade by Brian", barberSlug: "brian-meyer", tags: ["fade"], source: "Booksy upload by Brian; use approved by Dutch Cuts 2026-10-08" },
  { id: "w10", src: "/work/w10.jpg", width: 1200, height: 1200, alt: "Side part with long beard by Brian", barberSlug: "brian-meyer", tags: ["beard", "fade"], source: "Booksy upload by Brian; use approved by Dutch Cuts 2026-10-08" },
  { id: "w11", src: "/work/w11.jpg", width: 1200, height: 1200, alt: "Taper with beard by Brian", barberSlug: "brian-meyer", tags: ["fade", "beard"], source: "Booksy upload by Brian; use approved by Dutch Cuts 2026-10-08" },
  { id: "w12", src: "/work/w12.jpg", width: 1200, height: 1200, alt: "Textured flow with low fade by Brian", barberSlug: "brian-meyer", tags: ["longer-hair", "fade"], source: "Booksy upload by Brian; use approved by Dutch Cuts 2026-10-08" },
  { id: "w13", src: "/work/w13.jpg", width: 1200, height: 1200, alt: "Mullet with taper by Brian", barberSlug: "brian-meyer", tags: ["longer-hair"], source: "Booksy upload by Brian; use approved by Dutch Cuts 2026-10-08" },
  { id: "w14", src: "/work/w14.jpg", width: 1200, height: 1200, alt: "Kids cut by Brian", barberSlug: "brian-meyer", tags: ["kids"], source: "Booksy upload by Brian; use approved by Dutch Cuts 2026-10-08" },
  { id: "w15", src: "/work/w15.jpg", width: 1200, height: 1200, alt: "Low fade with waves by Rod", barberSlug: "eric-rodriguez", tags: ["fade"], source: "Booksy upload by Rod; use approved by Dutch Cuts 2026-10-08" },
  { id: "w16", src: "/work/w16.jpg", width: 1200, height: 1200, alt: "Taper fade with line-up by Rod", barberSlug: "eric-rodriguez", tags: ["fade"], source: "Booksy upload by Rod; use approved by Dutch Cuts 2026-10-08" },
  { id: "w17", src: "/work/w17.jpg", width: 1200, height: 1200, alt: "Skin fade and beard by Rod", barberSlug: "eric-rodriguez", tags: ["fade", "beard"], source: "Booksy upload by Rod; use approved by Dutch Cuts 2026-10-08" },
  { id: "w18", src: "/work/w18.jpg", width: 1200, height: 1200, alt: "Longer top with beard by Rod", barberSlug: "eric-rodriguez", tags: ["beard", "longer-hair"], source: "Booksy upload by Rod; use approved by Dutch Cuts 2026-10-08" },
  { id: "w19", src: "/work/w19.jpg", width: 1200, height: 1200, alt: "Mid fade on curly hair by Rod", barberSlug: "eric-rodriguez", tags: ["fade"], source: "Booksy upload by Rod; use approved by Dutch Cuts 2026-10-08" },
  { id: "w20", src: "/work/w20.jpg", width: 1200, height: 1200, alt: "Drop fade on curls by Rod", barberSlug: "eric-rodriguez", tags: ["fade"], source: "Booksy upload by Rod; use approved by Dutch Cuts 2026-10-08" },
];

export function portfolioFor(slug: string, limit?: number) {
  const items = portfolio.filter((p) => p.barberSlug === slug);
  return limit ? items.slice(0, limit) : items;
}
