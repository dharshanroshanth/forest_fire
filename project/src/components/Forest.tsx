import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Tree = ({ position, scale, color }: { position: [number, number, number], scale: number, color: string }) => {
  return (
    <group position={position}>
      <mesh position={[0, scale * 0.5, 0]}>
        <cylinderGeometry args={[0.1 * scale, 0.15 * scale, scale, 8]} />
        <meshStandardMaterial color="#4a3728" />
      </mesh>
      <mesh position={[0, scale * 1.5, 0]}>
        <coneGeometry args={[0.5 * scale, scale * 2, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

export const Forest = ({ riskLevel }: { riskLevel: number }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  const getTreeColor = (baseIndex: number) => {
    const colors = [
      '#2d5a27', // Healthy
      '#8b8b1d', // Medium risk
      '#8b4513'  // High risk
    ];
    const riskIndex = Math.min(Math.floor(riskLevel / 0.34), 2);
    return colors[riskIndex];
  };

  return (
    <group ref={groupRef}>
      {Array.from({ length: 50 }).map((_, i) => {
        const theta = (i / 50) * Math.PI * 2;
        const radius = 3 + Math.random() * 2;
        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;
        const scale = 0.5 + Math.random() * 0.5;

        return (
          <Tree
            key={i}
            position={[x, 0, z]}
            scale={scale}
            color={getTreeColor(i)}
          />
        );
      })}
    </group>
  );
};