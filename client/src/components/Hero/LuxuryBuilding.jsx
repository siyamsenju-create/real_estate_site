import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';

const LuxuryBuilding = ({ cameraRef }) => {
  const groupRef = useRef();

  // Create a stylized, procedural set of buildings (glass/dark luxury aesthetic)
  const buildings = useMemo(() => {
    const list = [];
    for (let i = 0; i < 20; i++) {
      const height = Math.random() * 8 + 4;
      const width = Math.random() * 2 + 1;
      const depth = Math.random() * 2 + 1;
      
      const x = (Math.random() - 0.5) * 30;
      const z = (Math.random() - 0.5) * 30 - 10;
      
      // Ensure central area is somewhat empty
      if (Math.abs(x) < 4 && Math.abs(z + 5) < 4) continue;
      
      list.push({ position: [x, height / 2, z], dimension: [width, height, depth], id: i });
    }
    // Main hero building
    list.push({ position: [0, 6, -5], dimension: [3, 12, 3], id: 'main' });
    return list;
  }, []);

  useFrame((state) => {
    // Subtle breathing/floating animation for the city structure for "cinematic" feel
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    
    // Animate camera slowly if not heavily modified by GSAP
    if (cameraRef.current) {
      // Parallax effect based on mouse (mapped from -1 to +1)
      const targetX = (state.pointer.x * 2);
      const targetY = (state.pointer.y * 1) + 2; // offset by 2 for default height
      
      cameraRef.current.position.x += (targetX - cameraRef.current.position.x) * 0.05;
      cameraRef.current.position.y += (targetY - cameraRef.current.position.y) * 0.05;
      cameraRef.current.lookAt(0, 4, -5);
    }
  });

  return (
    <group ref={groupRef}>
      {buildings.map((b) => (
        <mesh key={b.id} position={b.position} castShadow receiveShadow>
          <boxGeometry args={b.dimension} />
          <meshPhysicalMaterial 
            color={b.id === 'main' ? "#d4af37" : "#1a1a1a"}
            metalness={0.9}
            roughness={0.1}
            transmission={0.5} // Add glass-like transparency
            thickness={0.5}
            envMapIntensity={2}
          />
          <Edges 
            linewidth={1} 
            threshold={15} 
            color={b.id === 'main' ? "#ffffff" : "#d4af37"} 
          />
        </mesh>
      ))}
      
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#050505" roughness={0.8} metalness={0.2} />
      </mesh>
    </group>
  );
};

export default LuxuryBuilding;
