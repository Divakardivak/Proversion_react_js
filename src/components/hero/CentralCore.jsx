import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Precision technological central core for ProVersion.
 * Features an inner faceted dark titanium core, wireframe energy lattice,
 * and ultra-thin concentric gyroscopic rings with slow, majestic rotation.
 * @param {Object} props
 * @param {number} [props.scrollOffset=0]
 */
export function CentralCore({ scrollOffset = 0 }) {
  const coreRef = useRef()
  const latticeRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const ring3Ref = useRef()
  const groupRef = useRef()
  const shouldReduceMotion = useReducedMotion()

  useFrame((state, delta) => {
    if (shouldReduceMotion) return

    const t = state.clock.getElapsedTime()

    // Majestic, slow rotation of the core
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.18
      coreRef.current.rotation.x = Math.sin(t * 0.4) * 0.12 + scrollOffset * 0.4
    }

    if (latticeRef.current) {
      latticeRef.current.rotation.y -= delta * 0.12
      latticeRef.current.rotation.z += delta * 0.08
    }

    // Ultra-thin gyroscopic rings rotating on distinct planetary axes
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.15
      ring1Ref.current.rotation.y += delta * 0.1
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.12
      ring2Ref.current.rotation.z += delta * 0.09
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.z += delta * 0.08
      ring3Ref.current.rotation.x -= delta * 0.06
    }

    // Subtle gentle float
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.04
    }
  })

  return (
    <group ref={groupRef}>
      {/* Central Soft Ambient Light */}
      <pointLight color="#FFB81C" intensity={1.6} distance={7} decay={2} />
      <pointLight color="#22D3EE" intensity={1.2} distance={5} decay={2} />

      {/* Inner Faceted Dark Titanium Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.75, 0]} />
        <meshStandardMaterial
          color="#0D1030"
          metalness={0.92}
          roughness={0.18}
          emissive="#FFB81C"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Wireframe Energy Shell */}
      <mesh ref={latticeRef}>
        <icosahedronGeometry args={[0.92, 1]} />
        <meshBasicMaterial
          color="#FFB81C"
          wireframe
          transparent
          opacity={0.22}
        />
      </mesh>

      {/* Precision Gyroscopic Ring 1 (Inner - Gold) */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.25, 0.012, 16, 100]} />
        <meshStandardMaterial
          color="#FFB81C"
          metalness={0.92}
          roughness={0.18}
          emissive="#FFB81C"
          emissiveIntensity={0.28}
        />
      </mesh>

      {/* Precision Gyroscopic Ring 2 (Middle - Cyan) */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.5, 0.01, 16, 100]} />
        <meshStandardMaterial
          color="#22D3EE"
          metalness={0.9}
          roughness={0.2}
          emissive="#2563EB"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Delicate Outer Orbital Ring 3 (Outer - Purple) */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[1.75, 0.008, 16, 120]} />
        <meshStandardMaterial
          color="#7C3AED"
          metalness={0.85}
          roughness={0.25}
          transparent
          opacity={0.45}
        />
      </mesh>
    </group>
  )
}

export default CentralCore
