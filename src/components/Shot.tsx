"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";

// A screenshot or photo that opens full size in a native <dialog>. Esc, a
// click, or the close button dismisses it. Portrait images get a narrower
// frame so they don't tower over the text.
export function Shot({
  src,
  alt,
  caption,
  priority,
  className = "",
}: {
  src: StaticImageData;
  alt: string;
  caption?: string;
  priority?: boolean;
  className?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const tall = src.height > src.width;
  return (
    <figure className={`shot${tall ? " shot-tall" : ""} ${className}`.trim()}>
      <button type="button" className="shot-open" onClick={() => dialog.current?.showModal()} aria-label={`Enlarge: ${alt}`}>
        <Image src={src} alt={alt} placeholder="blur" sizes={tall ? "(max-width: 720px) 100vw, 28rem" : "(max-width: 720px) 100vw, 52rem"} priority={priority} />
      </button>
      {caption && <figcaption>{caption}</figcaption>}
      <dialog ref={dialog} className="lightbox" onClick={() => dialog.current?.close()} aria-label={alt}>
        <Image src={src} alt={alt} sizes="95vw" />
        <form method="dialog">
          <button type="submit" className="lightbox-close">
            Close
          </button>
        </form>
      </dialog>
    </figure>
  );
}
