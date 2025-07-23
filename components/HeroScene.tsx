"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, Environment } from "@react-three/drei"
import type * as THREE from "three"

export default function HeroScene() {
  const particlesRef = useRef<THREE.Points>(null)
  const geometryRef = useRef<THREE.Group>(null)

  // Optimized particle system
  const particleCount = 500
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30

      const intensity = Math.random() * 0.5 + 0.5
      colors[i * 3] = intensity
      colors[i * 3 + 1] = intensity
      colors[i * 3 + 2] = intensity
    }

    return { positions, colors }
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    if (particlesRef.current) {
      particlesRef.current.rotation.x = time * 0.02
      particlesRef.current.rotation.y = time * 0.05
    }

    if (geometryRef.current) {
      geometryRef.current.rotation.y = time * 0.1
    }
  })

  return (
    <>
      <Environment preset="night" />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />

      {/* Background Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particles.positions}
            itemSize={3}
          />
          <bufferAttribute attach="attributes-color" count={particleCount} array={particles.colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.03} vertexColors transparent opacity={0.4} sizeAttenuation />
      </points>

      {/* Floating Geometric Elements */}
      <group ref={geometryRef}>
        {Array.from({ length: 6 }, (_, i) => (
          <Float key={i} speed={1 + i * 0.3} rotationIntensity={0.5} floatIntensity={0.8}>
            <mesh
              position={[
                Math.cos(i * Math.PI * 0.33) * 8,
                Math.sin(i * Math.PI * 0.33) * 4,
                Math.sin(i * Math.PI * 0.25) * 6,
              ]}
            >
              {i % 2 === 0 ? <boxGeometry args={[0.3, 0.3, 0.3]} /> : <sphereGeometry args={[0.2, 8, 8]} />}
              <meshStandardMaterial color="white" transparent opacity={0.1} wireframe />
            </mesh>
          </Float>
        ))}
      </group>
    </>
  )
}
