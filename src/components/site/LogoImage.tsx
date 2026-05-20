"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type Props = Omit<ImageProps, "src" | "onError"> & {
  /** Primärer Pfad — Default /logo.png */
  primary?: string;
  /** Fallback wenn Primary 404 → Default /logo.svg */
  fallback?: string;
};

/**
 * LogoImage
 *
 * Wrapper um Next/Image der erst die PNG-Version versucht
 * (high-fidelity, vom User geliefert) und bei 404 auf das
 * SVG-Placeholder zurückfällt.
 *
 * So funktioniert das Logo automatisch, sobald der User
 * `public/logo.png` ablegt — kein Code-Change nötig.
 */
export function LogoImage({
  primary = "/logo.png",
  fallback = "/logo.svg",
  ...rest
}: Props) {
  const [src, setSrc] = useState<string>(primary);

  return (
    <Image
      {...rest}
      src={src}
      onError={() => {
        if (src !== fallback) setSrc(fallback);
      }}
    />
  );
}
