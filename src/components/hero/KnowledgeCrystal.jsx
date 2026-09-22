import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * 3D KnowledgeCrystal component.
 * Features a multifaceted glowing crystal gem, inner luminous core, orbiting energy ring,
 * and an interactive glassmorphic educational badge with hover effects.
 *
 * @param {Object} props
 * @param {string} props.name - Program track name
 * @param {string} props.tagline - Short specialization tag
 * @param {string} props.highlight - Metric or feature
 * @param {[number, number, number]} props.position - 3D coordinates
 * @param {string} props.color - Theme color
 * @param {string} [props.geometryType='octahedron'] - 'octahedron' | 'icosahedron' | 'dodecahedron'
 * @param {number} [props.phase=0] - Sine phase offset
 */
export function KnowledgeCrystal({
  name,
  tagline,
  highlight = 'MNC Capstone Projects',
  position,
  color = '#a78bfa',
  geometryType = 'octahedron',
  phase = 0,
}) {
  const crystalRef = useRef()
  const ringRef = useRef()
  const innerRef = useRef()
  const [hovered, setHovered] = useState(false)
  const initialY = position[1]
  const shouldReduceMotion = useReducedMotion()

  useFrame((state, delta) => {
    if (shouldReduceMotion || !crystalRef.current) return
    const t = state.clock.getElapsedTime()

    // Harmonic floating
    crystalRef.current.position.y = initialY + Math.sin(t * 1.3 + phase) * 0.07

    // Crystal rotation
    crystalRef.current.rotation.y += delta * (hovered ? 0.8 : 0.35)
    crystalRef.current.rotation.x = Math.sin(t * 0.8 + phase) * 0.15

    // Orbiting mini-ring
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.6
      ringRef.current.rotation.y = 0.4 + Math.sin(t * 0.5) * 0.15
    }

    // Inner core pulsing
    if (innerRef.current) {
      const pulse = 1 + Math.sin(t * 2.8 + phase) * 0.12
      innerRef.current.scale.set(pulse, pulse, pulse)
    }
  })

  return (
    <group ref={crystalRef} position={position}>
      {/* Dynamic Crystal Point Light */}
      <pointLight color={color} intensity={hovered ? 2.5 : 1.2} distance={3.5} decay={2} />

      {/* --- Inner Luminous Core --- */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.075, 16, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={color}
          emissiveIntensity={hovered ? 3.0 : 1.8}
        />
      </mesh>

      {/* --- Outer Faceted Crystal Shell --- */}
      <mesh>
        {geometryType === 'icosahedron' ? (
          <icosahedronGeometry args={[0.18, 0]} />
        ) : geometryType === 'dodecahedron' ? (
          <dodecahedronGeometry args={[0.17, 0]} />
        ) : (
          <octahedronGeometry args={[0.19, 0]} />
        )}
        <meshStandardMaterial
          color={color}
          roughness={0.15}
          metalness={0.85}
          transparent
          opacity={0.82}
          emissive={color}
          emissiveIntensity={hovered ? 0.7 : 0.35}
        />
      </mesh>

      {/* Crystal Wireframe Accent Edge */}
      <mesh>
        {geometryType === 'icosahedron' ? (
          <icosahedronGeometry args={[0.183, 0]} />
        ) : geometryType === 'dodecahedron' ? (
          <dodecahedronGeometry args={[0.173, 0]} />
        ) : (
          <octahedronGeometry args={[0.193, 0]} />
        )}
        <meshBasicMaterial color={color} wireframe transparent opacity={0.4} />
      </mesh>

      {/* --- Orbiting Mini Energy Ring --- */}
      <group ref={ringRef} rotation={[0.4, 0.2, 0]}>
        <mesh>
          <torusGeometry args={[0.32, 0.008, 12, 48]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1.2}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        {/* Orbiting Satellite Spark */}
        <mesh position={[0.32, 0, 0]}>
          <sphereGeometry args={[0.024, 12, 12]} />
          <meshStandardMaterial color="#ffffff" emissive={color} emissiveIntensity={2.5} />
        </mesh>
      </group>

      {/* --- Interactive Glassmorphic HTML Badge --- */}
      <Html
        center
        distanceFactor={7.4}
        position={[0, 0.42, 0]}
        style={{
          pointerEvents: 'auto',
          userSelect: 'none',
        }}
      >
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: hovered ? 'scale(1.08) translateY(-2px)' : 'scale(1)',
          }}
        >
          {/* Main Pill Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              padding: '5px 12px',
              background: hovered
                ? 'rgba(15, 8, 38, 0.96)'
                : 'rgba(9, 5, 24, 0.88)',
              border: `1.5px solid ${hovered ? color : `${color}55`}`,
              borderRadius: '9999px',
              boxShadow: hovered
                ? `0 8px 24px rgba(0, 0, 0, 0.7), 0 0 20px ${color}66`
                : `0 4px 16px rgba(0, 0, 0, 0.5), 0 0 10px ${color}25`,
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              whiteSpace: 'nowrap',
            }}
          >
            {/* Glowing Status Jewel */}
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: color,
                boxShadow: `0 0 10px ${color}`,
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: "'Outfit', 'Inter', sans-serif",
                fontSize: '11.5px',
                fontWeight: '700',
                letterSpacing: '0.04em',
                color: '#ffffff',
                textTransform: 'uppercase',
              }}
            >
              {name}
            </span>
            {tagline && (
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '9.5px',
                  fontWeight: '500',
                  color: `${color}`,
                  background: `${color}18`,
                  padding: '1px 6px',
                  borderRadius: '6px',
                  letterSpacing: '0.02em',
                }}
              >
                {tagline}
              </span>
            )}
          </div>

          {/* Expanded Micro-Badge on Hover */}
          {hovered && (
            <div
              style={{
                marginTop: '4px',
                padding: '2px 8px',
                background: 'rgba(15, 8, 32, 0.95)',
                border: `1px solid ${color}60`,
                borderRadius: '6px',
                fontSize: '9px',
                fontWeight: '600',
                color: '#e2e8f0',
                letterSpacing: '0.03em',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                animation: 'fadeIn 0.2s ease-out',
              }}
            >
              ✦ {highlight}
            </div>
          )}
        </div>
      </Html>
    </group>
  )
}

export default KnowledgeCrystal
