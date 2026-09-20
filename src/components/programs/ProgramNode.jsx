import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Redesigned 3D ProgramNode Component.
 * Calibrated dimensions for a pristine, uncluttered 3D ecosystem.
 * Active program sits in front spotlight with an elegant, compact domain badge.
 * Orbiting programs are glowing crystal spheres that reveal a clean tooltip on hover.
 */
export function ProgramNode({
  program,
  angle = 0,
  isSelected = false,
  onSelect,
  isMobile = false,
}) {
  const groupRef = useRef()
  const meshRef = useRef()
  const ringRef = useRef()
  const [hovered, setHovered] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  // Calibrated orbital bounds ensuring all nodes remain well within camera frustum
  const radiusX = isMobile ? 1.35 : 1.75
  const radiusZ = isMobile ? 0.95 : 1.25
  const tiltY = isMobile ? 0.25 : 0.35

  // Depth factor: 1 at front (angle = 0), 0 at back (angle = PI)
  const cosAngle = Math.cos(angle)
  const sinAngle = Math.sin(angle)
  const depthFactor = (cosAngle + 1) / 2

  // Target coordinates
  const targetX = sinAngle * radiusX
  const targetZ = cosAngle * radiusZ + (isSelected ? 0.25 : 0)
  const targetY = -sinAngle * tiltY * 0.35 + (isSelected ? 0.15 : 0)

  // Target scale: selected is hero (1.28), hovered is 1.12, back nodes are 0.7
  const targetScale = isSelected
    ? 1.28
    : hovered
      ? 1.12
      : THREE.MathUtils.lerp(0.68, 0.92, depthFactor)

  useFrame((state, delta) => {
    if (!groupRef.current) return

    const t = state.clock.getElapsedTime()
    const floatY = shouldReduceMotion ? 0 : Math.sin(t * 1.5 + program.orbitPosition[0]) * 0.025

    // Smooth interpolation to target position
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.09)
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY + floatY, 0.09)
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.09)

    // Smooth scale
    const currentScale = groupRef.current.scale.x
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.1)
    groupRef.current.scale.set(newScale, newScale, newScale)

    // Rotation of halo ring
    if (ringRef.current && !shouldReduceMotion) {
      ringRef.current.rotation.z += delta * (isSelected ? 0.5 : 0.2)
    }

    // Emissive intensity
    if (meshRef.current) {
      const baseEmissive = isSelected ? 1.5 : hovered ? 1.1 : THREE.MathUtils.lerp(0.35, 0.7, depthFactor)
      meshRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(
        meshRef.current.material.emissiveIntensity || 0.5,
        baseEmissive,
        0.1
      )
    }
  })

  return (
    <group
      ref={groupRef}
      position={[targetX, targetY, targetZ]}
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={() => setHovered(false)}
    >
      {/* 3D Sphere Node */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[isSelected ? 0.22 : 0.15, 24, 24]} />
        <meshStandardMaterial
          color={program.accentColor}
          emissive={program.accentColor}
          emissiveIntensity={isSelected ? 1.5 : 0.6}
          metalness={0.88}
          roughness={0.16}
        />
      </mesh>

      {/* Orbiting Halo Ring for Active / Hovered node */}
      {(isSelected || hovered) && (
        <mesh ref={ringRef} rotation={[Math.PI / 2.8, 0, 0]}>
          <ringGeometry args={[isSelected ? 0.30 : 0.22, isSelected ? 0.35 : 0.25, 32]} />
          <meshBasicMaterial
            color={program.accentColor}
            transparent
            opacity={isSelected ? 0.85 : 0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Outer concentric pulse ring for active node */}
      {isSelected && (
        <mesh rotation={[Math.PI / 2.2, 0.3, 0]}>
          <torusGeometry args={[0.40, 0.008, 16, 48]} />
          <meshStandardMaterial
            color="#FFD700"
            emissive="#FFD700"
            emissiveIntensity={0.6}
            transparent
            opacity={0.65}
          />
        </mesh>
      )}

      {/* Sleek, Compact Centered Badge (Only on Selected OR Hovered) */}
      {(isSelected || hovered) && (
        <Html
          center
          distanceFactor={6.2}
          position={[0, isSelected ? 0.38 : 0.28, 0]}
          style={{
            pointerEvents: 'auto',
            cursor: 'pointer',
            userSelect: 'none',
            zIndex: isSelected ? 30 : 10,
          }}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onSelect()
            }}
            aria-label={`Select ${program.title}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: isSelected ? '4px 10px' : '3px 8px',
              background: isSelected
                ? 'rgba(9, 5, 20, 0.94)'
                : 'rgba(15, 8, 30, 0.92)',
              border: isSelected
                ? `1.5px solid ${program.accentColor}`
                : `1px solid ${program.accentColor}66`,
              borderRadius: '9999px',
              boxShadow: isSelected
                ? `0 6px 20px rgba(0, 0, 0, 0.75), 0 0 14px ${program.accentColor}66`
                : '0 3px 10px rgba(0, 0, 0, 0.5)',
              color: isSelected ? '#ffffff' : '#cbd5e1',
              fontFamily: "'Inter', sans-serif",
              fontSize: isSelected ? '10px' : '9px',
              fontWeight: '700',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              transform: isSelected ? 'scale(1.02)' : 'scale(1)',
            }}
          >
            <span
              style={{
                width: isSelected ? '6px' : '5px',
                height: isSelected ? '6px' : '5px',
                borderRadius: '50%',
                backgroundColor: program.accentColor,
                boxShadow: isSelected ? `0 0 8px ${program.accentColor}` : 'none',
                flexShrink: 0,
              }}
            />
            <span>{program.shortTitle}</span>
            {isSelected && (
              <span
                style={{
                  fontSize: '7.5px',
                  fontWeight: '800',
                  color: '#FFD700',
                  background: 'rgba(255, 215, 0, 0.16)',
                  padding: '1px 4px',
                  borderRadius: '999px',
                  letterSpacing: '0.08em',
                  marginLeft: '2px',
                }}
              >
                ACTIVE
              </span>
            )}
          </button>
        </Html>
      )}
    </group>
  )
}

export default ProgramNode
