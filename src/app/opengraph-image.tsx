import { card, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Arav Gupta: a contour map of my projects";

export default function Image() {
  return card("Builder. Cadet. Battalion Commander.", "AI agents that show their work, and the 300 cadets I lead.");
}
