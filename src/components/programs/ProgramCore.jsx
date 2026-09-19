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
      <pointLight color="#FFB81C" intensity={1.6} distance={6} decay={2} />
      <pointLight color="#38BDF8" intensity={1.0} distance={4} decay={2} />

      {/* Inner Glowing Core Sphere */}
      <mesh ref={innerGlowRef}>
        <sphereGeometry args={[0.38, 24, 24]} />
        <meshStandardMaterial
          color="#FFB81C"
          emissive="#FFB81C"
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
          color="#080B1A"
          metalness={0.94}
          roughness={0.16}
          emissive="#15104A"
          emissiveIntensity={0.35}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Wireframe Depth Shell */}
      <mesh ref={latticeRef}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshBasicMaterial
          color="#FFD866"
          wireframe
          transparent
          opacity={0.22}
        />
      </mesh>

      {/* Outer Precision Ring 1 (Inner - Gold) */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.2, 0.012, 16, 100]} />
        <meshStandardMaterial
          color="#FFB81C"
          metalness={0.9}
          roughness={0.2}
          emissive="#FFB81C"
          emissiveIntensity={0.28}
        />
      </mesh>

      {/* Outer Precision Ring 2 (Middle - Cyan) */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.45, 0.01, 16, 100]} />
        <meshStandardMaterial
          color="#22D3EE"
          metalness={0.9}
          roughness={0.2}
          emissive="#38BDF8"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Outer Delicate Ring 3 (Outer - Purple) */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[1.7, 0.008, 16, 120]} />
        <meshStandardMaterial
          color="#7C3AED"
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
            background: 'rgba(5, 8, 22, 0.94)',
            border: '1px solid rgba(255, 184, 28, 0.6)',
            borderRadius: '9999px',
            color: '#FFB81C',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px',
            fontWeight: '700',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            boxShadow: '0 0 14px rgba(255, 184, 28, 0.35)',
          }}
        >
          PRO
        </div>
      </Html>
    </group>
  )
}

export default ProgramCore
