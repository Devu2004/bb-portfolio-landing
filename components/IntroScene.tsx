"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Float, Sparkles, Environment } from "@react-three/drei"
import type * as THREE from "three"

interface IntroSceneProps {
  progress: number
  stage: number
}

export default function IntroScene({ progress, stage }: IntroSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const logoRef = useRef<THREE.Group>(null)

  // Optimized particle system
  const particleCount = 1000
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20

      colors[i * 3] = 1
      colors[i * 3 + 1] = 1
      colors[i * 3 + 2] = 1
    }

    return { positions, colors }
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.x = time * 0.05
      particlesRef.current.rotation.y = time * 0.1
    }

    if (logoRef.current) {
      logoRef.current.rotation.y = Math.sin(time) * 0.1
      logoRef.current.position.y = Math.sin(time * 2) * 0.1
    }
  })

  return (
    <>
      <Environment preset="night" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      <group ref={groupRef}>
        {/* Optimized Particle System */}
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
          <pointsMaterial size={0.02} vertexColors transparent opacity={0.6} sizeAttenuation />
        </points>

        {/* Main Logo */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <group ref={logoRef} position={[0, 0, 0]}>
            <Text font="/fonts/Inter-Bold.ttf" fontSize={2} color="white" anchorX="center" anchorY="middle">
              BB
            </Text>

            {/* Sparkles around logo */}
            <Sparkles count={50} scale={3} size={2} speed={0.5} opacity={0.8} color="white" />
          </group>
        </Float>

        {/* Geometric Elements */}
        {Array.from({ length: 8 }, (_, i) => (
          <Float key={i} speed={1 + i * 0.2} rotationIntensity={1} floatIntensity={1}>
            <mesh
              position={[
                Math.cos(i * Math.PI * 0.25) * 4,
                Math.sin(i * Math.PI * 0.25) * 2,
                Math.sin(i * Math.PI * 0.5) * 3,
              ]}
            >
              <boxGeometry args={[0.2, 0.2, 0.2]} />
              <meshStandardMaterial color="white" transparent opacity={0.3} wireframe />
            </mesh>
          </Float>
        ))}
      </group>
    </>
  )
}
