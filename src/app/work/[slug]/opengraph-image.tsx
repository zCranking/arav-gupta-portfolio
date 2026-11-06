import { card, ogSize } from "@/lib/og";
import { detailed } from "@/lib/work";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Project card from Arav Gupta's portfolio";

export function generateStaticParams() {
  return detailed.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = detailed.find((x) => x.slug === slug)!;
  return card(p.title, p.oneLine);
}
