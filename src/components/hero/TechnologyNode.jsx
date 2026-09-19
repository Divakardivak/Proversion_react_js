import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Refined 3D TechnologyNode component.
 * Displays a compact glowing node with a crisp, non-overflowing glass label.
 * @param {Object} props
 * @param {string} props.name - Technology track name
 * @param {[number, number, number]} props.position - 3D coordinates [x, y, z]
 * @param {string} [props.color='#6366f1'] - Node theme color
 * @param {number} [props.phase=0] - Sine wave phase offset
 */
export function TechnologyNode({
  name,
  position,
  color = '#6366f1',
  phase = 0,
}) {
  const nodeRef = useRef()
  const initialY = position[1]
  const shouldReduceMotion = useReducedMotion()

  useFrame((state) => {
    if (shouldReduceMotion || !nodeRef.current) return

    const t = state.clock.getElapsedTime()
    // Very gentle individual float
    nodeRef.current.position.y = initialY + Math.sin(t * 1.1 + phase) * 0.06
  })

  return (
    <group ref={nodeRef} position={position}>
      {/* Node Sphere */}
      <mesh>
        <sphereGeometry args={[0.13, 20, 20]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.65}
          roughness={0.25}
          metalness={0.75}
        />
      </mesh>

      {/* Orbiting Halo Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.18, 0.22, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Glassmorphic Tech Badge */}
      <Html
        center
        distanceFactor={8}
        position={[0, 0.38, 0]}
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '3px 9px',
            background: 'rgba(10, 14, 24, 0.92)',
            border: `1px solid ${color}44`,
            borderRadius: '9999px',
            boxShadow: `0 4px 14px rgba(0, 0, 0, 0.5), 0 0 10px ${color}22`,
            color: '#f1f5f9',
            fontFamily: "'Inter', sans-serif",
            fontSize: '10.5px',
            fontWeight: '600',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              backgroundColor: color,
              boxShadow: `0 0 6px ${color}`,
            }}
          />
          <span>{name}</span>
        </div>
      </Html>
    </group>
  )
}

export default TechnologyNode
