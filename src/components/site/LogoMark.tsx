"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { LogoImage } from "./LogoImage";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * LogoMark
 *
 * Bloom-Animation beim Mount:
 *  1. Glow expandiert wie eine Blüte (orange radial)
 *  2. Inner-Ring zeichnet sich
 *  3. Logo fadet von blurred+small zu sharp+full
 *  4. Danach: dezentes "Atmen" (scale loop)
 *
 * Scroll-Verhalten:
 *  - Logo + Glow blenden beim Runterscrollen aus → verschwinden komplett
 *  - Glow verschwindet schneller als das Logo (Layered Depth)
 *  - Logo skaliert leicht runter, zieht sich in die Tiefe zurück
 */
export function LogoMark({ size = 140 }: { size?: number }) {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  // Scroll-Fade: Logo verschwindet, je weiter man scrollt
  const logoOpacity = useTransform(scrollY, [0, 220], [1, 0]);
  const logoScale = useTransform(scrollY, [0, 260], [1, 0.7]);
  // Glow geht schneller weg — der Mark wirkt damit gedämpft kurz bevor er ganz fade
  const glowOpacityScroll = useTransform(scrollY, [0, 140], [1, 0]);
  const ringOpacityScroll = useTransform(scrollY, [0, 180], [1, 0]);

  return (
    <motion.div
      className="relative mx-auto flex items-center justify-center"
      style={{
        width: size,
        height: size,
        opacity: logoOpacity,
        scale: logoScale,
        willChange: "opacity, transform",
      }}
    >
      {/* Outer glow — expandiert wie eine Blüte beim Mount */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-full"
        initial={reduced ? false : { opacity: 0, scale: 0.5 }}
        animate={
          reduced
            ? { opacity: 0.35, scale: 1 }
            : {
                opacity: [0, 0.9, 0.45],
                scale: [0.5, 1.4, 1.1],
              }
        }
        transition={
          reduced
            ? { duration: 0.4 }
            : {
                duration: 2.0,
                times: [0, 0.55, 1],
                ease: EASE,
                delay: 0.25,
              }
        }
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,165,0,0.6), rgba(255,140,0,0.2) 35%, transparent 70%)",
          filter: "blur(12px)",
          // Scroll-Fade overrideet die animation opacity nach mount
          opacity: glowOpacityScroll,
        }}
      />

      {/* Inner ring */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-full border border-accent/25"
        initial={reduced ? false : { opacity: 0, scale: 0.4 }}
        animate={{
          opacity: reduced ? 0.4 : [0, 0.6, 0.35],
          scale: 1,
        }}
        transition={
          reduced
            ? { duration: 0.4 }
            : { duration: 1.8, times: [0, 0.6, 1], ease: EASE, delay: 0.3 }
        }
        style={{
          opacity: ringOpacityScroll,
        }}
      />

      {/* Logo bloom + breathing */}
      <motion.div
        className="relative"
        initial={
          reduced
            ? false
            : { opacity: 0, scale: 0.45, filter: "blur(36px)" }
        }
        animate={{
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
        }}
        transition={
          reduced
            ? { duration: 0.3 }
            : {
                duration: 1.6,
                ease: EASE,
                delay: 0.35,
                opacity: { duration: 1.2 },
              }
        }
      >
        {/* Subtle continuous breathing nach dem Bloom */}
        <motion.div
          animate={reduced ? undefined : { scale: [1, 1.025, 1] }}
          transition={
            reduced
              ? undefined
              : {
                  duration: 5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: 2,
                }
          }
          style={{
            filter:
              "drop-shadow(0 0 18px rgba(255,165,0,0.55)) drop-shadow(0 0 48px rgba(255,165,0,0.28))",
          }}
        >
          <LogoImage
            alt="any1"
            width={size}
            height={size}
            priority
            className="text-white"
            style={{ width: size * 0.82, height: "auto" }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
