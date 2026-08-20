'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import InteractiveParticles from './InteractiveParticles';
import { useMousePosition } from '@/hooks/useMousePosition';

export default function CanvasContainer() {
  const mouse = useMousePosition();

  return (
    <div className="absolute inset-0 z-0 pointer-events-none w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 3, 2]} intensity={1.5} castShadow />
        <pointLight position={[-3, -3, -2]} intensity={0.5} />
        
        {/* Procedural WebGL Particles */}
        <InteractiveParticles mouse={mouse} />
        
        {/* Restrict controls slightly to keep editorial frame intact */}
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
      </Canvas>
    </div>
  );
}
