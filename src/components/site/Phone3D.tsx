"use client";

import { Canvas } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import { Suspense } from "react";

function PhoneModel() {
  return (
    <Float speed={1.6} rotationIntensity={0.6} floatIntensity={0.7}>
      <group rotation={[0.15, -0.5, 0.05]}>
        {/* Body */}
        <RoundedBox args={[2.1, 4.2, 0.26]} radius={0.2} smoothness={6}>
          <meshStandardMaterial color="#0c0c0d" metalness={0.85} roughness={0.35} />
        </RoundedBox>
        {/* Screen */}
        <RoundedBox
          args={[1.86, 3.94, 0.04]}
          radius={0.15}
          smoothness={5}
          position={[0, 0, 0.15]}
        >
          <meshStandardMaterial
            color="#050505"
            emissive="#FFA500"
            emissiveIntensity={0.12}
            metalness={0.2}
            roughness={0.5}
          />
        </RoundedBox>
        {/* Accent glow strip (like a notification / pulse bar) */}
        <mesh position={[0, 0.6, 0.18]}>
          <planeGeometry args={[1.4, 0.12]} />
          <meshStandardMaterial
            color="#FFA500"
            emissive="#FFA500"
            emissiveIntensity={2.2}
            toneMapped={false}
          />
        </mesh>
        <mesh position={[0, 0.2, 0.18]}>
          <planeGeometry args={[1.1, 0.07]} />
          <meshStandardMaterial
            color="#FFB121"
            emissive="#FFB121"
            emissiveIntensity={1.4}
            toneMapped={false}
          />
        </mesh>
        {/* Camera notch */}
        <mesh position={[0, 1.78, 0.17]}>
          <circleGeometry args={[0.08, 24]} />
          <meshStandardMaterial color="#000" />
        </mesh>
      </group>
    </Float>
  );
}

export function Phone3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={2} color="#ffffff" />
      <directionalLight position={[-5, -2, 3]} intensity={0.8} color="#FFA500" />
      <pointLight position={[0, 0, 4]} intensity={1.2} color="#FFA500" />
      <Suspense fallback={null}>
        <PhoneModel />
      </Suspense>
    </Canvas>
  );
}
