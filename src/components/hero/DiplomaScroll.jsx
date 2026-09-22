import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * 3D DiplomaScroll component
 * Represents certified career credentials, degree completion, and placement assurance.
 * Features pearlescent rolled cyber-parchment, golden ribbon wrap, and a glowing seal.
 */
export function DiplomaScroll({ position = [-1.75, 0.4, 0.2], scale = 0.85 }) {
  const scrollGroupRef = useRef()
  const shouldReduceMotion = useReducedMotion()

  useFrame((state) => {
    if (shouldReduceMotion || !scrollGroupRef.current) return
    const t = state.clock.getElapsedTime()

    // Harmonic floating and graceful rotation
    scrollGroupRef.current.position.y = position[1] + Math.sin(t * 1.4 + 1.2) * 0.06
    scrollGroupRef.current.rotation.y = -0.35 + Math.sin(t * 0.7) * 0.1
    scrollGroupRef.current.rotation.x = 0.25 + Math.cos(t * 0.9) * 0.08
    scrollGroupRef.current.rotation.z = -0.3 + Math.sin(t * 0.5) * 0.05
  })

  return (
    <group ref={scrollGroupRef} position={position} scale={scale}>
      {/* Soft Glow */}
      <pointLight color="#fde047" intensity={1.4} distance={3} decay={2} position={[0, 0.3, 0.4]} />

      {/* --- Rolled Certificate Body --- */}
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.14, 0.14, 1.25, 32]} />
        <meshStandardMaterial
          color="#f8fafc"
          roughness={0.3}
          metalness={0.4}
          emissive="#c7d2fe"
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* Rolled Inner Hollow Core Tips */}
      <mesh position={[-0.44, -0.44, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.11, 0.11, 0.04, 24]} />
        <meshStandardMaterial color="#0f0926" roughness={0.9} />
      </mesh>
      <mesh position={[0.44, 0.44, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.11, 0.11, 0.04, 24]} />
        <meshStandardMaterial color="#0f0926" roughness={0.9} />
      </mesh>

      {/* --- Golden Ribbon Band around center --- */}
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.155, 0.155, 0.22, 32]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#fbbf24"
          emissiveIntensity={1.2}
          metalness={0.92}
          roughness={0.15}
        />
      </mesh>

      {/* --- Prestige Golden Ribbon Seal / Crest --- */}
      <group position={[0, 0, 0.16]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.03, 24]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#f59e0b"
            emissiveIntensity={1.5}
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>
        {/* Seal Inner Star/Diamond Gem */}
        <mesh position={[0, 0, 0.02]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.07, 0.07, 0.02]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2.0} />
        </mesh>

        {/* Ribbon Tails hanging downward */}
        <mesh position={[-0.04, -0.16, 0.01]} rotation={[0, 0, 0.25]}>
          <boxGeometry args={[0.045, 0.24, 0.01]} />
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[0.04, -0.16, 0.01]} rotation={[0, 0, -0.2]}>
          <boxGeometry args={[0.045, 0.24, 0.01]} />
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </group>
  )
}

export default DiplomaScroll
