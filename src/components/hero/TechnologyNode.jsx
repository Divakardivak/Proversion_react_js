import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Refined 3D TechnologyNode component.
 * Displays a compact glowing jewel node with a crisp, modern glassmorphic label badge.
 * @param {Object} props
 * @param {string} props.name - Technology track name
 * @param {[number, number, number]} props.position - 3D coordinates [x, y, z]
 * @param {string} [props.color='#38bdf8'] - Node theme color
 * @param {number} [props.phase=0] - Sine wave phase offset
 */
export function TechnologyNode({
  name,
  position,
  color = '#38bdf8',
  phase = 0,
}) {
  const nodeRef = useRef()
  const initialY = position[1]
  const shouldReduceMotion = useReducedMotion()

  useFrame((state) => {
    if (shouldReduceMotion || !nodeRef.current) return

    const t = state.clock.getElapsedTime()
    // Smooth, subtle harmonic float
    nodeRef.current.position.y = initialY + Math.sin(t * 1.2 + phase) * 0.05
  })

  return (
    <group ref={nodeRef} position={position}>
      {/* Node Jewel Sphere with Soft Radiance */}
      <mesh>
        <sphereGeometry args={[0.09, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.85}
          roughness={0.2}
          metalness={0.85}
        />
      </mesh>

      {/* Neat, Clean Glassmorphic Tech Badge */}
      <Html
        center
        distanceFactor={7.5}
        position={[0, 0.28, 0]}
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 11px',
            background: 'rgba(7, 11, 24, 0.94)',
            border: `1px solid ${color}45`,
            borderRadius: '9999px',
            boxShadow: `0 4px 16px rgba(0, 0, 0, 0.6), 0 0 12px ${color}25`,
            color: '#ffffff',
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: color,
              boxShadow: `0 0 8px ${color}`,
            }}
          />
          <span>{name}</span>
        </div>
      </Html>
    </group>
  )
}

export default TechnologyNode
