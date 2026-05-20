'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Points, PointMaterial } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function Terrain() {
  const meshRef = useRef<THREE.Mesh>(null);
  const lineRef = useRef<THREE.LineSegments>(null);

  const { geometry, lineGeometry } = useMemo(() => {
    const size = 60;
    const segments = 72;
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    const pos = geo.attributes.position;
    const noise = (x: number, y: number) => {
      const n1 = Math.sin(x * 0.32) * Math.cos(y * 0.27);
      const n2 = Math.sin(x * 0.11 + y * 0.13) * 1.6;
      const n3 = Math.cos(x * 0.07 - y * 0.09) * 1.1;
      const rim = Math.max(0, Math.abs(x) + Math.abs(y) - 18) * 0.04;
      return n1 + n2 + n3 + rim;
    };
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      pos.setZ(i, noise(x, y));
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();

    const wire = new THREE.WireframeGeometry(geo);
    return { geometry: geo, lineGeometry: wire };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.z = t * 0.03;
    }
    if (lineRef.current) {
      lineRef.current.rotation.z = t * 0.03;
    }
  });

  return (
    <group rotation={[-Math.PI / 2.6, 0, 0]} position={[0, -4, 0]}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshBasicMaterial color="#050A1F" transparent opacity={0.94} />
      </mesh>
      <lineSegments ref={lineRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#2C5AA8" transparent opacity={0.55} />
      </lineSegments>
    </group>
  );
}

function DustField({ count = 800 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 60;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const pts = ref.current.geometry.attributes.position;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < pts.count; i++) {
      const y = pts.getY(i);
      pts.setY(i, y + Math.sin(t * 0.3 + i) * 0.0035);
    }
    pts.needsUpdate = true;
    ref.current.rotation.y = t * 0.015;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#DD2A2A"
        size={0.045}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function CameraDrift() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    state.camera.position.x = Math.sin(t * 0.08) * 1.5;
    state.camera.position.y = 6 + Math.sin(t * 0.05) * 0.6;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function TerrainScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 6, 16], fov: 42 }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <PerspectiveCamera makeDefault position={[0, 6, 16]} fov={42} />
      <CameraDrift />
      <ambientLight intensity={0.45} />
      <directionalLight position={[10, 20, 10]} intensity={0.6} color="#DD2A2A" />
      <Terrain />
      <DustField />
      <fog attach="fog" args={['#050A1F', 14, 32]} />
    </Canvas>
  );
}
