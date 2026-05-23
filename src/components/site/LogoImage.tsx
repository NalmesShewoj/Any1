"use client";

import { useState, type CSSProperties } from "react";

// basePath for GitHub Pages (/Any1 in prod, "" in dev) — explicit so static
// export assets resolve correctly. Set via next.config env.
const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type Props = {
  primary?: string;
  fallback?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
};

/**
 * LogoImage
 *
 * Plain <img> with explicit basePath prefix (works in static export /Any1).
 * Tries the PNG, falls back to the SVG placeholder on error.
 */
export function LogoImage({
  primary = "/logo.png",
  fallback = "/logo.svg",
  alt = "",
  width,
  height,
  className,
  style,
}: Props) {
  const [src, setSrc] = useState<string>(`${BP}${primary}`);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      decoding="async"
      onError={() => {
        const fb = `${BP}${fallback}`;
        if (src !== fb) setSrc(fb);
      }}
    />
  );
}
