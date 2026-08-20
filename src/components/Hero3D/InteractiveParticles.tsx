'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface InteractiveParticlesProps {
  mouse: { x: number; y: number };
}

export default function InteractiveParticles({ mouse }: InteractiveParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1200;

  // Generate particle positions, random speeds, and angles
  const [positions, speeds, angles] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const ang = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Distribute particles in a spherical layout
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.5 + Math.random() * 2.5; // Radius between 1.5 and 4

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      spd[i] = 0.2 + Math.random() * 0.8;
      ang[i] = Math.random() * Math.PI * 2;
    }
    return [pos, spd, ang];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;

    // Target position influenced by mouse cursor (lerped for smoothness)
    const targetX = mouse.x * 2.0;
    const targetY = mouse.y * 2.0;

    // Slow rotation of the whole cloud
    pointsRef.current.rotation.y = time * 0.05;
    pointsRef.current.rotation.x = time * 0.02;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      
      // Individual swirling movement
      const angle = angles[i] + time * speeds[i] * 0.5;
      posAttr.array[idx] += Math.sin(angle) * 0.002;
      posAttr.array[idx + 1] += Math.cos(angle) * 0.002;

      // Attract/Repel slightly from mouse coordinates
      const dx = posAttr.array[idx] - targetX;
      const dy = posAttr.array[idx + 1] - targetY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 1.5) {
        // Move slightly away from cursor
        const force = (1.5 - dist) * 0.01;
        posAttr.array[idx] += (dx / dist) * force;
        posAttr.array[idx + 1] += (dy / dist) * force;
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#E52E2D" // Warm Terracotta
        transparent
        opacity={0.7}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
