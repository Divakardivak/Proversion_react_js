import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Precision technological central core for ProVersion.
 * Features a glowing inner energy core, crystalline geodesic outer shell,
 * and dual luminous planetary gimbal rings with traveling orbital spark beads.
 * @param {Object} props
 * @param {number} [props.scrollOffset=0]
 */
export function CentralCore({ scrollOffset = 0 }) {
  const coreRef = useRef()
  const innerRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const groupRef = useRef()
  const shouldReduceMotion = useReducedMotion()

  useFrame((state, delta) => {
    if (shouldReduceMotion) return

    const t = state.clock.getElapsedTime()

    // Smooth, majestic rotation of the core
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.22
      coreRef.current.rotation.x = Math.sin(t * 0.5) * 0.12 + scrollOffset * 0.3
    }

    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.28
      const pulse = 1 + Math.sin(t * 2) * 0.05
      innerRef.current.scale.set(pulse, pulse, pulse)
    }

    // Clean planetary gimbal rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.16
      ring1Ref.current.rotation.x = 0.35 + Math.sin(t * 0.4) * 0.06
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.14
      ring2Ref.current.rotation.y = -0.45 + Math.cos(t * 0.4) * 0.06
    }

    // Subtle gentle float
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.04
    }
  })

  return (
    <group ref={groupRef}>
      {/* Precision Dual Point Lights */}
      <pointLight color="#2563eb" intensity={2.0} distance={8} decay={2} />
      <pointLight color="#0ea5e9" intensity={1.5} distance={6} decay={2} position={[-1, 1, 1]} />

      {/* Inner Glowing Energy Core */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.52, 32, 32]} />
        <meshStandardMaterial
          color="#2563eb"
          emissive="#3b82f6"
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Crystalline Tech Geodesic Outer Shell */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.82, 2]} />
        <meshStandardMaterial
          color="#0b1120"
          roughness={0.15}
          metalness={0.92}
          wireframe
          emissive="#60a5fa"
          emissiveIntensity={0.35}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Primary Luminous Orbital Ring (Sapphire Azure) */}
      <group ref={ring1Ref} rotation={[0.4, 0.2, 0]}>
        <mesh>
          <torusGeometry args={[1.45, 0.014, 16, 100]} />
          <meshStandardMaterial
            color="#2563eb"
            emissive="#3b82f6"
            emissiveIntensity={0.65}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
        {/* Orbital Satellite Beaded Spark */}
        <mesh position={[1.45, 0, 0]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#3b82f6" emissiveIntensity={2.2} />
        </mesh>
      </group>

      {/* Secondary Luminous Orbital Ring (Electric Sky) */}
      <group ref={ring2Ref} rotation={[-0.5, -0.3, 0]}>
        <mesh>
          <torusGeometry args={[1.72, 0.012, 16, 100]} />
          <meshStandardMaterial
            color="#0ea5e9"
            emissive="#38bdf8"
            emissiveIntensity={0.65}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
        {/* Orbital Satellite Beaded Spark */}
        <mesh position={[-1.72, 0, 0]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#38bdf8" emissiveIntensity={2.2} />
        </mesh>
      </group>
    </group>
  )
}

export default CentralCore
