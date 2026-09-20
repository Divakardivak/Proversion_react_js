import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Precision technological central core for the Program Universe.
 * Features an inner faceted dark titanium core, inner glow,
 * wireframe depth lattice, and concentric gyroscopic outer rings.
 */
export function ProgramCore() {
  const coreRef = useRef()
  const innerGlowRef = useRef()
  const latticeRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const ring3Ref = useRef()
  const groupRef = useRef()
  const shouldReduceMotion = useReducedMotion()

  useFrame((state, delta) => {
    if (shouldReduceMotion) return

    const t = state.clock.getElapsedTime()

    // Subtle, steady rotation of the faceted core
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.16
      coreRef.current.rotation.x = Math.sin(t * 0.35) * 0.08
    }

    // Inner glow pulse
    if (innerGlowRef.current) {
      const pulse = Math.sin(t * 1.5) * 0.1 + 0.9
      innerGlowRef.current.scale.set(pulse, pulse, pulse)
    }

    // Counter-rotating wireframe depth cage
    if (latticeRef.current) {
      latticeRef.current.rotation.y -= delta * 0.1
      latticeRef.current.rotation.z += delta * 0.06
    }

    // Concentric gyroscopic outer rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.14
      ring1Ref.current.rotation.y += delta * 0.08
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.11
      ring2Ref.current.rotation.z += delta * 0.07
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.z += delta * 0.07
      ring3Ref.current.rotation.x -= delta * 0.05
    }

    // Subtle hovering float
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.7) * 0.03
    }
  })

  return (
    <group ref={groupRef}>
      {/* Soft central illumination */}
      <pointLight color="#7c3aed" intensity={1.6} distance={6} decay={2} />
      <pointLight color="#a78bfa" intensity={1.0} distance={4} decay={2} />

      {/* Inner Glowing Core Sphere */}
      <mesh ref={innerGlowRef}>
        <sphereGeometry args={[0.38, 24, 24]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={0.65}
          transparent
          opacity={0.7}
          roughness={0.2}
        />
      </mesh>

      {/* Faceted Titanium Core Shell */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.72, 0]} />
        <meshStandardMaterial
          color="#090514"
          metalness={0.94}
          roughness={0.16}
          emissive="#1a0533"
          emissiveIntensity={0.35}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Wireframe Depth Shell */}
      <mesh ref={latticeRef}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshBasicMaterial
          color="#a78bfa"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Outer Precision Ring 1 (Inner - Violet) */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.2, 0.012, 16, 100]} />
        <meshStandardMaterial
          color="#7c3aed"
          metalness={0.9}
          roughness={0.2}
          emissive="#7c3aed"
          emissiveIntensity={0.28}
        />
      </mesh>

      {/* Outer Precision Ring 2 (Middle - Lavender) */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.45, 0.01, 16, 100]} />
        <meshStandardMaterial
          color="#a78bfa"
          metalness={0.9}
          roughness={0.2}
          emissive="#a78bfa"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Outer Delicate Ring 3 (Outer - Fuchsia) */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[1.7, 0.008, 16, 120]} />
        <meshStandardMaterial
          color="#c084fc"
          metalness={0.8}
          roughness={0.3}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Central Holographic Pro Badge */}
      <Html
        center
        distanceFactor={7}
        position={[0, 0, 0]}
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <div
          style={{
            padding: '3px 9px',
            background: 'rgba(9, 5, 20, 0.94)',
            border: '1px solid rgba(167, 139, 250, 0.6)',
            borderRadius: '9999px',
            color: '#a78bfa',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px',
            fontWeight: '700',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            boxShadow: '0 0 14px rgba(124, 58, 237, 0.4)',
          }}
        >
          PRO
        </div>
      </Html>
    </group>
  )
}

export default ProgramCore
