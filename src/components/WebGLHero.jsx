import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ArchitecturalObject = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Slow rotation
    meshRef.current.rotation.x += 0.002;
    meshRef.current.rotation.y += 0.003;

    // Mouse interaction
    const targetX = (state.pointer.x * Math.PI) / 4;
    const targetY = (state.pointer.y * Math.PI) / 4;
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetY, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetX, 0.05);
  });

  return (
    <group ref={meshRef}>
      {/* Complex Geometric Wireframe */}
      <mesh>
        <icosahedronGeometry args={[2, 1]} />
        <MeshTransmissionMaterial 
          backside 
          samples={4} 
          thickness={0.5} 
          roughness={0} 
          transmission={1} 
          ior={1.5} 
          chromaticAberration={0.05} 
          anisotropy={0.5}
          color="#222"
        />
        <Edges color="white" threshold={15} />
      </mesh>
      
      {/* Inner Orange Core */}
      <mesh scale={0.6}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#e74904" emissive="#e74904" emissiveIntensity={2} wireframe />
      </mesh>
    </group>
  );
};

const WebGLHero = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'auto' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#e74904" />
        <ArchitecturalObject />
      </Canvas>
    </div>
  );
};

export default WebGLHero;
