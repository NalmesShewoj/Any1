"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ============================================================================
   PULSE FIELD
   Shader-driven point grid that undulates like a living heart-rate landscape.
   Monochrome. Reacts to scroll (amplitude + camera drift).
   ============================================================================ */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;     // 0..1 page scroll progress
  uniform float uAmp;
  attribute float aRand;
  varying float vElev;
  varying float vDist;

  void main() {
    vec3 pos = position;

    // Two long rolling waves
    float w1 = sin(pos.x * 0.18 + uTime * 0.9) * cos(pos.z * 0.16 + uTime * 0.6);
    float w2 = sin(pos.x * 0.07 - uTime * 0.4 + pos.z * 0.05) * 0.6;

    // Radial "pulse" emanating from center, like a heartbeat ping
    float r = length(pos.xz);
    float pulse = sin(r * 0.25 - uTime * 1.6) * exp(-r * 0.03) * 1.4;

    float elevation = (w1 + w2 + pulse) * uAmp * (1.0 + uScroll * 0.8);
    pos.y += elevation;

    vElev = elevation;
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    vDist = -mv.z;

    gl_PointSize = (1.6 + aRand * 1.8) * (300.0 / vDist);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying float vElev;
  varying float vDist;

  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    if (d > 0.5) discard;
    float soft = smoothstep(0.5, 0.0, d);

    // brighter on crests, dimmer in troughs
    float bright = clamp(0.28 + vElev * 0.42, 0.05, 1.0);
    // fade far points into black
    float fog = clamp(1.0 - (vDist - 30.0) / 90.0, 0.0, 1.0);

    gl_FragColor = vec4(vec3(bright), soft * fog * 0.9);
  }
`;

function PulseField() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const scrollRef = useRef(0);
  const { size } = useThree();

  // Build a grid of points
  const { positions, randoms, count } = useMemo(() => {
    const GRID = 120; // 120x120 = 14.4k points
    const SPREAD = 140;
    const half = SPREAD / 2;
    const step = SPREAD / GRID;
    const pos = new Float32Array(GRID * GRID * 3);
    const rnd = new Float32Array(GRID * GRID);
    let i = 0;
    for (let x = 0; x < GRID; x++) {
      for (let z = 0; z < GRID; z++) {
        pos[i * 3 + 0] = -half + x * step;
        pos[i * 3 + 1] = 0;
        pos[i * 3 + 2] = -half + z * step;
        rnd[i] = Math.random();
        i++;
      }
    }
    return { positions: pos, randoms: rnd, count: GRID * GRID };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uAmp: { value: 1.6 },
    }),
    []
  );

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? window.scrollY / max : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((state, delta) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;
    u.uTime.value += delta;
    // smooth scroll lerp
    u.uScroll.value += (scrollRef.current - u.uScroll.value) * 0.05;
  });

  // mild parallax: tilt with pointer
  useFrame((state) => {
    const cam = state.camera;
    const tx = state.pointer.x * 4;
    const ty = 22 + state.pointer.y * -3;
    cam.position.x += (tx - cam.position.x) * 0.03;
    cam.position.y += (ty - cam.position.y) * 0.03;
    cam.lookAt(0, 0, 0);
  });

  return (
    <points key={size.width}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-aRand"
          args={[randoms, 1]}
          count={count}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function SceneCanvas() {
  const [mounted, setMounted] = useState(false);
  const [allowMotion, setAllowMotion] = useState(true);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setAllowMotion(!mq.matches);
    const handler = (e: MediaQueryListEvent) => setAllowMotion(!e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (!mounted) return null;

  // Reduced motion: statischer schwarzer Hintergrund mit dezentem Punkt-Hauch
  if (!allowMotion) {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 80%, rgba(255,255,255,0.05), transparent 60%), #000",
        }}
      />
    );
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ background: "#000" }}
    >
      <Canvas
        camera={{ position: [0, 22, 38], fov: 55, near: 0.1, far: 200 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <PulseField />
      </Canvas>
    </div>
  );
}
