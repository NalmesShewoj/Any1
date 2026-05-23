"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ShaderAnimation } from "@/components/ui/shader-animation";

/**
 * ShaderBackground
 *
 * Der WebGL-Shader (Three.js) als fixierter Vollbild-Hintergrund.
 * Monochrom entsättigt (passt zur Schwarz/Weiß-Palette), darüber ein
 * dunkler Scrim + Vignette für sichere Text-Lesbarkeit.
 * Nur ein WebGL-Context (Phone ist CSS) → kein Context-Crash.
 */
export function ShaderBackground() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black"
    >
      {mounted && !reduced && (
        <div
          className="absolute inset-0"
          style={{ filter: "saturate(0) brightness(1.05) contrast(1.15)" }}
        >
          <ShaderAnimation />
        </div>
      )}

      {/* readability scrim (shader stays visible but text stays crisp) */}
      <div className="absolute inset-0 bg-black/42" />

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 90% at 50% 42%, transparent 38%, rgba(0,0,0,0.55) 80%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* grain */}
      <div className="absolute inset-0 grain" />
    </div>
  );
}
