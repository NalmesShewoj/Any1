"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * TiltCard — 3D hover tilt + scroll reveal + cursor glare.
 */
export function TiltCard({
  children,
  className,
  intensity = 7,
  delay = 0,
  glare = true,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  delay?: number;
  glare?: boolean;
}) {
  const reduced = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const glareOpacity = useSpring(0, { stiffness: 200, damping: 25 });

  const rotateX = useSpring(useTransform(py, [0, 1], [intensity, -intensity]), {
    stiffness: 220,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-intensity, intensity]), {
    stiffness: 220,
    damping: 18,
  });

  const gx = useTransform(px, [0, 1], ["0%", "100%"]);
  const gy = useTransform(py, [0, 1], ["0%", "100%"]);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.12), transparent 45%)`;

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function handleEnter() {
    if (!reduced) glareOpacity.set(1);
  }
  function handleLeave() {
    px.set(0.5);
    py.set(0.5);
    glareOpacity.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.96, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        rotateX: reduced ? 0 : rotateX,
        rotateY: reduced ? 0 : rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1100,
      }}
      className={cn("relative", className)}
    >
      {children}
      {glare && !reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glareBg, opacity: glareOpacity }}
        />
      )}
    </motion.div>
  );
}
