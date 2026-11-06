import type { Metadata } from "next";
import { Archivo, Source_Serif_4 } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { site } from "@/lib/work";
import "./globals.css";

const display = Archivo({ variable: "--font-display", subsets: ["latin"], axes: ["wdth"] });
const serif = Source_Serif_4({ variable: "--font-serif", subsets: ["latin"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.intro,
  alternates: { canonical: "./" },
  openGraph: { type: "website", siteName: site.name },
};

// Runs before paint, so the right map never flashes. Day map from 7:00 to
// 18:59 in the visitor's own time zone, night map otherwise, unless they
// flipped it with the toggle during this visit.
const themeScript = `(function(){var t;try{t=sessionStorage.getItem("theme")}catch(e){}if(t!=="dark"&&t!=="light"){var h=new Date().getHours();t=h>=7&&h<19?"light":"dark"}document.documentElement.dataset.theme=t})()`;

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  sameAs: site.links.map((l) => l.href),
  affiliation: { "@type": "EducationalOrganization", name: "Army and Navy Academy" },
  homeLocation: { "@type": "Place", name: "Carlsbad, California" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      </head>
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <Nav name={site.name} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
